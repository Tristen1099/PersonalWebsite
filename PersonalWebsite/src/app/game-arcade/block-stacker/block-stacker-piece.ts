export interface IPiece {
    x: number;
    y: number;
    color: string;
    shape: number[][];
}

export class Piece implements IPiece {
    x: number;
    y: number;
    color: string;
    shape: number[][];

    constructor(private canvasContext: CanvasRenderingContext2D) {
        this.spawn();
    }

    spawn() {
        this.color = 'green';
        this.shape = [[0, 1, 1], [1, 1, 0], [0, 0, 0]];

        this.x = 3;
        this.y = 1;
    }

    draw() {
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.canvasContext.fillStyle = this.color;
                    const currentX = this.x + x;
                    const currentY = this.y + y;
                    this.canvasContext.fillRect(currentX, currentY, 1, 1);
                }
            });
        });
    }

    move(piece: IPiece) {
        this.x = piece.x;
        this.y = piece.y;
        this.shape = piece.shape;
    }
}