import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AppComponent } from '../../app.component';
import { COLS, BLOCK_SIZE, ROWS, KEY, COLORS, LEVELS, LINES_PER_LEVEL, POINTS } from './block-stacker-constants';
import { Piece, IPiece } from './block-stacker-piece';
import { BlockStackerService } from './block-stacker-service';

@Component({
  selector: 'app-block-stacker',
  templateUrl: './block-stacker.component.html',
  styleUrls: ['./block-stacker.component.scss']
})
export class BlockStackerComponent implements OnInit {

  @ViewChild('board', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  canvasContext!: CanvasRenderingContext2D;
  @ViewChild('next', { static: true })
  canvasNext!: ElementRef<HTMLCanvasElement>;
  canvasContextNext!: CanvasRenderingContext2D;

  level: number = 1;
  score: number = 0;
  lines: number = 0;
  totalLines: number = 0;
  highScore: number = 0;

  currentPiece!: Piece;
  nextPiece!: Piece;
  gameBoard!: number[][];
  gameStarted: boolean = false;
  paused: boolean = false;

  requestId: number = 0;
  time!: { start: number; elapsed: number; level: number };

  moves = {
    [KEY.LEFT]: (p: IPiece): IPiece => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p: IPiece): IPiece => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.UP]: (p: IPiece): IPiece => this.service.rotate(p)
  };

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.gameStarted) {
      var keyCode = event.keyCode;
      const keyTyped = keyCode as keyof typeof this.moves;

      if (keyCode === KEY.ESC) {
        this.pause();
      } else if (keyCode == KEY.SWITCH) {
        this.switchPiece();
      } else if (Object.hasOwn(this.moves, keyCode)) {
        event.preventDefault();
        let piece = this.moves[keyTyped](this.currentPiece);
        if (event.keyCode === KEY.SPACE) {
          while (this.service.valid(piece, this.gameBoard)) {
            this.currentPiece.move(piece);
            this.score += POINTS.HARD_DROP;
            piece = this.moves[KEY.DOWN](this.currentPiece);
          }
        } else if (this.service.valid(piece, this.gameBoard)) {
          this.currentPiece.move(piece);
          if (event.keyCode === KEY.DOWN) {
            this.score += POINTS.SOFT_DROP;
          }
        }
      }
    }
  }

  constructor(private service: BlockStackerService) {}

  ngOnInit() {
    this.initializeBoard();
    this.initializeNext();
    this.resetGame();
    this.highScore = 0;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      AppComponent.mainPage = false;
    });
  }

  initializeBoard() {
    var context = this.canvas.nativeElement.getContext('2d');
    if (context) {
      this.canvasContext = context;
      this.canvasContext.canvas.width = COLS * BLOCK_SIZE;
      this.canvasContext.canvas.height = ROWS * BLOCK_SIZE;
      this.canvasContext.scale(BLOCK_SIZE, BLOCK_SIZE);
    }
  }


  initializeNext() {
    var context = this.canvasNext.nativeElement.getContext('2d');
    if (context) {
      this.canvasContextNext = context;
      this.canvasContextNext.canvas.width = 4 * BLOCK_SIZE + 2;
      this.canvasContextNext.canvas.height = 4 * BLOCK_SIZE;
      this.canvasContextNext.scale(BLOCK_SIZE, BLOCK_SIZE);
    }
  }

  play() {
    this.gameStarted = true;
    this.resetGame();
    this.nextPiece = new Piece(this.canvasContext);
    this.currentPiece = new Piece(this.canvasContext);
    this.nextPiece.drawNext(this.canvasContextNext);
    this.time.start = performance.now();
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
    this.runGame();
  }

  gameOver() {
    this.gameStarted = false;
    cancelAnimationFrame(this.requestId);
    this.highScore = this.score > this.highScore ? this.score : this.highScore;

    const overlay = document.getElementById("endGameOverlay");
    if (overlay) {
      overlay.style.display = "block";
    }
    document.getElementsByTagName('body')[0].style.overflow = "hidden";
  }

  pause() {
    if (this.gameStarted) {
      if (this.paused) {
        this.runGame();

        var pauseButton = document.getElementById('pause-button');
        var mobilePauseButton = document.getElementById('mobile-pause-button');

        if (pauseButton) {
          pauseButton.innerHTML = "Pause";
        }

        if (mobilePauseButton) {
          mobilePauseButton.innerHTML = "Pause";
        }
      } else {
        cancelAnimationFrame(this.requestId);
        
        var pauseButton = document.getElementById('pause-button');
        var mobilePauseButton = document.getElementById('mobile-pause-button');

        if (pauseButton) {
          pauseButton.innerHTML = "Play";
        }

        if (mobilePauseButton) {
          mobilePauseButton.innerHTML = "Play";
        }
      }

      this.paused = !this.paused;
    }
  }

  closeOverlay() {
    var endGameDiv = document.getElementById("endGameOverlay");
    if (endGameDiv) {
      endGameDiv.style.display = "none";
    }
    
    document.getElementsByTagName('body')[0].style.overflowY = "scroll";
  }

  mobileButtonClick(keyCode: number) {
    if (this.gameStarted) {
      const keyTyped = keyCode as keyof typeof this.moves;
      if (keyCode == KEY.SWITCH) {
        this.switchPiece();
      } else if (Object.hasOwn(this.moves, keyCode)) {
        let piece = this.moves[keyTyped](this.currentPiece);
        if (keyCode === KEY.SPACE) {
          while (this.service.valid(piece, this.gameBoard)) {
            this.currentPiece.move(piece);
            this.score += POINTS.HARD_DROP;
            piece = this.moves[KEY.DOWN](this.currentPiece);
          }
        } else if (this.service.valid(piece, this.gameBoard)) {
          this.currentPiece.move(piece);
          if (keyCode === KEY.DOWN) {
            this.score += POINTS.SOFT_DROP;
          }
        }
      }
    }
  }

  private switchPiece() {
    let currentPiece = this.currentPiece;
    let nextPiece = this.nextPiece;
    nextPiece.x = currentPiece.x;
    nextPiece.y = currentPiece.y;
    let valid = this.service.valid(nextPiece, this.gameBoard);
    if (valid) {
      currentPiece = this.currentPiece;
      this.currentPiece = this.nextPiece;
      this.currentPiece.x = currentPiece.x;
      this.currentPiece.y = currentPiece.y;
      this.nextPiece = currentPiece;
      this.nextPiece.drawNext(this.canvasContextNext);
    }
  }

  private runGame(now = 0) {
    this.time.elapsed = now - this.time.start;
    if (this.time.elapsed > this.time.level) {
      this.time.start = now;
      if (!this.dropPiece()) {
        this.gameOver();
        return;
      }
    }
    this.draw();
    this.requestId = requestAnimationFrame(this.runGame.bind(this));
  }

  private dropPiece(): boolean {
    let piece = this.moves[KEY.DOWN](this.currentPiece);
    if (this.service.valid(piece, this.gameBoard)) {
      this.currentPiece.move(piece);
    } else {
      this.freezePiece();
      this.clearLines();
      if (this.currentPiece.y === 0) {
        return false;
      }
      this.nextPiece.x = 3;
      this.nextPiece.y = 0;
      this.currentPiece = this.nextPiece;
      this.nextPiece = new Piece(this.canvasContext);
      this.nextPiece.drawNext(this.canvasContextNext);
    }
    return true;
  }

  private freezePiece() {
    this.currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.gameBoard[y + this.currentPiece.y][x + this.currentPiece.x] = value;
        }
      });
    });
  }

  private clearLines() {
    let lines = 0;
    this.gameBoard.forEach((row, y) => {
      if (row.every(value => value !== 0)) {
        lines++;
        this.gameBoard.splice(y, 1);
        this.gameBoard.unshift(Array(COLS).fill(0));
      }
    });
    if (lines > 0) {
      this.score += this.service.getLinesClearedPoints(lines, this.level);
      this.lines += lines;
      this.totalLines += lines;
      if (this.lines >= LINES_PER_LEVEL) {
        this.level++;
        this.lines -= LINES_PER_LEVEL;
        this.time.level = LEVELS[this.level as keyof LEVELS];
      }
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
    this.totalLines = 0;
    this.level = 1;
    this.gameBoard = this.getEmptyGameBoard();
    this.time = { start: 0, elapsed: 0, level: LEVELS[this.level as keyof LEVELS]};
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
