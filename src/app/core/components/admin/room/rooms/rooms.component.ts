import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { PageRooms, Room } from 'src/app/core/models/room.model';
import { RoomService } from 'src/app/core/services/rooms/room.service';
import { AppState } from 'src/app/core/store/state/app.state';

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  rooms!: PageRooms;
  showCreate?: boolean;

  errorMsg!: string;
  currentPage!: number;
  size!: number;
  name_Error = '';

  constructor(
    private service: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params['page'] || 1;
      this.size = params['size'] || 5;
      this.getRoomPages(this.currentPage - 1, this.size);
    });
  }

  getRoomPages(page: number, size: number) {
    this.service.getPaginitaion(page, size).subscribe({
      next: (res) => {
        this.rooms = res.data.response;
        console.info(' Room Pages : ', this.rooms);
      },
      error: (err) => {
        console.error('Error in get All Room : ', err);
        this.errorMsg = err.message;
        return throwError(() => err);
      },
    });
  }

  getTotalPagesArray(list: PageRooms): number[] {
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
