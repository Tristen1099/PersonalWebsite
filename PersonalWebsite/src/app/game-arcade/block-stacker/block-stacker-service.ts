import { Injectable } from '@angular/core';
import { IPiece } from './block-stacker-piece';
import { COLS, ROWS } from './block-stacker-constants';

@Injectable({
    providedIn: 'root'
})

export class BlockStackerService {
    valid(p: IPiece, board: number[][]): boolean {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return (
                    this.isEmpty(value) ||
                    (this.insideWalls(x) &&
                        this.aboveFloor(y) &&
                        this.notOccupied(board, x, y))
                );
            });
        });
    }

    isEmpty(value: number): boolean {
        return value === 0;
    }

    insideWalls(x: number): boolean {
        return x >= 0 && x < COLS;
    }

    aboveFloor(y: number): boolean {
        return y <= ROWS;
    }

    notOccupied(board: number[][], x: number, y: number): boolean {
        return board[y] && board[y][x] === 0;
    }

    rotate(piece: IPiece): IPiece {
        let p: IPiece = JSON.parse(JSON.stringify(piece));
        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
            }
        }
        p.shape.forEach(row => row.reverse());
        return p;
    }

}