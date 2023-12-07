import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreateRoomsComponent } from './create-rooms.component';
import { RoomService } from 'src/app/Services/rooms.service';
import { of, throwError } from 'rxjs';

describe('CreateRoomsComponent', () => {
  let component: CreateRoomsComponent;
  let fixture: ComponentFixture<CreateRoomsComponent>;
  let roomServiceSpy: jasmine.SpyObj<RoomService>;

  beforeEach(() => {
    roomServiceSpy = jasmine.createSpyObj('RoomService', ['createRoom']);

    TestBed.configureTestingModule({
      declarations: [CreateRoomsComponent],
      providers: [{ provide: RoomService, useValue: roomServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRoomsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createRoom on button click', fakeAsync(() => {
    const mockRoom = {
      id:'a',
      name: 'Test Room',
      description: 'Test Description',
      dimension: 'Test Dimension',
      code: 'Test Code',
      floorId: 'Test FloorId'
    };

    roomServiceSpy.createRoom.and.returnValue(of(mockRoom));

    // Set room properties
    component.room = mockRoom;

    // Trigger button click
    component.createRoom();
    tick();

    expect(roomServiceSpy.createRoom).toHaveBeenCalledWith(mockRoom);
    expect(window.alert).toHaveBeenCalledWith('Room created successfully!');
  }));

  it('should show error alert if createRoom fails', fakeAsync(() => {
    const mockError = new Error('Test Error');

    roomServiceSpy.createRoom.and.returnValue(throwError(mockError));

    // Trigger button click
    component.createRoom();
    tick();

    expect(roomServiceSpy.createRoom).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error creating room...');
  }));
});
