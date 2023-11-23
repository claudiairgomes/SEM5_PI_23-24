import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingsComponent } from './features/buildings/buildings.component';
import { CreateBuildingsComponent } from './features/buildings/create-buildings/create-buildings.component';

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


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
