import { Component } from '@angular/core';
import { Floors } from 'src/app/Interfaces/floors';
import { FloorService } from 'src/app/Services/floors.service';



@Component({
  selector: 'app-create-floors',
  templateUrl: './create-floors.component.html',
  styleUrls: ['./create-floors.component.css']
})
export class CreateFloorsComponent {
  floor ={
    buildingId:'',
    floorNumber:0,
    description:'',
  }

  constructor(private floorservice:FloorService) { }

  createFloor() {
    const floorData = this.floorservice.createFloor(this.floor as Floors).subscribe(
      (response) => {
        alert("Floor created successfully!");
      },
      (error) => {
        alert("Error creating floor...");
      }
    );

  }
}
