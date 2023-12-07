import { Component, Input } from '@angular/core';
import { Passages } from '../../../../Interfaces/passages';

@Component({
  selector: 'app-passage-details',
  templateUrl: './passage-details.component.html',
  styleUrls: ['./passage-details.component.css']
})
export class PassageDetailsComponent {
    @Input() passage?: Passages;
}
