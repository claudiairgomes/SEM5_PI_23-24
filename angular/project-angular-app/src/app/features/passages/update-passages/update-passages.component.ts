import {Component, OnInit} from '@angular/core';
import { Passages } from 'src/app/Interfaces/passages';
import { PassageService } from 'src/app/Services/passages.service';


@Component({
  selector: 'app-update-passages',
  templateUrl: './update-passages.component.html',
  styleUrls: ['./update-passages.component.css']
})
export class UpdatePassagesComponent implements OnInit{

  passages: Passages[] = [];
  selectedPassage: Passages ={
    id:'',
    name:'',
    fromFloor:'',
    toFloor:'',
    description:'',
  }

  constructor(private passageService:PassageService) { }

  ngOnInit(): void {
    this.loadPassages();
  }

  loadPassages() {
    this.passageService.getPassages().subscribe(
      (passages) => {
        this.passages = passages;
      },
      (error) => {
        console.error('Error loading passages:', error);
      }
    );
  }
  editPassage(id: string) {
    console.log(id);
    this.passageService.getPassageById(id).subscribe(
      (passage) => {
        this.selectedPassage = passage;
      },
      (error) => {
        console.error('Error loading passage details:', error);
      }
    );
  }

  updatePassage() {
    this.passageService.updatePassage(this.selectedPassage).subscribe(
      (response) => {
        alert('Passage updated successfully!');
        this.loadPassages(); // Reload the list of passages after an update
      },
      (error) => {
        alert('Error updating passage...');
      }
    );
  }
}
