import {Component, OnInit} from '@angular/core';
import { Floors } from 'src/app/Interfaces/floors';
import { FloorService } from 'src/app/Services/floors.service';
import {Buildings} from 'src/app/Interfaces/buildings';
import {BuildingService} from "../../../Services/buildings.service";



@Component({
  selector: 'app-create-floors',
  templateUrl: './create-floors.component.html',
  styleUrls: ['./create-floors.component.css']
})
export class CreateFloorsComponent implements OnInit {

  selectedBuilding?: Buildings;
  buildingsList: Buildings[] = [];
  floor ={
    building:'',
    name:'',
    number:0,
    description:'',
  }

  constructor(private floorservice:FloorService,  private buildingService: BuildingService) { }

  createFloor() {

    if (this.selectedBuilding) {
      this.floor.building = this.selectedBuilding.name;
    }

    const floorData = this.floorservice.createFloor(this.floor as Floors).subscribe(
      (response) => {
        alert("Floor created successfully!");
      },
      (error) => {
        alert("Error creating floor...");
      }
    );

  }


  getBuildings(): void {
    this.buildingService.getBuildings()
      .subscribe(buildings => {this.buildingsList = buildings}

      );
  }

  ngOnInit(): void {
    this.getBuildings();
  }
}
