import { Component } from '@angular/core';
import { PassageService } from '../../../Services/passages.service';
import { Passages } from '../../../Interfaces/passages';

@Component({
  selector: 'app-list-passages',
  templateUrl: './list-passages.component.html',
  //styleUrls: ['./list-passages.component.css']
})
export class ListPassagesComponent {
  selectedPassage?: Passages;
  passages: Passages[] = [];

  constructor(private passageService: PassageService) { }

  ngOnInit(): void {
    this.getPassages();
  }

  getPassages(): void {
    console.log(this.passages);
    this.passageService.getPassages()
      .subscribe(passages => this.passages = passages);
  }

  onSelect(passage: Passages): void {
    this.selectedPassage = passage;
  }
}
