import { Component } from '@angular/core';
import { Floors } from 'src/app/Interfaces/floors';
import { FloorService } from 'src/app/Services/floors.service';


@Component({
  selector: 'app-update-floors',
  templateUrl: './update-floors.component.html',
  styleUrls: ['./update-floors.component.css']
})
export class UpdateFloorsComponent {
  floor ={
    name:'',
    building:'',
    number:0,
    description:''

  }

  constructor(private floorService:FloorService) { }

 updateFloor() {
    const floorData = this.floorService.updateFloor(this.floor as Floors).subscribe(
      (response) => {
        alert("Floor updated successfully!");
      },
      (error) => {
        alert("Error updating floor...");
      }
    );

  }
}
