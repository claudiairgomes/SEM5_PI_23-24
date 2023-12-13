import { Component, Input } from '@angular/core';
import { Robots } from '../../../../Interfaces/robots';

@Component({
  selector: 'app-robot-details',
  templateUrl: './robot-details.component.html',
  styleUrls: ['./robot-details.component.css']
})
export class RobotDetailsComponent {
    @Input() robot?: Robots;
}
