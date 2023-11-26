import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreateBuildingsComponent } from './create-buildings.component';
import { BuildingService } from 'src/app/Services/buildings.service';
import { of, throwError } from 'rxjs';

describe('CreateBuildingsComponent', () => {
  let component: CreateBuildingsComponent;
  let fixture: ComponentFixture<CreateBuildingsComponent>;
  let buildingServiceSpy: jasmine.SpyObj<BuildingService>;

  beforeEach(() => {
    buildingServiceSpy = jasmine.createSpyObj('BuildingService', ['createBuilding']);

    TestBed.configureTestingModule({
      declarations: [CreateBuildingsComponent],
      providers: [{ provide: BuildingService, useValue: buildingServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBuildingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createBuilding on button click', fakeAsync(() => {
    const mockBuilding = {
      id:'a',
      name: 'Test Building',
      description: 'Test Description',
      dimension: 'Test Dimension',
      code: 'Test Code',
    };

    buildingServiceSpy.createBuilding.and.returnValue(of(mockBuilding));

    // Set building properties
    component.building = mockBuilding;

    // Trigger button click
    component.createBuilding();
    tick();

    expect(buildingServiceSpy.createBuilding).toHaveBeenCalledWith(mockBuilding);
    expect(window.alert).toHaveBeenCalledWith('Building created successfully!');
  }));

  it('should show error alert if createBuilding fails', fakeAsync(() => {
    const mockError = new Error('Test Error');

    buildingServiceSpy.createBuilding.and.returnValue(throwError(mockError));

    // Trigger button click
    component.createBuilding();
    tick();

    expect(buildingServiceSpy.createBuilding).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error creating building...');
  }));
});
