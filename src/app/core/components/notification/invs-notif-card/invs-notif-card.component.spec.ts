import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvsNotifCardComponent } from './invs-notif-card.component';

describe('InvsNotifCardComponent', () => {
  let component: InvsNotifCardComponent;
  let fixture: ComponentFixture<InvsNotifCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvsNotifCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvsNotifCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
