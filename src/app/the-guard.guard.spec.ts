import { TestBed } from '@angular/core/testing';

import { TheGuardGuard } from './the-guard.guard';

describe('TheGuardGuard', () => {
  let guard: TheGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TheGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
