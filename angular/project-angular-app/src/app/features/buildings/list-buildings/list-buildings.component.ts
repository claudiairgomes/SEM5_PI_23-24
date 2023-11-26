import { Component } from '@angular/core';
import { BuildingService } from '../../../Services/buildings.service';
import { Buildings } from '../../../Interfaces/buildings';

@Component({
  selector: 'app-list-buildings',
  templateUrl: './list-buildings.component.html',
  //styleUrls: ['./list-buildings.component.css']
})
export class ListBuildingsComponent {
  selectedBuilding?: Buildings;
  buildings: Buildings[] = [];

  constructor(private buildingService: BuildingService) { }

  ngOnInit(): void {
    this.getBuildings();
  }

  getBuildings(): void {
    console.log(this.buildings);
    this.buildingService.getBuildings()
      .subscribe(buildings => this.buildings = buildings);
  }

  onSelect(building: Buildings): void {
    this.selectedBuilding = building;
  }
}