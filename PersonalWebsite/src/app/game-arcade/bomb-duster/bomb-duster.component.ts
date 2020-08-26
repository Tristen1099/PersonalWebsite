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
  gameEnded: boolean;
  gameFlags: number;

  @ViewChild('gameLevel', { static: true })
  gameLevel: ElementRef<HTMLSelectElement>;

  firstClick: boolean;
  timeElapsed: number;
  interval;

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
    this.gameEnded = false;
    this.stopClock();
    this.timeElapsed = 0;
    this.firstClick = true;
    this.gameLevel.nativeElement.disabled = false;

    this.setUpGameBoard();
  }

  levelChanged() {
    if (!this.gameStarted) {
      this.newGame();
    }
  }

  checkCell(cell: Cell) {
    this.gameStarted = true;
    this.gameLevel.nativeElement.disabled = true;

    if (this.firstClick) {
      this.startClock();
    }

    if (this.firstClick && cell.isBomb) {
      this.setUpGameBoard();
    } else {
      this.firstClick = false;
      if (cell.status != CellStatus.UnTouched) {
        return;
      } else if (cell.isBomb) {
        this.gameOver(false);
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

    this.checkIfGameEnd();
  }

  flagCell(cell: Cell) {
    if (this.firstClick) {
      this.startClock();
      return;
    }

    this.gameStarted = true;
    this.gameLevel.nativeElement.disabled = true;

    if (cell.status == CellStatus.Cleared) {
      return;
    }
    if (cell.status == CellStatus.UnTouched) {
      cell.status = CellStatus.Flagged;
      this.gameFlags--;
    } else if (cell.status == CellStatus.Flagged) {
      cell.status = CellStatus.UnTouched;
      this.gameFlags++;
    }

    this.checkIfGameEnd();
  }

  private checkIfGameEnd() {
    let allMarked = true;

    for (var row of this.gameBoard) {

      let marked = row.every(cell => ((cell.isBomb && cell.status == CellStatus.Flagged) || (!cell.isBomb && cell.status != CellStatus.Flagged)));

      if (!marked) {
        allMarked = marked;
      }
    }

    if (allMarked) {
      this.gameOver(true);
    }
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

    this.gameFlags = bombs;

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

  private startClock() {
    this.stopClock();

    this.interval = setInterval(() => {
      this.timeElapsed++;
    }, 1000)
  }

  private stopClock() {
    clearInterval(this.interval);
  }

  private gameOver(gameWon: boolean) {
    this.gameEnded = true;
    this.stopClock();
    this.showAll();
    this.gameWon(gameWon);
  }

  private gameWon(gameWon: boolean) {

    if (gameWon) {
      console.log("WINNER");
    } else {
      console.log("LOSER");
    }
  }

  private showAll() {
    for (const row of this.gameBoard) {
      for (const cell of row) {
        if (cell.status == CellStatus.UnTouched) {
          cell.status = CellStatus.Cleared;
        }
      }
    }
  }

  private clearNeighbors(cell: Cell) {
    if (cell == undefined) {
      return;
    }
    let clearable = true;
    for (const peer of NEIGHBORS) {

      let x = cell.cellRow + peer[0];
      let y = cell.cellColumn + peer[1];
      if ((x < 0 || x >= this.gameBoard.length) || (y < 0 || y >= this.gameBoard[0].length)) {
        return;
      }

      let neighborCell = this.gameBoard[x][y];

      if (((neighborCell.isBomb && neighborCell.status == CellStatus.Flagged) && neighborCell.isBomb)) {
        clearable = false;
        break;
      }
    }

    if (clearable) {
      for (const peer of NEIGHBORS) {

        let neighborCell = this.gameBoard[cell.cellRow + peer[0]][cell.cellColumn + peer[1]];
        if (neighborCell.status != CellStatus.Flagged) {
          neighborCell.status = CellStatus.Cleared;
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
      }
      this.placeRandomBombs(bombsLeft);
    }
  }

}
