// update-buildings.component.ts

import { Component, OnInit } from '@angular/core';
import { Buildings } from 'src/app/Interfaces/buildings';
import { BuildingService } from 'src/app/Services/buildings.service';

@Component({
  selector: 'app-update-buildings',
  templateUrl: './update-buildings.component.html',
  styleUrls: ['./update-buildings.component.css']
})
export class UpdateBuildingsComponent implements OnInit {
  buildings: Buildings[] = [];
  selectedBuilding: Buildings = {
    id: '',
    name: '',
    description: '',
    dimension: '',
    code: ''
  };

  constructor(private buildingService: BuildingService) { }

  ngOnInit(): void {
    this.loadBuildings();
  }

  loadBuildings() {
    this.buildingService.getBuildings().subscribe(
      (buildings) => {
        this.buildings = buildings;
      },
      (error) => {
        console.error('Error loading buildings:', error);
      }
    );
  }

  editBuilding(id: string) {
    console.log(id);
    this.buildingService.getBuildingById(id).subscribe(
      (building) => {
        this.selectedBuilding = building;
      },
      (error) => {
        console.error('Error loading building details:', error);
      }
    );
  }

  updateBuilding() {
    this.buildingService.updateBuilding(this.selectedBuilding).subscribe(
      (response) => {
        alert('Building updated successfully!');
        this.loadBuildings(); // Reload the list of buildings after an update
      },
      (error) => {
        alert('Error updating building...');
      }
    );
  }
}
