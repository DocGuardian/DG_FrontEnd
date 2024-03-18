import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  docs?: null;
  errorMsg!: string;
  currentPage!: number;
  size!: number;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params['page'] || 1;
      this.size = params['size'] || 5;
      this.getAllDocs(this.currentPage - 1, this.size);
    });
  }

  getAllDocs(page: number, size: number) {}

  getTotalPagesArray(listUsers: []): number[] {
    return [];
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  navigateToPage(page: any): void {
    const queryParams = { page: page };
    this.router.navigate(['dashboard/members'], { queryParams: queryParams });
  }
}
