import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buildings',
  templateUrl: './robotTypes.component.html',
  styleUrls: ['./robotTypes.component.css']
})
export class RobotTypesComponent {

  constructor(private observer: BreakpointObserver, private router: Router){
  }



}
