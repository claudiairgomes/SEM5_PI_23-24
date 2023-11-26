import { Component } from '@angular/core';
import { Floors } from 'src/app/Interfaces/floors';
import { FloorService } from 'src/app/Services/floors.service';



@Component({
  selector: 'app-create-floors',
  templateUrl: './create-floors.component.html',
  styleUrls: ['./create-floors.component.css']
})
export class CreateFloorsComponent {
 /* floor ={
    buildingId:'',
    floorNumber:'',
    description:''
  }

  constructor(private floorservice:Floorservice) { }

  createFloor() {
    const floorData = this.floorservice.createBuilding(this.floor as Floor).subscribe(
      (response) => {
        alert("Floor created successfully!");
      },
      (error) => {
        alert("Error creating floor...");
      }
    );

  }*/
}
