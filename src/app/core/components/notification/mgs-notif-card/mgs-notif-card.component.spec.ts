import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgsNotifCardComponent } from './mgs-notif-card.component';

describe('MgsNotifCardComponent', () => {
  let component: MgsNotifCardComponent;
  let fixture: ComponentFixture<MgsNotifCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MgsNotifCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MgsNotifCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
