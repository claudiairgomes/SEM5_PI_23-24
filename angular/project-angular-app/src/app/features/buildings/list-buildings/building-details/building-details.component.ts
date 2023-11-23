import { Component, Input } from '@angular/core';
import { Buildings } from '../../../../Interfaces/buildings';

@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  //styleUrls: ['./building-details.component.css']
})
export class BuildingDetailsComponent {
    @Input() building?: Buildings;
}