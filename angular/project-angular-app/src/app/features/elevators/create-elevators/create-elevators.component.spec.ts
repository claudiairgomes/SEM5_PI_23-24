import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreateElevatorsComponent } from './create-elevators.component';
import { ElevatorsService } from 'src/app/Services/elevators.service';
import { of, throwError } from 'rxjs';

describe('CreateElevatorsComponent', () => {
  let component: CreateElevatorsComponent;
  let fixture: ComponentFixture<CreateElevatorsComponent>;
  let elevatorsServiceSpy: jasmine.SpyObj<ElevatorsService>;

  beforeEach(() => {
    elevatorsServiceSpy = jasmine.createSpyObj('ElevatorsService', ['createElevator']);

    TestBed.configureTestingModule({
      declarations: [CreateElevatorsComponent],
      providers: [{ provide: ElevatorsService, useValue: elevatorsServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateElevatorsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createElevator on button click', fakeAsync(() => {
    const mockElevator = {
      id:'a',
      building: 'Test Building',
      floorList: ['Test Floor'],
      brand: 'Test Brand',
      model: 'Test Model',
      serialNumber: 'Test Serial Number',
      description: 'Test Description',
    };

    elevatorsServiceSpy.createElevator.and.returnValue(of(mockElevator));

    // Set elevator properties
    component.elevator = mockElevator;

    // Trigger button click
    component.createElevator();
    tick();

    expect(elevatorsServiceSpy.createElevator).toHaveBeenCalledWith(mockElevator);
    expect(window.alert).toHaveBeenCalledWith('Elevator created successfully!');
  }));

  it('should show error alert if createElevator fails', fakeAsync(() => {
    const mockError = new Error('Test Error');

    elevatorsServiceSpy.createElevator.and.returnValue(throwError(mockError));

    // Trigger button click
    component.createElevator();
    tick();

    expect(elevatorsServiceSpy.createElevator).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error creating elevator...');
  }));
});
