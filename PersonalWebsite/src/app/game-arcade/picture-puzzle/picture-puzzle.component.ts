import { Component, OnInit } from '@angular/core';
import { Tile, NEIGHBORS } from './tile';
import * as $ from 'jquery';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-picture-puzzle',
  templateUrl: './picture-puzzle.component.html',
  styleUrls: ['./picture-puzzle.component.scss']
})
export class PicturePuzzleComponent implements OnInit {

  imageSrc: any;
  images = [
    '../../assets/Arcade/PicturePuzzleAssets/Fireworks.JPG',
    '../../assets/Arcade/PicturePuzzleAssets/Dog.JPG',
    '../../assets/Arcade/PicturePuzzleAssets/Ocean.JPG',
    '../../assets/Arcade/PicturePuzzleAssets/Earth.gif',
    '../../assets/Arcade/PicturePuzzleAssets/Car.JPG',
    '../../assets/Arcade/PicturePuzzleAssets/Fish.JPG'
  ];

  tiles: Tile[][];
  gridSize: number;
  shuffleAmount: number;
  displayNumbers: boolean;
  windowSize: number;
  imageSize: number;
  shuffling: boolean;
  previousMovedTile: number;

  gameStarted: boolean;
  gameOver: boolean;
  timeElapsed: number;
  interval;

  constructor() {
  }

  ngOnInit(): void {
    this.gameStarted = false;
    this.gameOver = false;
    this.gridSize = 3;
    this.shuffleAmount = 75;
    this.displayNumbers = true;
    this.imageSrc = this.images[Math.floor(Math.random() * this.images.length)];
    this.windowSize = window.innerWidth;
    this.getImageSize();
    this.setupPictureGrid();

    const that = this;

    $('#_file').change(function (e) {

      let img = new Image;
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      if (e.target.files.length == 0) {
        return;
      }
      img.src = URL.createObjectURL(e.target.files[0]);
      img.onload = function () {
        canvas.width = 800;
        canvas.height = 800;
        ctx.drawImage(img, 0, 0, 800, 800);
        that.imageSrc = canvas.toDataURL("image/jpeg", 0.5);
        $('#userImage').attr("src", that.imageSrc);
        that.setupPictureGrid();
      }
    });

    window.onresize = function (event) {
      that.windowSize = window.innerWidth;
      if (!that.gameStarted) {
        that.getImageSize();
        that.setupPictureGrid();
      }
    };
  }

  ngAfterViewInit() {
    setTimeout(() => {
      AppComponent.mainPage = false;
    });
  }

  setupPictureGrid() {

    this.stopClock();
    this.gameOver = false;
    this.gameStarted = false;
    this.previousMovedTile = null;
    let numberSwitch = document.getElementById("numberSwitch");
    if (numberSwitch != null) {
      this.displayNumbers = (numberSwitch as HTMLInputElement).checked;
    }
    this.timeElapsed = 0;
    this.tiles = [];
    let totalTilesCreated = 0;
    const percentage = 100 / (this.gridSize - 1);

    for (var i: number = 0; i < this.gridSize; i++) {
      this.tiles[i] = [];
      for (var j: number = 0; j < this.gridSize; j++) {
        let currentTile = new Tile();

        if (!(i == this.gridSize - 1 && j == this.gridSize - 1)) {
          let xpos = (percentage * (totalTilesCreated % this.gridSize)) + '%';
          let ypos = (percentage * Math.floor(totalTilesCreated / this.gridSize)) + '%';
          currentTile.backgroundImage = 'url(' + this.imageSrc + ')';
          currentTile.backgroundSize = (this.gridSize * 100) + '%';
          currentTile.backgroundPosition = xpos + ' ' + ypos;
        }
        currentTile.width = this.imageSize / this.gridSize;
        currentTile.height = this.imageSize / this.gridSize;
        currentTile.positionNumber = totalTilesCreated + 1;

        this.tiles[i][j] = currentTile;

        totalTilesCreated++;
      }
    }
  }

  displayNumbersChanged(event: any) {
    this.displayNumbers = event.target.checked;
  }

