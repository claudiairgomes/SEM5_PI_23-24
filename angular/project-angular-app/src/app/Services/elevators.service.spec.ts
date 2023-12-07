import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ElevatorsService } from './elevators.service';
import { Elevators } from '../Interfaces/elevators';

describe('ElevatorService', () => {
  let service: ElevatorsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ElevatorsService]
    });

    service = TestBed.inject(ElevatorsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get elevators', () => {
    const mockElevators: Elevators[] = [
      // mock elevator data
    ];

    service.getElevators().subscribe(elevators => {
      expect(elevators).toEqual(mockElevators);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/elevators');
    expect(req.request.method).toEqual('GET');

    req.flush(mockElevators);
  });

  it('should create elevator', () => {
    const mockElevator: Elevators = {
      id:'',
      building:'',
      floorList: [""],
      brand:'',
      model:'',
      serialNumber:'',
      description:'',
    } ;

    service.createElevator(mockElevator).subscribe(elevators => {
      expect(elevators).toEqual(mockElevator);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/elevators');
    expect(req.request.method).toEqual('POST');

    req.flush(mockElevator);
  });

  it('should update elevator', () => {
    const mockElevator: Elevators = {
      id:'',
      building:'',
      floorList: [""],
      brand:'',
      model:'',
      serialNumber:'',
      description:'',
    } ;

    service.updateElevator(mockElevator).subscribe(elevators => {
      expect(elevators).toEqual(mockElevator);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/elevators');
    expect(req.request.method).toEqual('PATCH');

    req.flush(mockElevator);
  });

  it('should get elevator by ID', () => {
    const mockElevator: Elevators = {
      id:'',
      building:'',
      floorList: [""],
      brand:'',
      model:'',
      serialNumber:'',
      description:'',
    };

    const elevatorId = '123';

    service.getElevatorById(elevatorId).subscribe(elevators => {
      expect(elevators).toEqual(mockElevator);
    });

    const req = httpTestingController.expectOne(`http://localhost:4000/api/elevators/${elevatorId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockElevator);
  });
});
