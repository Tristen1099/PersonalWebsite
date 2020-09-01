import { Component, OnInit } from '@angular/core';
import { Tile } from './tile';
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

  constructor() { }

  ngOnInit(): void {
    this.tiles = [];

    let size = 3;
    let totalTilesCreated = 0;
    var percentage = 100 / (size - 1);
    var image = this.images[Math.floor(Math.random() * this.images.length)];

    for (var i: number = 0; i < size; i++) {
      this.tiles[i] = [];
      for (var j: number = 0; j < size; j++) {
        let currentTile = new Tile();

        if (!(i == size - 1 && j == size - 1)) {
          let xpos = (percentage * (totalTilesCreated % size)) + '%';
          let ypos = (percentage * Math.floor(totalTilesCreated / size)) + '%';
          currentTile.backgroundImage = 'url(' + image.src + ')';
          currentTile.backgroundSize = (size * 100) + '%';
          currentTile.backgroundPosition = xpos + ' ' + ypos;
        }
        currentTile.width = 400 / size;
        currentTile.height = 400 / size;
        currentTile.positionNumber = totalTilesCreated + 1;

        this.tiles[i][j] = currentTile;

        totalTilesCreated++;
      }
    }

    console.log(this.tiles);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      AppComponent.mainPage = false;
    });
  }

  tileClick(row: number, col: number) {
    console.log(row + ' ' + col)
  }

}
