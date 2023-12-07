import { Component, Input } from '@angular/core';
import {Elevators} from "../../../../Interfaces/elevators";

@Component({
  selector: 'app-elevator-details',
  templateUrl: './elevator-details.component.html',
  styleUrls: ['./elevator-details.component.css']
})
export class ElevatorDetailsComponent {
    @Input() elevator?: Elevators;
}
