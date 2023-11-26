import { Component, Input } from '@angular/core';
import { Floors } from '../../../../Interfaces/floors';

@Component({
  selector: 'app-floor-details',
  templateUrl: './floor-details.component.html',
  //styleUrls: ['./floor-details.component.css']
})
export class FloorDetailsComponent {
    @Input() floor?: Floors;
}
