import { Component } from '@angular/core';

@Component({
  selector: 'app-user-side-bar',
  templateUrl: './user-side-bar.component.html',
  styleUrls: ['./user-side-bar.component.css']
})
export class UserSideBarComponent {

  userOptions: boolean = false;

  showOptions() {
    if(this.userOptions === true) {
      this.userOptions = false;
    }else{
      this.userOptions = true;
    }
  }
}
