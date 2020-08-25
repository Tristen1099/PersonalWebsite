import { Component, OnInit } from '@angular/core';

enum CellStatus {
  UnTouched = 0,
  Cleared = 1,
  Flagged = 2
}

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

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

  ngOnInit(): void {
  }



}
