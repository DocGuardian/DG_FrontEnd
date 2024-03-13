import { TestBed } from '@angular/core/testing';

import { RoomInvitationService } from './room-invitation.service';

describe('RoomInvitationService', () => {
  let service: RoomInvitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomInvitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
