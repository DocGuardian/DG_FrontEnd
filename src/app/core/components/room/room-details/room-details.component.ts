import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, filter } from 'rxjs';
import { Room } from 'src/app/core/models/room.model';
import { User } from 'src/app/core/models/user.model';
import { RoomService } from 'src/app/core/services/rooms/room.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { AppState } from 'src/app/core/store/state/app.state';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
})
export class RoomDetailsComponent implements OnInit {
  roomId!: string;
  room!: Room;
  sender?: User;
  recipient?: User;
  searchUsers!: FormGroup;
  search_res: string = '';
  isSearching: boolean = false;
  showModal = false;
  selectedDocument: string = ''; // Replace with actual document URL or data


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private service: RoomService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('userAuth').subscribe((state) => {
      this.sender = state.user;
    });

    this.route.params.subscribe((params) => {
      this.roomId = params['roomId'];
      this.service.get(params['roomId']).subscribe({
        next: (res) => {
          this.room = res.data.response;
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    });

    this.searchUsers = this.fb.group({
      email: this.fb.control('', [Validators.required]),
    });
  }

  openDocumentSelection() {
    // Simulate opening a dialog or modal to select a document (replace with actual implementation)
    const selectedFile = prompt('Enter document URL or choose a file');
    if (selectedFile) {
      this.selectedDocument = selectedFile;
    }
  }
  
  onSearch() {
    this.userService.getByEmail(this.searchUsers.value.email).subscribe({
      next: (res) => {
        this.isSearching = true;
        this.recipient = res.data.response;
        this.search_res = '';
      },
      error: (err) => {
        this.isSearching = true;
        this.recipient = undefined;
        this.search_res = err.error.message;
      },
    });
  }

  onInvite(): void {
    let senderId = this.sender?.id as string;
    let recipientId: string = this.recipient?.id as string;
    this.service
      .inviteUser(senderId as string, recipientId, this.roomId)
      .subscribe({
        next: (res) => {
          console.log('Res : ' + res);
        },
        error: (err) => {
          console.log('Err : ' + err.message);
        },
      });
    this.toggleModal();
  }

  toggleModal() {
    this.searchUsers.reset();
    this.showModal = !this.showModal;
  }

  exit() {
    window.history.back();
  }
}
