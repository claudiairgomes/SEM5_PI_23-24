import { Component } from '@angular/core';
import { Robots } from 'src/app/Interfaces/robots';
import { RobotService } from 'src/app/Services/robots.service';

@Component({
  selector: 'app-create-robots',
  templateUrl: './create-robots.component.html',
  styleUrls: ['./create-robots.component.css']
})
export class CreateRobotsComponent {
  robot ={
    codRobot:'',
    name:'',
    type:'',
    serialNumber:'',
    description:'',
    isActive:true,
  }

  constructor(private robotService:RobotService) { }

  createRobot() {
    const robotData = this.robotService.createRobot(this.robot as Robots ).subscribe(
      (response) => {
        alert("Robot created successfully!");
      },
      (error) => {
        alert("Error creating robot...");
      }
    );

  }
}
