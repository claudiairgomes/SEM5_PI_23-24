import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreateRobotsComponent } from './create-robots.component';
import { RobotService } from 'src/app/Services/robots.service';
import { of, throwError } from 'rxjs';

describe('CreateRobotsComponent', () => {
  let component: CreateRobotsComponent;
  let fixture: ComponentFixture<CreateRobotsComponent>;
  let robotServiceSpy: jasmine.SpyObj<RobotService>;

  beforeEach(() => {
    robotServiceSpy = jasmine.createSpyObj('RobotService', ['createRobot']);

    TestBed.configureTestingModule({
      declarations: [CreateRobotsComponent],
      providers: [{ provide: RobotService, useValue: robotServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRobotsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createRobot on button click', fakeAsync(() => {
    const mockRobot = {
      id:'a',
      codRobot: 'Test CodRobot',
      name: 'Test Name',
      type: 'Test type',
      serialNumber:'Test serial number',
      description: 'Test Description',
    };

    robotServiceSpy.createRobot.and.returnValue(of(mockRobot));

    // Set robot properties
    component.robot = mockRobot;

    // Trigger button click
    component.createRobot();
    tick();

    expect(robotServiceSpy.createRobot).toHaveBeenCalledWith(mockRobot);
    expect(window.alert).toHaveBeenCalledWith('Robot created successfully!');
  }));

  it('should show error alert if createRobot fails', fakeAsync(() => {
    const mockError = new Error('Test Error');

    robotServiceSpy.createRobot.and.returnValue(throwError(mockError));

    // Trigger button click
    component.createRobot();
    tick();

    expect(robotServiceSpy.createRobot).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error creating robot...');
  }));
});
