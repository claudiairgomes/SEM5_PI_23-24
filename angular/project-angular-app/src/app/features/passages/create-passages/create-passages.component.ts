import { Component } from '@angular/core';
import { Passages } from 'src/app/Interfaces/passages';
import { PassageService } from 'src/app/Services/passages.service';


@Component({
  selector: 'app-create-passages',
  templateUrl: './create-passages.component.html',
  styleUrls: ['./create-passages.component.css']
})
export class CreatePassagesComponent {
  passage ={
    fromFloorId:'',
    toFloorId: '',
    description:''
  }

  constructor(private passageService:PassageService) { }

 createPassage() {
    const passageData = this.passageService.createPassage(this.passage as Passages).subscribe(
      (response) => {
        alert("Passage created successfully!");
      },
      (error) => {
        alert("Error creating passage...");
      }
    );

  }
}
