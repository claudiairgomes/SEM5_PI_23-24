import { Component } from '@angular/core';
import { Robots } from 'src/app/Interfaces/robots';
import { RobotService } from 'src/app/Services/robots.service';


@Component({
  selector: 'app-update-robot',
  templateUrl: './update-robots.component.html',
  styleUrls: ['./update-robots.component.css']
})
export class UpdateRobotsComponent {
  robot ={
    codRobot:'',
    nickName:'',
    type:'',
    serialNumber:'',
    description:''

  }

  constructor(private robotervice:RobotService) { }

 updateRobot() {
    const robotData = this.robotervice.updateRobot(this.robot as Robots).subscribe(
      (response) => {
        alert("Robot updated successfully!");
      },
      (error) => {
        alert("Error updating robot...");
      }
    );

  }
}
