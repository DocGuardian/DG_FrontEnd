import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, filter, throwError } from 'rxjs';
import { DocReq, Document } from 'src/app/core/models/document.model';
import { HttpResponse } from 'src/app/core/models/httpRes.model';
import { Room, UserRoom } from 'src/app/core/models/room.model';
import { User } from 'src/app/core/models/user.model';
import { DocumentService } from 'src/app/core/services/documents/document.service';
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
  userRoom!: UserRoom;
  recipient?: User;
  docs!: Array<Document>;
  error_msg = '';
  searchUsers!: FormGroup;
  search_res: string = '';
  isSearching: boolean = false;
  showModal = false;
  showParticipants = false;
  showRemove = false;
  documentForm!: FormGroup;
  selectedUser?: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private service: RoomService,
    private docService: DocumentService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.roomId = params['roomId'];
      this.store.select('userAuth').subscribe((state) => {
        this.sender = state.user;
      });
      this.service.get(params['roomId']).subscribe({
        next: (res) => {
          this.room = res.data.response;
          this.service
            .userPermission(this.sender?.id as string, this.room.id)
            .subscribe({
              next: (res) => {
                this.userRoom = res.data.response;
              },
              error: (err: any) => {
                console.error(err);
              },
            });
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    });

    this.searchUsers = this.fb.group({
      email: this.fb.control('', [Validators.required]),
    });

    this.documentForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      docUrl: this.fb.control('', [Validators.required]),
      size: this.fb.control('', [Validators.required]),
      type: this.fb.control('', [Validators.required]),
    });
    this.getAllDocs();
  }

  getAllDocs() {
    this.service.getAllDocs(this.roomId).subscribe({
      next: (res) => {
        this.docs = res.data.response;
        console.info(' Room Docs : ', this.docs);
      },
      error: (err) => {
        console.error('Error Room Docs : ', err);
        this.error_msg = err.message;
        return throwError(() => err);
      },
    });
  }

  uploadFile(event: any) {
    this.documentForm.value.docUrl = event.target.files[0];
    console.log(' Doc :', this.documentForm.value.docUrl);
    console.log(' Doc Type', this.documentForm.value.docUrl.type);
    console.log(' Doc size', this.documentForm.value.docUrl.size);
    console.log(' Doc name', this.documentForm.value.docUrl.name);

    let doc: DocReq = {
      sender: {
        id: this.sender?.id,
      },
      room: {
        id: this.roomId,
      },
      name: this.documentForm.value.docUrl.name,
      docUrl: this.documentForm.value.docUrl,
      size: this.documentForm.value.docUrl.size,
      type: this.documentForm.value.docUrl.type,
    };

    this.docService.save(doc).subscribe({
      next: (res: HttpResponse) => {
        alert('Action made successfully!');
        alert(JSON.stringify(res.data.response));
      },
      error: (err: HttpResponse) => {
        console.error(err.message);
        alert('Error  : ' + err.message);
      },
    });
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

  toggleParticipants() {
    this.showParticipants = !this.showParticipants;
  }

  toggleRemove() {
    this.showRemove = !this.showRemove;
  }

  exit() {
    this.selectedUser = this.sender;
    this.toggleRemove();
  }

  remove(user: User) {
    this.selectedUser = user;
    this.toggleRemove();
  }

  confirmRemove() {
    this.service
      .removeUser(this.selectedUser?.id as string, this.roomId)
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
}
