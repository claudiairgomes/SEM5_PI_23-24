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


@NgModule({
  declarations: [
    AppComponent,
    BuildingsComponent,
    CreateBuildingsComponent,
    UpdateBuildingsComponent,
    ListBuildingsComponent,
    ElevatorsComponent,
    CreateElevatorsComponent
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
