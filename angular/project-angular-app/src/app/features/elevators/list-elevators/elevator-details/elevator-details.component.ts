import { Component, Input } from '@angular/core';
import { Buildings } from '../../../../Interfaces/buildings';

@Component({
  selector: 'app-elevator-details',
  templateUrl: './elevator-details.component.html',
  //styleUrls: ['./building-details.component.css']
})
export class BuildingDetailsComponent {
    @Input() building?: Buildings;
}