import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { LetterMatch } from '../models/letterMatch';
import { LetterInput } from '../models/letterInput';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit {
  letterGrid: LetterInput[] = [];
  allWords: string[] = this.dataService.wordList;
  matchingWords: string[] = [];

  negativeLetters: string[] = [];
  partialMatchLetters: LetterMatch[] = [];
  matchLetters: LetterMatch[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  refresh() {
    this.letterGrid = this.dataService.getLetterGrid();
    this.generateLetterLists();

    this.matchingWords = this.allWords.filter((word: string) => {
      let negativeLettersClear = true;
      let partialLettersClear = true;
      let matchLettersClear = true;

      //check for letters that are not in the word
      this.negativeLetters.forEach((letter) => {
        if (word.indexOf(letter.toLowerCase()) > -1) {
          negativeLettersClear = false;
        }
      });

      //check for letters that are in the word in a different place
      this.partialMatchLetters.forEach((letterObj) => {
        if (word.indexOf(letterObj.letter.toLowerCase()) === -1 ||
          (word.indexOf(letterObj.letter.toLowerCase()) > -1 && word[letterObj.position] === letterObj.letter.toLowerCase())) {
          partialLettersClear = false;
        }
      });

      //check for letters that are in the word in that place
      this.matchLetters.forEach((letterObj) => {
        if (word.indexOf(letterObj.letter.toLowerCase()) === -1 ||
          (word.indexOf(letterObj.letter.toLowerCase()) > -1 && word[letterObj.position] !== letterObj.letter.toLowerCase())) {
            matchLettersClear = false;
        }
      });

      return negativeLettersClear && partialLettersClear && matchLettersClear;
    });
  }

  generateLetterLists() {
    //letters that are not a match
    this.negativeLetters = [];
    this.letterGrid.forEach((letterObj: LetterInput) => {
      if (letterObj.color == 'grey') {
        this.negativeLetters.push(letterObj.letter);
      }
    });

    //letters that are a partial match
    this.partialMatchLetters = [];
    this.letterGrid.forEach((letterObj, index) => {
      if (letterObj.color == 'yellow') {
        this.partialMatchLetters.push({
          letter: letterObj.letter,
          position: (index%5)
        })
      }
    });

    //letters that a full match
    this.matchLetters = [];
    this.letterGrid.forEach((letterObj, index) => {
      if (letterObj.color == 'green') {
        this.matchLetters.push({
          letter: letterObj.letter,
          position: (index%5)
        })
      }
    });
  }
}
