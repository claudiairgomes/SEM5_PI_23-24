import { Component } from '@angular/core';
import RobotType from 'src/app/Interfaces/robotType';
import { RobotTypeService } from 'src/app/Services/robotType.service';
import {forkJoin, Observable} from "rxjs";
import TaskType from 'src/app/Interfaces/taskType';
import {catchError, tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";



@Component({
  selector: 'app-create-robotTypes',
  templateUrl: './create-robotTypes.component.html',
  styleUrls: ['./create-robotTypes.component.css']
})
export class CreateRobotTypesComponent {
  checkboxValues: boolean[] = [false, false];
  tasktype: string[] = ["pickup & delivery", "surveillance"];
  code: string = " ";
  brand: string = " ";
  model: string = " ";
  taskTypes: string[] = [];
  observables: Observable<TaskType>[] = [];

  constructor(private robotTypeService: RobotTypeService, private snackBar: MatSnackBar) {
  }

  createRobotType() {
    for (let i = 0; i < this.checkboxValues.length; i++) {
      if (this.checkboxValues[i] === true) {
        this.observables.push(
          this.robotTypeService.getTaskType(this.tasktype[i])
        );
      }
    }

    forkJoin(this.observables).subscribe((taskTypes: TaskType[]) => {
        for (const taskType of taskTypes) {
          this.taskTypes.push(taskType.id);
        }

        const robotTypeData = ({
          code: this.code,
          brand: this.brand,
          model: this.model,
          taskTypes: this.taskTypes
        }) as RobotType;

        this.robotTypeService.createRobotType(robotTypeData)
          .pipe(
            tap((response) => {
              console.log('RobotType created successfully', response);
              const message = `RobotType created successfully! | Code: ${response.code} | Brand: ${response.brand} | Model: ${response.model}`;
              this.snackBar.open(message, 'Close', {
                duration: 5000, // 5 seconds
              });
            }),
            catchError((error) => {
              console.error('Error occurred while creating the RobotType', error);
              this.snackBar.open('Failed to create RobotType, returned code:' + error.status, 'Close', {
                duration: 5000, // 5 seconds
              });
              throw error;
            })
          )
          .subscribe();
      }
    );

    this.taskTypes = [];
    this.observables = [];
  }
}
