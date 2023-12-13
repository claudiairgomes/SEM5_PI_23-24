import { Component } from '@angular/core';
import { Rooms } from 'src/app/Interfaces/rooms';
import { RoomService } from 'src/app/Services/rooms.service';


@Component({
  selector: 'app-create-rooms',
  templateUrl: './create-rooms.component.html',
  styleUrls: ['./create-rooms.component.css']
})
export class CreateRoomsComponent {
  room ={
    name:'',
    description:'',
    dimension:'',
    code:'',
    floor:'',
  }

  constructor(private roomService:RoomService) { }

 createRoom() {
    const roomData = this.roomService.createRoom(this.room as Rooms).subscribe(
      (response) => {
        alert("Room created successfully!");
      },
      (error) => {
        alert("Error creating room...");
      }
    );

  }
}
