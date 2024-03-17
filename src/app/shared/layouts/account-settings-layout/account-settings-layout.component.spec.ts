import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsLayoutComponent } from './account-settings-layout.component';

describe('AccountSettingsLayoutComponent', () => {
  let component: AccountSettingsLayoutComponent;
  let fixture: ComponentFixture<AccountSettingsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSettingsLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSettingsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
