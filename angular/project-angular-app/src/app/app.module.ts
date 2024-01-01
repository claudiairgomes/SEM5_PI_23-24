import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateBuildingsComponent } from './features/buildings/create-buildings/create-buildings.component';
import { BuildingsComponent } from './features/buildings/buildings.component';
import { ListBuildingsComponent } from './features/buildings/list-buildings/list-buildings.component';
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule aqui
import { ElevatorsComponent } from './features/elevators/elevators.component';
import { CreateElevatorsComponent } from './features/elevators/create-elevators/create-elevators.component';
import { CreateFloorsComponent } from './features/floors/create-floors/create-floors.component';
import { FloorsComponent } from './features/floors/floors.component';
import { ListFloorsComponent } from './features/floors/list-floors/list-floors.component';
import { UpdateFloorsComponent} from "./features/floors/update-floors/update-floors.component";
import { PassagesComponent} from "./features/passages/passages.component";
import { CreatePassagesComponent} from "./features/passages/create-passages/create-passages.component";
import { ListPassagesComponent} from "./features/passages/list-passages/list-passages.component";
import { UpdatePassagesComponent} from "./features/passages/update-passages/update-passages.component";
import {RobotsComponent} from "./features/robots/robots.component";
import {CreateRobotsComponent} from "./features/robots/create-robots/create-robots.component";
import {ListRobotsComponent} from "./features/robots/list-robots/list-robots.component";
import {UpdateRobotsComponent} from "./features/robots/update-robots/update-robots.component";
import { BuildingDetailsComponent } from './features/buildings/list-buildings/building-details/building-details.component';
import {FloorDetailsComponent} from "./features/floors/list-floors/floor-details/floor-details.component";
import {ListElevatorsComponent} from "./features/elevators/list-elevators/list-elevators.component";
import {
  ElevatorDetailsComponent
} from "./features/elevators/list-elevators/elevator-details/elevator-details.component";
import {PassageDetailsComponent} from "./features/passages/list-passages/passage-details/passage-details.component";
import {RoomsComponent} from "./features/rooms/rooms.component";
import {CreateRoomsComponent} from "./features/rooms/create-rooms/create-rooms.component";
import {RoomDetailsComponent} from "./features/rooms/list-rooms/room-details/room-details.component";
import {ListRoomsComponent} from "./features/rooms/list-rooms/list-rooms.component";
import {UpdateRoomsComponent} from "./features/rooms/update-rooms/update-rooms.component";
import {RobotDetailsComponent} from "./features/robots/list-robots/robot-details/robot-details.component";
import {DeactivateRobotComponent} from "./features/robots/deactivate-robots/deactivate-robot.component";
import {UpdateBuildingsComponent} from "./features/buildings/update-buildings/update-buildings.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RobotTypesComponent} from "./features/robotTypes/robotTypes.component";
import {CreateRobotTypesComponent} from "./features/robotTypes/create-robotTypes/create-robotTypes.component";
import {CreateRegisterComponent} from "./features/register/create-register/create-register.component";
import {RegisterComponent} from "./features/register/register.component";
import {TermsAndConditionsComponent} from "./features/terms-and-conditions/terms-and-conditions.component";





@NgModule({
  declarations: [
    AppComponent,

    TermsAndConditionsComponent,

    RegisterComponent,
    CreateRegisterComponent,

    BuildingsComponent,
    CreateBuildingsComponent,
    UpdateBuildingsComponent,
    ListBuildingsComponent,
    BuildingDetailsComponent,

    ElevatorsComponent,
    CreateElevatorsComponent,
    ListElevatorsComponent,
    ElevatorDetailsComponent,

    FloorsComponent,
    CreateFloorsComponent,
    FloorDetailsComponent,
    ListFloorsComponent,
    UpdateFloorsComponent,

    RoomsComponent,
    CreateRoomsComponent,
    RoomDetailsComponent,
    ListRoomsComponent,
    UpdateRoomsComponent,

    PassagesComponent,
    CreatePassagesComponent,
    ListPassagesComponent,
    PassageDetailsComponent,
    UpdatePassagesComponent,

    RobotsComponent,
    CreateRobotsComponent,
    ListRobotsComponent,
    RobotDetailsComponent,
    UpdateRobotsComponent,
    DeactivateRobotComponent,

    RobotTypesComponent,
    CreateRobotTypesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
