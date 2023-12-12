import { Component } from '@angular/core';
import { PassageService } from '../../../Services/passages.service';
import { Passages } from '../../../Interfaces/passages';

@Component({
  selector: 'app-list-passages',
  templateUrl: './list-passages.component.html',
  styleUrls: ['./list-passages.component.css']
})
export class ListPassagesComponent {
  selectedPassage?: Passages;
  passagesList: Passages[] = [];

  isLinear: any;
  constructor(private passageService: PassageService) { }

  ngOnInit(): void {
    this.getPassages();
  }

  getPassages(): void {
    this.passageService.getPassages()
      .subscribe(passages => this.passagesList = passages);
  }

  onSelect(passage: Passages): void {
    this.selectedPassage = passage;
  }
}
