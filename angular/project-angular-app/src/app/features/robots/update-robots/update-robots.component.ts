import {Component, OnInit} from '@angular/core';
import { Robots } from 'src/app/Interfaces/robots';
import { RobotService } from 'src/app/Services/robots.service';
import {Buildings} from "../../../Interfaces/buildings";


@Component({
  selector: 'app-update-robot',
  templateUrl: './update-robots.component.html',
  styleUrls: ['./update-robots.component.css']
})
export class UpdateRobotsComponent implements OnInit{

  robots: Robots[] = [];
  selectedRobot ={
    id:'',
    codRobot:'',
    name:'',
    type:'',
    serialNumber:'',
    description:''

  }

  constructor(private robotService:RobotService) { }

  ngOnInit(): void {
    this.loadRobots();
  }

  loadRobots() {
    this.robotService.getRobots().subscribe(
      (robots) => {
        this.robots = robots;
      },
      (error) => {
        console.error('Error loading robots:', error);
      }
    );
  }

  editRobot(id: string) {
    console.log(id);
    this.robotService.getRobotsById(id).subscribe(
      (robot) => {
        this.selectedRobot = robot;
      },
      (error) => {
        console.error('Error loading robot details:', error);
      }
    );
  }
 updateRobot() {
   this.robotService.updateRobot(this.selectedRobot).subscribe(
     (response) => {
       alert('Building updated successfully!');
       this.loadRobots(); // Reload the list of robots after an update
     },
     (error) => {
       alert('Error updating robot...');
     }
    );

  }
}
