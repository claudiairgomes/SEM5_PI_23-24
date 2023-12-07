import { Component } from '@angular/core';
import { Passages } from 'src/app/Interfaces/passages';
import { PassageService } from 'src/app/Services/passages.service';
import {Floors} from "../../../Interfaces/floors";
import {FloorService} from "../../../Services/floors.service";


@Component({
  selector: 'app-create-passages',
  templateUrl: './create-passages.component.html',
  styleUrls: ['./create-passages.component.css']
})
export class CreatePassagesComponent {

  selectedFloor1?: Floors;

  selectedFloor2?: Floors;
  floorsList: Floors[] = [];
  passage ={
    fromFloorId:'',
    toFloorId: '',
    description:''
  }

  constructor(private passageService:PassageService, private floorService:FloorService) { }

 createPassage() {
   if (this.selectedFloor1) {
     this.passage.fromFloorId = this.selectedFloor1.id;
   }

   if (this.selectedFloor2) {
     this.passage.toFloorId = this.selectedFloor2.id;
   }
    const passageData = this.passageService.createPassage(this.passage as Passages).subscribe(
      (response) => {
        alert("Passage created successfully!");
      },
      (error) => {
        alert("Error creating passage...");
      }
    );

  }

  getFloors(): void {
    this.floorService.getFloors()
      .subscribe(floors => {this.floorsList = floors}

      );
  }

  ngOnInit(): void {
    this.getFloors();
  }
}
