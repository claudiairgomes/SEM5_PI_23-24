// update-rooms.component.ts

import { Component, OnInit } from '@angular/core';
import { Rooms } from 'src/app/Interfaces/rooms';
import { RoomService } from 'src/app/Services/rooms.service';

@Component({
  selector: 'app-update-rooms',
  templateUrl: './update-rooms.component.html',
  styleUrls: ['./update-rooms.component.css']
})
export class UpdateRoomsComponent implements OnInit {
  rooms: Rooms[] = [];
  selectedRoom: Rooms = {
    id: '',
    name: '',
    description: '',
    dimension: '',
    code: '',
    floorId: '',
  };

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {
    this.roomService.getRooms().subscribe(
      (rooms) => {
        this.rooms = rooms;
      },
      (error) => {
        console.error('Error loading rooms:', error);
      }
    );
  }

  editRoom(id: string) {
    console.log(id);
    this.roomService.getRoomById(id).subscribe(
      (room) => {
        this.selectedRoom = room;
      },
      (error) => {
        console.error('Error loading room details:', error);
      }
    );
  }

  updateRoom() {
    this.roomService.updateRoom(this.selectedRoom).subscribe(
      (response) => {
        alert('Room updated successfully!');
        this.loadRooms(); // Reload the list of rooms after an update
      },
      (error) => {
        alert('Error updating room...');
      }
    );
  }
}
