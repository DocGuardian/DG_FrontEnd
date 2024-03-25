import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { HttpResponse } from 'src/app/core/models/httpRes.model';
import { PageUsers } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/users/user.service';
import { AppState } from 'src/app/core/store/state/app.state';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: PageUsers;
  showCreate?: boolean;

  errorMsg!: string;
  currentPage!: number;
  size!: number;
  name_Error = '';

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params['page'] || 1;
      this.size = params['size'] || 5;
      this.getUserPages(this.currentPage - 1, this.size);
    });
  }

  getUserPages(page: number, size: number) {
    this.service.getPaginitaion(page, size).subscribe({
      next: (res: HttpResponse) => {
        this.users = res.data.response;
        console.info(' User Pages : ', res);
      },
      error: (err) => {
        console.error('Error in get All Users : ', err);
        this.errorMsg = err.message;
        return throwError(() => err);
      },
    });
  }

  getTotalPagesArray(list: PageUsers): number[] {
    return Array.from({ length: list.totalPages }, (_, index) => index + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  navigateToPage(page: any): void {
    const queryParams = { page: page };
    this.router.navigate(['dg/rooms'], { queryParams: queryParams });
  }
}
