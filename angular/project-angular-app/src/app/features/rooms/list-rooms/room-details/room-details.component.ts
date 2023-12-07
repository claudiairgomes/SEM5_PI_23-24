import { Component, Input } from '@angular/core';
import { Rooms } from 'src/app/Interfaces/rooms';


@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent {
    @Input() room?: Rooms;
}
