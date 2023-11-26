import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateBuildingsComponent } from './features/buildings/create-buildings/create-buildings.component';
import { BuildingsComponent } from './features/buildings/buildings.component';
import { UpdateBuildingsComponent } from './features/buildings/update-buildings/update-buildings.component';
import { ListBuildingsComponent } from './features/buildings/list-buildings/list-buildings.component';
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule aqui
import { ElevatorsComponent } from './features/elevators/elevators.component';
import { CreateElevatorsComponent } from './features/elevators/create-elevators/create-elevators.component';
import { CreateFloorsComponent } from './features/floors/create-floors/create-floors.component';
import { FloorsComponent } from './features/floors/floors.component';
import { ListFloorsComponent } from './features/floors/list-floors/list-floors.component';
import {UpdateFloorsComponent} from "./features/floors/update-floors/update-floors.component";
import {PassagesComponent} from "./features/passages/passages.component";
import {CreatePassagesComponent} from "./features/passages/create-passages/create-passages.component";
import {ListPassagesComponent} from "./features/passages/list-passages/list-passages.component";
import {UpdatePassagesComponent} from "./features/passages/update-passages/update-passages.component";





@NgModule({
  declarations: [
    AppComponent,
    BuildingsComponent,
    CreateBuildingsComponent,
    UpdateBuildingsComponent,
    ListBuildingsComponent,
    ElevatorsComponent,
    CreateElevatorsComponent,
    CreateBuildingsComponent,
    FloorsComponent,
    CreateFloorsComponent,
    ListFloorsComponent,
    UpdateFloorsComponent,
    PassagesComponent,
    CreatePassagesComponent,
    ListPassagesComponent,
    UpdatePassagesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
    ,HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
