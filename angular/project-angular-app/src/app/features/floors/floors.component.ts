import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';


@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  //styleUrls: ['./floors.component.css']
})
export class FloorsComponent {

  constructor(private observer: BreakpointObserver, private router: Router){
  }

}
