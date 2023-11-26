import { TestBed } from '@angular/core/testing';

import { FloorService } from './floors.service';

describe('FloorService', () => {
  let service: FloorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
