import { Component } from '@angular/core';
import { RobotService } from '../../../Services/robots.service';
import { Robots } from '../../../Interfaces/robots';

@Component({
  selector: 'app-list-robots',
  templateUrl: './list-robots.component.html',
  styleUrls: ['./list-robots.component.css']
})
export class ListRobotsComponent {
  selectedRobot?: Robots;
  robotsList: Robots[] = [];

  constructor(private robotService: RobotService) { }

  ngOnInit(): void {
    this.getRobots();
  }

  getRobots(): void {
    this.robotService.getRobots()
      .subscribe(robots => this.robotsList = robots);
  }

  onSelect(robot: Robots): void {
    this.selectedRobot = robot;
  }
}
