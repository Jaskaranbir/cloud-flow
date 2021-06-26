import { TestBed } from '@angular/core/testing';

import { LocalBlueprintsService } from './local-blueprints.service';

describe('BlueprintsService', () => {
  let service: LocalBlueprintsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalBlueprintsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
