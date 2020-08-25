import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CellComponent } from './cell/cell.component';

@Component({
  selector: 'app-bomb-duster',
  templateUrl: './bomb-duster.component.html',
  styleUrls: ['./bomb-duster.component.scss']
})
export class BombDusterComponent implements OnInit {

  gameBoard: CellComponent[][];
  gameStarted: boolean;

  @ViewChild('gameLevel', { static: true })
  gameLevel: ElementRef<HTMLSelectElement>;

  constructor() { }

  ngOnInit() {
    this.newGame();
    this.gameStarted = false;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      AppComponent.mainPage = false;
    });
  }

  newGame() {

    this.gameBoard = [];


    let level = this.gameLevel.nativeElement.value;
    let rows = 0;
    let columns = 0;

    if (level === "1") {
      rows = 10;
      columns = 10;
    } else if (level === "2") {
      rows = 15;
      columns = 15;
    } else {
      rows = 25;
      columns = 25;
    }

    for (var i: number = 0; i < rows; i++) {
      this.gameBoard[i] = [];
      for (var j: number = 0; j < columns; j++) {
        let cell = new CellComponent();
        cell.cellRow = i;
        cell.cellColumn = j;
        this.gameBoard[i][j] = cell;
      }
    }
  }

  levelChanged() {
    if (!this.gameStarted) {
      this.newGame();
    }
  }

}
