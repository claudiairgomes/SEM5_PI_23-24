import { Component } from '@angular/core';
import { Passages } from 'src/app/Interfaces/passages';
import { PassageService } from 'src/app/Services/passages.service';


@Component({
  selector: 'app-update-passages',
  templateUrl: './update-passages.component.html',
  styleUrls: ['./update-passages.component.css']
})
export class UpdatePassagesComponent {
  passage ={
    fromFloorId:'',
    toFloorId:'',
    description:'',
  }

  constructor(private passageService:PassageService) { }

 updatePassage() {
    const passageData = this.passageService.updatePassage(this.passage as Passages).subscribe(
      (response) => {
        alert("Passage created successfully!");
      },
      (error) => {
        alert("Error creating passage...");
      }
    );

  }
}
