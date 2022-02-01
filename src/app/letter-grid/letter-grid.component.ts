import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

import { LetterInput } from '../models/letterInput';

@Component({
  selector: 'app-letter-grid',
  templateUrl: './letter-grid.component.html',
  styleUrls: ['./letter-grid.component.css']
})
export class LetterGridComponent implements OnInit {
  letterGrid: LetterInput[] = [
    { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''},
    { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''},
    { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''},
    { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''},
    { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''},
    { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''}, { letter: '', color: ''},
  ];
  colorOptions = ['grey', 'yellow', 'green'];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.letterGridChange();
  }

  letterGridChange() {
    this.dataService.setLetterGrid(this.letterGrid);
  }
}
