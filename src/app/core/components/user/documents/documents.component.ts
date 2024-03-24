import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { Document, PageDocs } from 'src/app/core/models/document.model';
import { User } from 'src/app/core/models/user.model';
import { DocumentService } from 'src/app/core/services/documents/document.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { AppState } from 'src/app/core/store/state/app.state';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  docs!: PageDocs;
  user?: User;
  errorMsg!: string;
  currentPage!: number;
  size!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private service: DocumentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.store.select('userAuth').subscribe((state) => {
      this.user = state.user;
      this.route.queryParams.subscribe((params) => {
        this.currentPage = params['page'] || 1;
        this.size = params['size'] || 5;
        this.getAllDocs(this.currentPage - 1, this.size);
      });
    });
  }

  getAllDocs(page: number, size: number) {
    let userId: string = this.user?.id as string;
    this.userService.getRoomsDocs(page, size, userId).subscribe({
      next: (res) => {
        this.docs = res.data.response;
        console.info(' Docs : ', this.docs);
      },
      error: (err) => {
        console.error('Error Docs : ', err);
        this.errorMsg = err.message;
        return throwError(() => err);
      },
    });
  }

  getTotalPagesArray(list: PageDocs): number[] {
    return Array.from({ length: list.totalPages }, (_, index) => index + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  navigateToPage(page: any): void {
    const queryParams = { page: page };
    this.router.navigate(['dg/documents'], { queryParams: queryParams });
  }
}