  sampleImageClick(source: string) {
    if (!this.shuffling) {
      this.imageSrc = source;
      this.setupPictureGrid();
    }
  }

  userImageClick(source: any) {
    if (!this.shuffling) {
      this.imageSrc = source.target.src;
      this.setupPictureGrid();
    }
  }

  difficultyChanged(event: any) {
    let difficulty = event.target.value;

    switch (difficulty) {
      case "easy":
        this.gridSize = 3;
        this.shuffleAmount = 75;
        this.setupPictureGrid();
        break;
      case "medium":
        this.gridSize = 4;
        this.shuffleAmount = 100;
        this.setupPictureGrid();
        break;
      case "hard":
        this.gridSize = 5;
        this.shuffleAmount = 125;
        this.setupPictureGrid();
        break;
    }

  }

  tileClick(row: number, col: number) {
    if (this.gameStarted) {
      this.startClock();
      this.moveTile(row, col);
      if (this.checkIfGameOver()) {
        this.displayGameWon();
      }
    }
  }

  shuffle() {
    this.gameStarted = true;
    this.shuffleTiles(this.shuffleAmount);
  }

  private displayGameWon() {
    this.gameOver = true;
    this.displayNumbers = false;
    this.stopClock();
    let lastTile = this.tiles[this.gridSize - 1][this.gridSize - 1];
    let tileNumber = (this.gridSize * this.gridSize) - 1;
    const percentage = 100 / (this.gridSize - 1);
    let xpos = (percentage * (tileNumber % this.gridSize)) + '%';
    let ypos = (percentage * Math.floor(tileNumber / this.gridSize)) + '%';
    lastTile.backgroundImage = 'url(' + this.imageSrc + ')';
    lastTile.backgroundSize = (this.gridSize * 100) + '%';
    lastTile.backgroundPosition = xpos + ' ' + ypos;
  }

  private checkIfGameOver(): boolean {
    let position = 1;
    let hasWon = true;
    for (var i: number = 0; i < this.gridSize; i++) {
      for (var j: number = 0; j < this.gridSize; j++) {
        if (this.tiles[i][j].positionNumber != position) {
          return false;
        } else {
          position++;
        }
      }
    }
    return hasWon;
  }

  private getImageSize() {

    if (this.windowSize > 1000) {
      this.imageSize = 400;
    } else if (this.windowSize <= 1000 && this.windowSize > 800) {
      this.imageSize = 300;
    } else {
      this.imageSize = 250;
    }
  }

  private startClock() {
    this.stopClock();

    this.interval = setInterval(() => {
      this.timeElapsed += .1;
    }, 100)
  }

  private stopClock() {
    clearInterval(this.interval);
  }

  private moveTile(row: number, col: number): boolean {
    let moved = false
    for (const peer of NEIGHBORS) {
      if (!((row + peer[0] < 0 || row + peer[0] >= this.gridSize) || (col + peer[1] < 0 || col + peer[1] >= this.gridSize))) {
        let neighbor = this.tiles[row + peer[0]][col + peer[1]];
        if (neighbor.backgroundImage == null) {
          this.previousMovedTile = this.tiles[row][col].positionNumber;
          let currentTile = this.tiles[row][col];
          this.tiles[row][col] = neighbor;
          this.tiles[row + peer[0]][col + peer[1]] = currentTile;
          return true;
        }
      }
    }
    return moved;
  }

  private shuffleTiles(shuffleAmount: number) {
    const that = this;
    this.shuffling = true;
    if (shuffleAmount > 0) {
      let y = Math.floor(Math.random() * this.tiles.length);
      let x = Math.floor(Math.random() * this.tiles[y].length);

      if (this.tiles[y][x].positionNumber == this.previousMovedTile) {
        this.shuffleTiles(shuffleAmount);
      } else if (this.moveTile(y, x)) {
        shuffleAmount -= 1;
        setTimeout(function () {
          that.shuffleTiles(shuffleAmount);
        }, 50);
      } else {
        this.shuffleTiles(shuffleAmount);
      }

    }

    if (shuffleAmount == 0) {
      this.shuffling = false;
    }
  }
}
