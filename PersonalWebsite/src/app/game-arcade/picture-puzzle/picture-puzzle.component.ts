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
    '../../assets/Arcade/PicturePuzzleAssets/River.JPG',
    '../../assets/Arcade/PicturePuzzleAssets/Dog.JPG',
    '../../assets/Arcade/PicturePuzzleAssets/Ocean.JPG'
  ];
  tiles: Tile[][];
  gridSize: number;
  shuffleAmount: number;
  displayNumbers: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.gridSize = 3;
    this.shuffleAmount = 35;
    this.displayNumbers = true;
    this.imageSrc = this.images[Math.floor(Math.random() * this.images.length)];
    this.setupPictureGrid();

    const that = this;

    $('#_file').change(function () {
      var file = this.files[0];
      var reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
      }
      reader.onload = function () {
        that.imageSrc = reader.result;
        $('#userImage').attr("src", reader.result);
        that.setupPictureGrid();
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      AppComponent.mainPage = false;
    });
  }

  setupPictureGrid() {

    this.tiles = [];
    let totalTilesCreated = 0;
    var percentage = 100 / (this.gridSize - 1);

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
        currentTile.width = 400 / this.gridSize;
        currentTile.height = 400 / this.gridSize;
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
    this.imageSrc = source;
    this.setupPictureGrid();
  }

  userImageClick(source: any) {
    this.imageSrc = source.target.src;
    this.setupPictureGrid();
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
    this.moveTile(row, col);
  }

  shuffle() {
    this.shuffleTiles(this.shuffleAmount);
  }

  private moveTile(row: number, col: number): boolean {
    let moved = false
    for (const peer of NEIGHBORS) {
      if (!((row + peer[0] < 0 || row + peer[0] >= this.gridSize) || (col + peer[1] < 0 || col + peer[1] >= this.gridSize))) {
        let neighbor = this.tiles[row + peer[0]][col + peer[1]];
        if (neighbor.backgroundImage == null) {
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
    if (shuffleAmount > 0) {
      let y = Math.floor(Math.random() * this.tiles.length);
      let x = Math.floor(Math.random() * this.tiles[y].length);

      if (this.moveTile(y, x)) {
        shuffleAmount -= 1;
        setTimeout(function () {
          that.shuffleTiles(shuffleAmount);
        }, 50);
      } else {
        this.shuffleTiles(shuffleAmount);
      }

    }
  }
}