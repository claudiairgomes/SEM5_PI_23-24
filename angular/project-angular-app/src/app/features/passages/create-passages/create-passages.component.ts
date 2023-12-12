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
    name:'',
    fromFloor:'',
    toFloor: '',
    description:''
  }

  constructor(private passageService:PassageService, private floorService:FloorService) { }

 createPassage() {
    const passageData = this.passageService.createPassage(this.passage as Passages).subscribe(

      (response) => {
        alert("Passage created successfully!");
      },
      (error) => {
        alert("Error creating passage...");
      }
    );
    console.log(passageData)


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
