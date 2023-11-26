import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingsComponent } from './features/buildings/buildings.component';
import { CreateBuildingsComponent } from './features/buildings/create-buildings/create-buildings.component';
import { UpdateBuildingsComponent } from './features/buildings/update-buildings/update-buildings.component';
import { ListBuildingsComponent } from './features/buildings/list-buildings/list-buildings.component';
import { CreateElevatorsComponent } from './features/elevators/create-elevators/create-elevators.component';
import { ElevatorsComponent } from './features/elevators/elevators.component';
import { BuildingDetailsComponent } from './features/buildings/list-buildings/building-details/building-details.component';
import { FloorsComponent } from './features/floors/floors.component';
import { CreateFloorsComponent } from './features/floors/create-floors/create-floors.component';
import {ListFloorsComponent} from "./features/floors/list-floors/list-floors.component";
import {UpdateFloorsComponent} from "./features/floors/update-floors/update-floors.component";
import {PassagesComponent} from "./features/passages/passages.component";
import {CreatePassagesComponent} from "./features/passages/create-passages/create-passages.component";
import {ListPassagesComponent} from "./features/passages/list-passages/list-passages.component";
import {UpdatePassagesComponent} from "./features/passages/update-passages/update-passages.component";
import {RobotsComponent} from "./features/robots/robots.component";
import {CreateRobotsComponent} from "./features/robots/create-robots/create-robots.component";
import {ListRobotsComponent} from "./features/robots/list-robots/list-robots.component";
import {UpdateRobotsComponent} from "./features/robots/update-robots/update-robots.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
     redirectTo: 'home'
  },
  {
    path: 'buildings',
    component: BuildingsComponent
  },

  {
    path: 'buildings/createBuildings',
    component: CreateBuildingsComponent
  },

  {
    path: 'buildings/updateBuildings',
    component: UpdateBuildingsComponent
  },

  {
    path: 'buildings/listBuildings',
    component: ListBuildingsComponent
  },

  {
    path: 'buildings/listBuildings/buildingDetails',
    component: BuildingDetailsComponent
  },


  {
    path: 'elevators',
    component: ElevatorsComponent
  },

  {
    path: 'elevators/createElevators',
    component: CreateElevatorsComponent
  },

  {
    path: 'floors',
    component: FloorsComponent
  },

  {
    path: 'floors/createFloors',
    component: CreateFloorsComponent
  },

  {
    path: 'floors/listFloors',
    component: ListFloorsComponent
  },
  {
    path: 'floors/updateFloors',
    component: UpdateFloorsComponent
  },

  {
    path: 'passages',
    component: PassagesComponent
  },

  {
    path: 'passages/createPassages',
    component: CreatePassagesComponent
  },

  {
    path: 'passages/listPassages',
    component: ListPassagesComponent
  },
  {
    path: 'passages/updatePassages',
    component: UpdatePassagesComponent
  },

  {
    path: 'robots',
    component: RobotsComponent
  },

  {
    path: 'passages/createRobots',
    component: CreateRobotsComponent
  },

  {
    path: 'passages/listRobots',
    component: ListRobotsComponent
  },
  {
    path: 'passages/updateRobots',
    component: UpdateRobotsComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
