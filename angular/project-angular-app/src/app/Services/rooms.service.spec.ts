import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoomService } from './rooms.service';
import { Rooms } from '../Interfaces/rooms';

describe('RoomService', () => {
  let service: RoomService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoomService]
    });

    service = TestBed.inject(RoomService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get rooms', () => {
    const mockRooms: Rooms[] = [
      // mock room data
    ];

    service.getRooms().subscribe(rooms => {
      expect(rooms).toEqual(mockRooms);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/rooms');
    expect(req.request.method).toEqual('GET');

    req.flush(mockRooms);
  });

  it('should create room', () => {
    const mockRoom: Rooms = {
      id:'',
      name:'',
      description:'',
      dimension:'',
      code:'',
      floor:'',
    } ;

    service.createRoom(mockRoom).subscribe(room => {
      expect(room).toEqual(mockRoom);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/rooms');
    expect(req.request.method).toEqual('POST');

    req.flush(mockRoom);
  });

  it('should update room', () => {
    const mockRoom: Rooms = {
      id:'',
      name:'',
      description:'',
      dimension:'',
      code:'',
      floor:'',
    } ;

    service.updateRoom(mockRoom).subscribe(room => {
      expect(room).toEqual(mockRoom);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/rooms');
    expect(req.request.method).toEqual('PATCH');

    req.flush(mockRoom);
  });

  it('should get room by ID', () => {
    const mockRoom: Rooms = {
      id:'',
      name:'',
      description:'',
      dimension:'',
      code:'',
      floor:'',
    };

    const roomId = '123';

    service.getRoomById(roomId).subscribe(room => {
      expect(room).toEqual(mockRoom);
    });

    const req = httpTestingController.expectOne(`http://localhost:4000/api/rooms/${roomId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockRoom);
  });
});


/*import { TestBed } from '@angular/core/testing';

import { RoomService } from './Rooms.service';

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
*/
