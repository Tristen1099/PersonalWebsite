import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Cell } from './cell';
import { CellStatus, NEIGHBORS } from './cell';

@Component({
  selector: 'app-bomb-duster',
  templateUrl: './bomb-duster.component.html',
  styleUrls: ['./bomb-duster.component.scss']
})
export class BombDusterComponent implements OnInit {

  gameBoard: Cell[][];
  gameStarted: boolean;

  @ViewChild('gameLevel', { static: true })
  gameLevel: ElementRef<HTMLSelectElement>;

  firstClick: boolean;

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      AppComponent.mainPage = false;
    });
  }

  newGame() {
    this.gameBoard = [];
    this.gameStarted = false;
    this.firstClick = true;
    this.gameLevel.nativeElement.disabled = false;

    this.setUpGameBoard();
    console.log(this.gameBoard);
  }

  levelChanged() {
    if (!this.gameStarted) {
      this.newGame();
    }
  }

  checkCell(cell: Cell) {
    this.gameStarted = true;
    this.gameLevel.nativeElement.disabled = true;
    if (this.firstClick && cell.isBomb) {
      this.setUpGameBoard();
    } else {
      this.firstClick = false;
      if (cell.status != CellStatus.UnTouched) {
        return;
      } else if (cell.isBomb) {
        this.gameOver();
      } else {
        cell.status = CellStatus.Cleared;
        if (cell.neighborBombs === 0) {
          for (const peer of NEIGHBORS) {
            if (
              this.gameBoard[cell.cellRow + peer[0]] &&
              this.gameBoard[cell.cellRow + peer[0]][cell.cellColumn + peer[1]]
            ) {
              this.checkCell(this.gameBoard[cell.cellRow + peer[0]][cell.cellColumn + peer[1]]);
            }
          }
        }
      }
    }
  }

  flagCell(cell: Cell) {
    if (this.firstClick) {
      return;
    }
    this.gameStarted = true;
    this.gameLevel.nativeElement.disabled = true;
    cell.flagCell();

    console.log(cell);
  }


  private setUpGameBoard() {
    let level = this.gameLevel.nativeElement.value;
    let rows = 0;
    let columns = 0;
    let bombs = 0;

    if (level === "1") {
      rows = 10;
      columns = 10;
      bombs = 10;
    } else if (level === "2") {
      rows = 15;
      columns = 15;
      bombs = 50;
    } else {
      rows = 25;
      columns = 25;
      bombs = 100;
    }

    for (var i: number = 0; i < rows; i++) {
      this.gameBoard[i] = [];
      for (var j: number = 0; j < columns; j++) {
        let cell = new Cell();
        cell.cellRow = i;
        cell.cellColumn = j;
        this.gameBoard[i][j] = cell;
      }
    }

    this.placeRandomBombs(bombs);
    this.countNeighborBombs();
  }

  private gameOver() {
    this.showAll();
  }

  private showAll() {
    for (const row of this.gameBoard) {
      for (const cell of row) {
        if (cell.status != CellStatus.Cleared) {
          cell.status = CellStatus.Cleared;
        }
      }
    }
  }

  private countNeighborBombs() {
    for (let y = 0; y < this.gameBoard.length; y++) {
      for (let x = 0; x < this.gameBoard[y].length; x++) {
        let adjacentBombs = 0;
        for (const peer of NEIGHBORS) {
          if (
            this.gameBoard[y + peer[0]] &&
            this.gameBoard[y + peer[0]][x + peer[1]] &&
            this.gameBoard[y + peer[0]][x + peer[1]].isBomb
          ) {
            adjacentBombs++;
          }
        }
        this.gameBoard[y][x].neighborBombs = adjacentBombs;
      }
    }
  }

  private placeRandomBombs(bombsLeft: number) {

    if (bombsLeft > 0) {
      let y = Math.floor(Math.random() * this.gameBoard.length);
      let x = Math.floor(Math.random() * this.gameBoard[y].length);

      if (this.gameBoard[y][x].isBomb == false) {
        this.gameBoard[y][x].isBomb = true;
        bombsLeft -= 1;
        this.placeRandomBombs(bombsLeft);
      } else {
        this.placeRandomBombs(bombsLeft);
      }
    }
  }

}
