import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { COLS, BLOCK_SIZE, ROWS, KEY } from './block-stacker-constants';
import { Piece, IPiece } from './block-stacker-piece';
import { BlockStackerService } from './block-stacker-service';

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

  moves = {
    [KEY.LEFT]: (p: IPiece): IPiece => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p: IPiece): IPiece => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.UP]: (p: IPiece): IPiece => this.service.rotate(p)
  };

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {

    event.preventDefault();
    let piece = this.moves[event.keyCode](this.currentPiece);
    if (event.keyCode === KEY.SPACE) {
      while (this.service.valid(piece, this.gameBoard)) {
        this.currentPiece.move(piece);
        piece = this.moves[KEY.DOWN](this.currentPiece);
      }
    }
    if (this.moves[event.keyCode]) {

      if (this.service.valid(piece, this.gameBoard)) {
        this.currentPiece.move(piece);
      }
      this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
      
      this.currentPiece.draw();
    }
  }

  constructor(private service: BlockStackerService) { }

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
