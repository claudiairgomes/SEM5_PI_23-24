import { Component } from '@angular/core';
import { Elevators } from 'src/app/Interfaces/elevator';
import { ElevatorsService } from 'src/app/Services/elevators.service';


@Component({
  selector: 'app-elevators',
  templateUrl: './list-elevators.component.html',
  //styleUrls: ['./list-buildings.component.css']
})
export class ListBuildingsComponent {
  selectedElevator?: Elevators;
  elevators: Elevators[] = [];

  constructor(private elevatorService: ElevatorsService) { }

  ngOnInit(): void {
    this.getElevators();
  }

  getElevators(): void {
    this.elevatorService.getElevators()
      .subscribe(elevators => this.elevators = elevators);
  }

  onSelect(elevator: Elevators): void {
    this.selectedElevator = elevator;
  }
}