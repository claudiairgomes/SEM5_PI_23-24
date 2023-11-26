import { Component } from '@angular/core';
import { Elevators } from 'src/app/Interfaces/elevator';
import { ElevatorsService } from 'src/app/Services/elevators.service';


@Component({
  selector: 'app-create-elevators',
  templateUrl: './create-elevators.component.html',
  styleUrls: ['./create-elevators.component.css']
})
export class CreateElevatorsComponent {
  elevator = {
    building: '',
    floorList: '',
    brand: '',
    model: '',
    serialNumber: '',
    description: '',
  };

  constructor(private elevatorService: ElevatorsService) {}

  /*createElevator() {
    const elevatorData = this.elevatorService.createElevator(this.elevator as Elevators).subscribe(
      (response) => {
        alert("Elevator created successfully!");
      },
      (error) => {
        alert("Error creating elevator...");
      }
    );
  }*/
}
