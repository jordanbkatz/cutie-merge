import std from '../libs/std';

class Game {
    readonly size: number = 4;
    cells: number[][];
    constructor(cells?: number[][]) {
        if (cells) {
            this.cells = cells;
        }
        else {
            this.cells = (new Array(this.size)).fill(null).map(() => (new Array(this.size)).fill(-1));
            this.generate();
        }
    }
    generate() {
        let empty = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.cells[i][j] == -1) {
                    empty.push({ i, j });
                }
            }
        }
        if (empty.length > 0) {
            const cell = empty[std.random(0, empty.length)];
            this.cells[cell.i][cell.j] = 0;
        }
    }
    move(direction: number) {
        this.cells = this.rotate(direction);
        for (let i = 0; i < this.size; i++) {
            this.cells = this.shift(i);
            this.cells = this.merge(i);
            this.cells = this.shift(i);
        }
        this.cells = this.rotate(4 - direction);
        this.generate();
    }
    shift(row: number, cells: number[][] = this.cells) {
        cells = std.cloneMatrix(cells);
        for (let i = 0; i < this.size; i++) {
            if (cells[row][i] == -1) {
                for (let j = 1; j < this.size - i; j++) {
                    if (cells[row][i + j] != -1) {
                        cells[row][i] = cells[row][i + j];
                        cells[row][i + j] = -1;
                        break;
                    }
                }
            }
        }
        return cells;
    }
    merge(row: number, cells: number[][] = this.cells) {
        cells = std.cloneMatrix(cells);
        for (let i = 0; i < this.size; i++) {
            if (cells[row][i] == cells[row][i + 1] && cells[row][i] != -1) {
                cells[row][i]++;
                cells[row][i + 1] = -1;
            }
        }
        return cells;
    }
    rotate(n: number, cells: number[][] = this.cells) {
        cells = std.cloneMatrix(cells);
        for (let i = 0; i < n; i++) {
            cells = cells[0].map((val, index) => cells.map(row => row[index]).reverse());
        }
        return cells;
    }
    score() {
        let score = 0;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                score += Math.floor(Math.pow(2, this.cells[i][j]));
            }
        }
        return score;
    }
    check() {
        for (let i = 0; i < 4; i++) {
            let cells = this.rotate(i);
            for (let j = 0; j < this.size; j++) {
                cells = this.shift(j, cells);
                for (let k = 0; k < this.size - 1; k++) {
                    if (cells[j][k] == -1 || cells[j][k] == cells[j][k + 1]) {
                        return true;
                    }
                }
                if (cells[j][this.size - 1] == -1) {
                    return true;
                }
            }
        }
        return false;
    }
}

export default Game;