import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PassageService } from './passages.service';
import { Passages } from '../Interfaces/passages';

describe('PassageService', () => {
  let service: PassageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PassageService]
    });

    service = TestBed.inject(PassageService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get passages', () => {
    const mockPassages: Passages[] = [
      // mock passage data
    ];

    service.getPassages().subscribe(passages => {
      expect(passages).toEqual(mockPassages);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/passages');
    expect(req.request.method).toEqual('GET');

    req.flush(mockPassages);
  });

  it('should create passage', () => {
    const mockPassage: Passages = {
      id:'',
      name:'',
      fromFloor:'',
      toFloor:'',
      description:'',
    } ;

    service.createPassage(mockPassage).subscribe(passage => {
      expect(passage).toEqual(mockPassage);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/passages');
    expect(req.request.method).toEqual('POST');

    req.flush(mockPassage);
  });

  it('should update passage', () => {
    const mockPassage: Passages = {
      id:'',
      name:'',
      fromFloor:'',
      toFloor:'',
      description:'',
    } ;

    service.updatePassage(mockPassage).subscribe(passage => {
      expect(passage).toEqual(mockPassage);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/passages');
    expect(req.request.method).toEqual('PATCH');

    req.flush(mockPassage);
  });

  it('should get passage by ID', () => {
    const mockPassage: Passages = {
      id:'',
      name:'',
      fromFloor:'',
      toFloor:'',
      description:'',
    };

    const passageId = '123';

    service.getPassageById(passageId).subscribe(passage => {
      expect(passage).toEqual(mockPassage);
    });

    const req = httpTestingController.expectOne(`http://localhost:4000/api/passages/${passageId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockPassage);
  });
});


/*import { TestBed } from '@angular/core/testing';

import { PassageService } from './Passages.service';

describe('PassageService', () => {
  let service: PassageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
*/
