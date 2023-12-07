import { Component } from '@angular/core';
import { Rooms } from 'src/app/Interfaces/rooms';
import { RoomService } from 'src/app/Services/rooms.service';


@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css']
})
export class ListRoomsComponent {
  selectedRoom?: Rooms;
  roomsList: Rooms[]=[];
isLinear: any;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getRooms()
      .subscribe(rooms => {this.roomsList = rooms}

      );


  }

  onSelect(room: Rooms): void {
    this.selectedRoom = room;
  }
}
