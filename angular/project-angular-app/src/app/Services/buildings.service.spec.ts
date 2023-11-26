import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BuildingService } from './buildings.service';
import { Buildings } from '../Interfaces/buildings';

describe('BuildingService', () => {
  let service: BuildingService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BuildingService]
    });

    service = TestBed.inject(BuildingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get buildings', () => {
    const mockBuildings: Buildings[] = [
      // mock building data
    ];

    service.getBuildings().subscribe(buildings => {
      expect(buildings).toEqual(mockBuildings);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildings');
    expect(req.request.method).toEqual('GET');

    req.flush(mockBuildings);
  });

  it('should create building', () => {
    const mockBuilding: Buildings = {
      id:'',
      name:'',
      description:'',
      dimension:'',
      code:'',
    } ;

    service.createBuilding(mockBuilding).subscribe(building => {
      expect(building).toEqual(mockBuilding);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildings');
    expect(req.request.method).toEqual('POST');

    req.flush(mockBuilding);
  });

  it('should update building', () => {
    const mockBuilding: Buildings = {
      id:'',
      name:'',
      description:'',
      dimension:'',
      code:'',
    } ;

    service.updateBuilding(mockBuilding).subscribe(building => {
      expect(building).toEqual(mockBuilding);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildings');
    expect(req.request.method).toEqual('PATCH');

    req.flush(mockBuilding);
  });

  it('should get building by ID', () => {
    const mockBuilding: Buildings = {
      id:'',
      name:'',
      description:'',
      dimension:'',
      code:'',
    };

    const buildingId = '123';

    service.getBuildingById(buildingId).subscribe(building => {
      expect(building).toEqual(mockBuilding);
    });

    const req = httpTestingController.expectOne(`http://localhost:4000/api/buildings/${buildingId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockBuilding);
  });
});


/*import { TestBed } from '@angular/core/testing';

import { BuildingService } from './buildings.service';

describe('BuildingService', () => {
  let service: BuildingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
*/