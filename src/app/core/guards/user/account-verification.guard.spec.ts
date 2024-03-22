import { TestBed } from '@angular/core/testing';

import { AccountVerificationGuard } from './account-verification.guard';

describe('AccountVerificationGuard', () => {
  let guard: AccountVerificationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccountVerificationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
