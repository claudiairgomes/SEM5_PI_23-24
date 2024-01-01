import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Buildings} from 'src/app/Interfaces/buildings';
import { BuildingService } from 'src/app/Services/buildings.service';
import {Floors} from 'src/app/Interfaces/floors';
import { TaskService } from 'src/app/Services/task.service';
import { FloorService } from 'src/app/Services/floors.service';
import { PassageService } from 'src/app/Services/passages.service';
import { catchError, tap } from 'rxjs/operators';
import { RoomService } from 'src/app/Services/rooms.service';
import {Rooms} from 'src/app/Interfaces/rooms';
import { ElevatorsService } from 'src/app/Services/elevators.service';
import {Passages} from 'src/app/Interfaces/passages';
import PickupAndDeliveryTask from 'src/app/Interfaces/pickupAndDeliveryTask';
import { AuthService } from 'src/app/Services/auth.service';
import { SystemUsersService } from 'src/app/Services/systemUsers.service';

@Component({
  selector: 'app-pickup-delivery-task-form',
  templateUrl: './pickup-delivery-task.component.html',
  styleUrls: ['./pickup-delivery-task.component.css']
})
export class PickupDeliveryTaskComponent {

  buildings: Buildings[] = [];
  floorsOrig: Floors[] = [];
  floorsDest: Floors[] = [];
  elementsOrig: any[] = [];
  elementsDest: any[] = [];
  selectedTypeOrig = '';
  selectedTypeDest = '';
  selectedBuildingOrig = '';
  selectedBuildingDest = '';
  selectedFloorOrig = '';
  selectedFloorDest = '';
  selectedOrig = '';
  selectedDest = '';

  userId: string = '';
  pickupName: string = '';
  pickupNumber: string = '';
  deliveryName: string = '';
  deliveryNumber: string = '';
  confirmationCode: string = '';
  description: string = '';

  constructor(private taskService: TaskService, private authService: AuthService, private router: Router, private passageService: PassageService,
    private buildingService: BuildingService, private floorService: FloorService, private roomService: RoomService,
    private elevatorService: ElevatorsService, private userService: SystemUsersService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.authService.auth().subscribe((authUser) => {
      this.userService.getUserByEmail(authUser.email).subscribe((user) => {
          this.userId = user.id;
      });
    });

    this.buildingService.getBuildings().subscribe((buildings) => {
      this.buildings = buildings;
    });
  }

  closeForm() {
    this.router.navigate(["/user/requestTask"]);
  }

  onBuildingOrigChange() {
    this.floorsOrig = [];
    this.elementsOrig = [];
    this.floorService.getFloorsFromBuilding(this.selectedBuildingOrig).subscribe((floors: Floors[]) => {
        this.floorsOrig = floors;
    });
  }

  onBuildingDestChange() {
    this.floorsDest = [];
    this.elementsDest = [];
    this.floorService.getFloorsFromBuilding(this.selectedBuildingDest).subscribe((floors: Floors[]) => {
        this.floorsDest = floors;
    });
  }

  onFloorOrigChange() {
    this.elementsOrig = [];
    this.getElementsFromType1(this.selectedTypeOrig);
  }

  onFloorDestChange() {
    this.elementsDest = [];
    this.getElementsFromType2(this.selectedTypeDest);
  }

  onSubmit() {

    const pickupAndDeliveryTask = ({
      pickupPlace: this.selectedOrig,
      deliveryPlace: this.selectedDest,
      pickupPersonName: this.pickupName,
      pickupPersonPhoneNumber: this.pickupNumber,
      deliveryPersonName: this.deliveryName,
      deliveryPersonPhoneNumber: this.deliveryNumber,
      description: this.description,
      confirmationCode: this.confirmationCode,
      userId: this.userId
    }) as PickupAndDeliveryTask;

    this.taskService.createPickupAndDeliveryTask(pickupAndDeliveryTask)
      .pipe(
        tap((response) => {
          console.log('PickupAndDelivery Task  requested sucessfully!', response);
          const message = `PickupAndDelivery Task  requested sucessfully!`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while requesting PickupAndDelivery Task ', error);
          this.snackBar.open('Failed to requesting PickupAndDelivery Task, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }

  getElementsFromType1(type: string): void {
    let mensagem: string;

    switch (type) {
        case "sala":
          this.roomService.getRoomsByFloor(this.selectedFloorOrig).subscribe((rooms: Rooms[]) => {
            rooms.forEach(room => {
              this.elementsOrig.push(room.description);
            });
          });
          break;
        case "elev":
          this.elevatorService.getElevatorByBuilding(this.selectedBuildingOrig).subscribe((elevator) => {
            this.elementsOrig.push(elevator.description);
          });
          break;
        case "pass":
          this.passageService.getPassagesByFloor(this.selectedFloorOrig).subscribe((passages: Passage[]) => {
            passages.forEach(passage => {
              this.elementsOrig.push(passage.description);
            });
          });
          break;
        default:
            mensagem = "Dia inválido";
    }
  }

  getElementsFromType2(type: string): void {
    let mensagem: string;

    switch (type) {
        case "sala":
          this.roomService.getRoomsByFloor(this.selectedFloorDest).subscribe((rooms: Rooms[]) => {
            rooms.forEach(room => {
              this.elementsDest.push(room.description);
            });
          });
          break;
        case "elev":
          this.elevatorService.getElevatorByBuilding(this.selectedBuildingDest).subscribe((elevator) => {
            this.elementsDest.push(elevator.description);
          });
          break;
        case "pass":
          this.passageService.getPassagesByFloor(this.selectedFloorDest).subscribe((passages: Passage[]) => {
            passages.forEach(passage => {
              this.elementsDest.push(passage.description);
            });
          });
          break;
        default:
            mensagem = "Dia inválido";
    }
  }

}
