import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateBuildingsComponent } from './features/buildings/create-buildings/create-buildings.component';
import { BuildingsComponent } from './features/buildings/buildings.component';
import { CreateFloorsComponent } from './features/floors/create-floors/create-floors.component';
import { FloorsComponent } from './features/floors/floors.component';



@NgModule({
  declarations: [
    AppComponent,
    BuildingsComponent,
    CreateBuildingsComponent,
    FloorsComponent,
    CreateFloorsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
