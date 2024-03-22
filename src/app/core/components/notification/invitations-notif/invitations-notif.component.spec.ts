import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationsNotifComponent } from './invitations-notif.component';

describe('InvitationsNotifComponent', () => {
  let component: InvitationsNotifComponent;
  let fixture: ComponentFixture<InvitationsNotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationsNotifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationsNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
