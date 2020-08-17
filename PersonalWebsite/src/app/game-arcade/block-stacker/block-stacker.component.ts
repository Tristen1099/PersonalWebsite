import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { COLS, BLOCK_SIZE, ROWS, KEY, COLORS, LEVELS } from './block-stacker-constants';
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
  highScore: number;

  currentPiece: Piece;
  gameBoard: number[][];
  gameStarted: boolean;
  paused: boolean;

  requestId: number;
  time: { start: number; elapsed: number; level: number };

  moves = {
    [KEY.LEFT]: (p: IPiece): IPiece => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p: IPiece): IPiece => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.UP]: (p: IPiece): IPiece => this.service.rotate(p)
  };

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.moves[event.keyCode]) {
      event.preventDefault();
      let piece = this.moves[event.keyCode](this.currentPiece);
      if (event.keyCode === KEY.SPACE) {
        while (this.service.valid(piece, this.gameBoard)) {
          this.currentPiece.move(piece);
          piece = this.moves[KEY.DOWN](this.currentPiece);
        }
      } else if (this.service.valid(piece, this.gameBoard)) {
        this.currentPiece.move(piece);
      }
    }
  }

  constructor(private service: BlockStackerService) { }

  ngOnInit() {
    this.initializeBoard();
    this.resetGame();
    this.highScore = 0;
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
    this.gameStarted = true;
    this.resetGame();
    this.currentPiece = new Piece(this.canvasContext);
    this.time.start = performance.now();
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
    this.runGame();
  }

  pause() {
    if (this.gameStarted) {
      if (this.paused) {
        this.runGame();
        document.getElementById('pause-button').innerHTML = "Pause";
      } else {
        cancelAnimationFrame(this.requestId);
        document.getElementById('pause-button').innerHTML = "Play";
      }

      this.paused = !this.paused;
    }
  }

  private runGame(now = 0) {
    this.time.elapsed = now - this.time.start;
    if (this.time.elapsed > this.time.level) {
      this.time.start = now;
      this.dropPiece();
    }
    this.draw();
    this.requestId = requestAnimationFrame(this.runGame.bind(this));
  }

  private dropPiece() {
    let piece = this.moves[KEY.DOWN](this.currentPiece);
    if (this.service.valid(piece, this.gameBoard)) {
      this.currentPiece.move(piece);
    }
  }

  private draw() {
    this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
    this.currentPiece.draw();
    this.drawBoard();
  }

  private drawBoard() {
    this.gameBoard.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.canvasContext.fillStyle = COLORS[value];
          this.canvasContext.fillRect(x, y, 1, 1);
        }
      });
    });
    this.drawGridOnCanvas();
  }

  private resetGame() {
    this.paused = false;
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.gameBoard = this.getEmptyGameBoard();
    this.time = { start: 0, elapsed: 0, level: LEVELS[this.level] };
    this.drawGridOnCanvas();
  }

  private drawGridOnCanvas() {
    for (let index = 1; index < COLS; index++) {
      this.canvasContext.fillStyle = 'black';
      this.canvasContext.fillRect(index, 0, .025, this.canvasContext.canvas.height);
    }

    for (let index = 1; index < ROWS; index++) {
      this.canvasContext.fillStyle = 'black';
      this.canvasContext.fillRect(0, index, this.canvasContext.canvas.width, .025);
    }
  }

  private getEmptyGameBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

}
