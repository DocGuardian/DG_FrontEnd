import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageNotifComponent } from './message-notif.component';

describe('MessageNotifComponent', () => {
  let component: MessageNotifComponent;
  let fixture: ComponentFixture<MessageNotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageNotifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
