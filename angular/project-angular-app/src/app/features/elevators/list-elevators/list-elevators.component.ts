import { Component } from '@angular/core';
import { Elevators } from 'src/app/Interfaces/elevators';
import { ElevatorsService } from 'src/app/Services/elevators.service';


@Component({
  selector: 'app-elevators',
  templateUrl: './list-elevators.component.html',
  styleUrls: ['./list-elevators.component.css']
})
export class ListElevatorsComponent {
  selectedElevator?: Elevators;
  elevatorsList: Elevators[] = [];

  constructor(private elevatorService: ElevatorsService) { }

  ngOnInit(): void {
    this.getElevators();
  }

  getElevators(): void {
    this.elevatorService.getElevators()
      .subscribe(elevators => this.elevatorsList = elevators);
  }

  onSelect(elevator: Elevators): void {
    this.selectedElevator = elevator;
  }
}
