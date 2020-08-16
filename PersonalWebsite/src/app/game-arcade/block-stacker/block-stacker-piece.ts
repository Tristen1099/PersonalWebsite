import { COLORS, SHAPES } from './block-stacker-constants';

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
        const typeId = this.randomizePieceType(COLORS.length - 1);
        this.color = COLORS[typeId];
        this.shape = SHAPES[typeId];

        this.x = 3;
        this.y = 0;
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

    private randomizePieceType(types: number): number {
        return Math.floor(Math.random() * types + 1);
    }
}