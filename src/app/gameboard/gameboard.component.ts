import { Component, OnInit } from '@angular/core';

import { SudokuBoard } from '../shared/sudoku-board';
import { Cell } from '../shared/cell';
@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  board: SudokuBoard;
  activeNumber: number;

  isDone = false;
  tempo: String = 'Tempo:';
  tentativa: number = 0;

  constructor() { }

  ngOnInit() {
    this.board = new SudokuBoard();
  }

  guloso(){
    const start = performance.now();

    this.tentativa = 0;
    this.board.isClean();
    while (this.board.isUndefined()) {
      this.tentativa++;
      this.board.initialize();
    }

    // Fim da medicao de tempo
    const end = performance.now();
    const elapsedMs = end - start;

    const totalSeconds = Math.floor(elapsedMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(elapsedMs % 1000);

    this.tempo = `Tempo: ${this.pad(minutes)}:${this.pad(seconds)}:${this.padMilliseconds(milliseconds)}`

  }

   pad(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }

   padMilliseconds(n: number): string {
    if (n < 10) return '00' + n;
    if (n < 100) return '0' + n;
    return '' + n;
  }


  reload() {
    this.board.initialize();
  }

  setActive(button, number: number): void {
    if (this.activeNumber == number) {
      this.activeNumber = undefined;
    } else {
      this.activeNumber = number;
    }
  }

  onCellSelect(cell: Cell): void {
    if (this.activeNumber == -1 || cell.guess == this.activeNumber) {
      cell.makeGuess(undefined); 
    } else {
      cell.makeGuess(this.activeNumber);
    }

    if (document.getElementsByClassName('incomplete').length == 0) {
      this.isDone = true;
    }
  }

}