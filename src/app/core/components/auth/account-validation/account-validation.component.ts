import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpResponse } from 'src/app/core/models/httpRes.model';
import { UserAuthService } from 'src/app/core/services/users/auth/user-auth.service';
import { AppState } from 'src/app/core/store/state/app.state';

@Component({
  selector: 'app-account-validation',
  templateUrl: './account-validation.component.html',
  styleUrls: ['./account-validation.component.css'],
})
export class AccountValidationComponent {
  response!: HttpResponse;
  status!: number | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: UserAuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.service.verifyAccount(this.route.snapshot.params['token']).subscribe({
      next: (res: HttpResponse) => {
        this.response = res;
        console.log('Res : ', this.response);
        this.status = res.statusCode;
      },
      error: (err: any) => {
        console.error('Error ', err);
        this.response = err.error;
        console.log('Message : ', err.error.message);
        this.status = err.error.statusCode;
      },
    });
  }

  reSendToken() {
    this.service
      .reSendVerification(this.route.snapshot.params['token'])
      .subscribe({
        next: (res: HttpResponse) => {
          console.log('Res : ', res);
        },
        error: (err: any) => {
          console.error('Error : sendVerification :  ', err);
          console.log('sendVerification  : ', err.error.message);
        },
      });
  }
}
