import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingsComponent } from './features/buildings/buildings.component';
import { CreateBuildingsComponent } from './features/buildings/create-buildings/create-buildings.component';
import { UpdateBuildingsComponent } from './features/buildings/update-buildings/update-buildings.component';
import { ListBuildingsComponent } from './features/buildings/list-buildings/list-buildings.component';
import { CreateElevatorsComponent } from './features/elevators/create-elevators/create-elevators.component';
import { ElevatorsComponent } from './features/elevators/elevators.component';
import { BuildingDetailsComponent } from './features/buildings/list-buildings/building-details/building-details.component';

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



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
