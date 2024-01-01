import { Component } from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  constructor(private observer: BreakpointObserver, private router: Router){
  }


}
