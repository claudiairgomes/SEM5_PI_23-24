import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';


@Component({
  selector: 'app-passages',
  templateUrl: './passages.component.html',
  styleUrls: ['./passages.component.css']
})
export class PassagesComponent {

  constructor(private observer: BreakpointObserver, private router: Router){
  }



}
