export enum CellStatus {
  UnTouched = 0,
  Cleared = 1,
  Flagged = 2
}

export const NEIGHBORS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

export class Cell {

  status: CellStatus;
  cellRow: number;
  cellColumn: number;
  isBomb: boolean;
  neighborBombs: number;

  constructor() {
    this.status = CellStatus.UnTouched;
    this.isBomb = false;
    this.neighborBombs = 0;
  }

  flagCell() {
    if (this.status == CellStatus.Cleared) {
      return;
    }
    if (this.status == CellStatus.UnTouched) {
      this.status = CellStatus.Flagged;
    } else if (this.status == CellStatus.Flagged) {
      this.status = CellStatus.UnTouched;
    }
  }
}
