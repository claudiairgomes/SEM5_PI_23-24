import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FloorService } from './floors.service';
import { Floors } from '../Interfaces/floors';

describe('FloorService', () => {
  let service: FloorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FloorService]
    });

    service = TestBed.inject(FloorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get floors', () => {
    const mockFloors: Floors[] = [
      // mock floor data
    ];

    service.getFloors().subscribe(floors => {
      expect(floors).toEqual(mockFloors);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors');
    expect(req.request.method).toEqual('GET');

    req.flush(mockFloors);
  });

  it('should create floor', () => {
    const mockFloor: Floors = {
      id:'',
      name:'',
      number:0,
      description:'',
      building:'',
    } ;

    service.createFloor(mockFloor).subscribe(floor => {
      expect(floor).toEqual(mockFloor);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/Floors');
    expect(req.request.method).toEqual('POST');

    req.flush(mockFloor);
  });

  it('should update floor', () => {
    const mockFloor: Floors = {
      id:'',
      name:'',
      number:0,
      description:'',
      building:'',
    } ;

    service.updateFloor(mockFloor).subscribe(floor => {
      expect(floor).toEqual(mockFloor);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors');
    expect(req.request.method).toEqual('PATCH');

    req.flush(mockFloor);
  });

  it('should get floor by ID', () => {
    const mockFloor: Floors = {
      id:'',
      name:'',
      number:0,
      description:'',
      building:'',
    };

    const floorId = '123';

    service.getFloorById(floorId).subscribe(floor => {
      expect(floor).toEqual(mockFloor);
    });

    const req = httpTestingController.expectOne(`http://localhost:4000/api/floors/${floorId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockFloor);
  });
});


/*import { TestBed } from '@angular/core/testing';

import { FloorService } from './Floors.service';

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
*/
