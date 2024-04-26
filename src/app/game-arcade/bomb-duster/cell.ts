export enum CellStatus {
  UnTouched = 0,
  Cleared = 1,
  Flagged = 2
}

export const NEIGHBORS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

export class Cell {

  status: CellStatus;
  cellRow: number = 0;
  cellColumn: number = 0;
  isBomb: boolean;
  neighborBombs: number;

  constructor() {
    this.status = CellStatus.UnTouched;
    this.isBomb = false;
    this.neighborBombs = 0;
  }
}
