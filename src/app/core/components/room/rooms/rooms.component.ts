import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { RoomType } from 'src/app/core/enums/room-types.enum';
import { PageRooms, RoomReq } from 'src/app/core/models/room.model';
import { User } from 'src/app/core/models/user.model';
import { RoomService } from 'src/app/core/services/rooms/room.service';
import { AppState } from 'src/app/core/store/state/app.state';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  user?: User;
  rooms!: PageRooms;
  showCreate?: boolean;
  roomForm!: FormGroup;
  errorMsg!: string;
  currentPage!: number;
  size!: number;
  name_Error = '';

  constructor(
    private fb: FormBuilder,
    private service: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('userAuth').subscribe((state) => {
      this.user = state.user;
      this.route.queryParams.subscribe((params) => {
        this.currentPage = params['page'] || 1;
        this.size = params['size'] || 5;
        this.getRoomPages(
          this.currentPage - 1,
          this.size,
          this.user?.id as string
        );
      });
    });

    this.roomForm = this.fb.group({
      name: this.fb.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  getRoomPages(page: number, size: number, userId: string) {
    this.service.getPaginitaionByUser(page, size, userId).subscribe({
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

  onCreate() {
    let room: RoomReq = {
      name: this.roomForm.value.name,
      type: RoomType.FREEMIUM,
      owner: this.user as User,
    };

    if (this.roomForm.valid) {
      this.service.save(room).subscribe({
        next: (response) => {
          alert('Room Created successfully!\n : ' + JSON.stringify(response));
          location.reload();
        },
        error: (err) => {
          alert('Room Err : ' + err.error.message);
        },
      });
    } else {
      if (this.roomForm?.get('name')?.hasError('required')) {
        this.name_Error = 'Name is required.';
      } else if (this.roomForm?.get('name')?.hasError('maxlength')) {
        this.name_Error = 'Room name must be less than 50 characters long.';
      } else {
        this.name_Error = '';
      }
    }
  }

  togglecreateModal() {
    this.roomForm.reset();
    this.showCreate = !this.showCreate;
  }
}
