import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RobotService } from 'src/app/Services/robots.service';
import { catchError, tap } from 'rxjs/operators';
import { Robots } from 'src/app/Interfaces/robots';


@Component({
  selector: 'app-deactivate-robot',
  templateUrl: './deactivate-robot.component.html',
  styleUrls: ['./deactivate-robot.component.css']
})
export class DeactivateRobotComponent {

  selectedRobot?: Robots;
  robotId = "";
  robots: Robots[] = [];

  constructor(private robotService: RobotService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.robotService.getRobots().subscribe((robots) => {
      this.robots = robots;
    });
  }

  onSelect(robot: Robots): void {
    this.selectedRobot = robot;
  }

  deactivate() {

    if (!this.selectedRobot) {
      return; // No robot selected, do nothing
    }

    const robotData = {
      id: this.selectedRobot.id,
    } as Robots;

    if (this.selectedRobot.isActive) {
      this.robotService.deactivateRobot(robotData)
        .pipe(
          tap((response) => {
            console.log('Robot deactivated', response);
            const message = `Robot deactivated successfully! | Code: ${response.codRobot} | Name: ${response.name} | Active: ${response.isActive}`;
            this.snackBar.open(message, 'Close', {
              duration: 5000, //5 seconds
            });
          }),
          catchError((error) => {
            console.error('Error occurred while deactivating the Robot', error);
            this.snackBar.open('Failed to deactivate robot, returned code:' + error.status, 'Close', {
              duration: 5000, //5 seconds
            });
            throw error;
          })
        )
        .subscribe();
    } else {
      // Alert the user that the robot is already inactive
      console.warn(`The selected robot is already inactive.`);
    }
  }
}
