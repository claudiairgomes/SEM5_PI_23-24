import { Component } from '@angular/core';
import { FloorService } from '../../../Services/floors.service';
import { Floors } from '../../../Interfaces/floors';

@Component({
  selector: 'app-list-floors',
  templateUrl: './list-floors.component.html',
  styleUrls: ['./list-floors.component.css']
})
export class ListFloorsComponent {
  selectedFloor?: Floors;
  floors: Floors[] = [];

  constructor(private floorService: FloorService) { }

  ngOnInit(): void {
    this.getFloors();
  }

  getFloors(): void {
    this.floorService.getFloors()
      .subscribe(floors => this.floors = floors);
  }

  onSelect(floor: Floors): void {
    this.selectedFloor = floor;
  }
}
