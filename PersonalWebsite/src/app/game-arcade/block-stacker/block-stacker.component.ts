import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { COLS, BLOCK_SIZE, ROWS } from './block-stacker-constants';
import { Piece, IPiece } from './block-stacker-piece';

@Component({
  selector: 'app-block-stacker',
  templateUrl: './block-stacker.component.html',
  styleUrls: ['./block-stacker.component.scss']
})
export class BlockStackerComponent implements OnInit {

  @ViewChild('board', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  canvasContext: CanvasRenderingContext2D;

  level: number;
  score: number;
  lines: number;

  currentPiece: Piece;
  gameBoard: number[][];


  constructor() { }

  ngOnInit() {
    this.initializeBoard();
    
    this.resetGame();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      AppComponent.mainPage = false;
    });
  }

  initializeBoard() {
    this.canvasContext = this.canvas.nativeElement.getContext('2d');
    this.canvasContext.canvas.width = COLS * BLOCK_SIZE;
    this.canvasContext.canvas.height = ROWS * BLOCK_SIZE;
    this.canvasContext.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  play() {
    this.resetGame();
    this.currentPiece = new Piece(this.canvasContext);
    this.currentPiece.draw();
  }

  private resetGame() {
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.gameBoard = this.getEmptyGameBoard();
  }

  private getEmptyGameBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

}
