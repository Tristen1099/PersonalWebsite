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

  images = [
    { src: '../../assets/Arcade/test.JPG', title: 'Test1' }
  ];

  tiles: Tile[][];
  gridSize: number;
  displayNumbers: boolean;

  constructor() { }

  ngOnInit(): void {
    this.gridSize = 3;
    this.displayNumbers = true;
    this.setupPictureGrid();
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
    var image = this.images[Math.floor(Math.random() * this.images.length)];

    for (var i: number = 0; i < this.gridSize; i++) {
      this.tiles[i] = [];
      for (var j: number = 0; j < this.gridSize; j++) {
        let currentTile = new Tile();

        if (!(i == this.gridSize - 1 && j == this.gridSize - 1)) {
          let xpos = (percentage * (totalTilesCreated % this.gridSize)) + '%';
          let ypos = (percentage * Math.floor(totalTilesCreated / this.gridSize)) + '%';
          currentTile.backgroundImage = 'url(' + image.src + ')';
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

  difficultyChanged(event: any) {
    let difficulty = event.target.value;

    switch (difficulty) {
      case "easy":
        this.gridSize = 3;
        this.setupPictureGrid();
        break;
      case "medium":
        this.gridSize = 4;
        this.setupPictureGrid();
        break;
      case "hard":
        this.gridSize = 5;
        this.setupPictureGrid();
        break;
    }

  }

  tileClick(row: number, col: number) {

    this.moveTile(row, col);



  }

  private moveTile(row: number, col: number) {
    for (const peer of NEIGHBORS) {
      if (!((row + peer[0] < 0 || row + peer[0] >= this.gridSize) || (col + peer[1] < 0 || col + peer[1] >= this.gridSize))) {
        let neighbor = this.tiles[row + peer[0]][col + peer[1]];
        if (neighbor.backgroundImage == null) {
          let currentTile = this.tiles[row][col];
          this.tiles[row][col] = neighbor;
          this.tiles[row + peer[0]][col + peer[1]] = currentTile;
        }
      }
    }
  }

}
