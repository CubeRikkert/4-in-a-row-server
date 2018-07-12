"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
let IsBoard = class IsBoard {
    validate(board) {
        const symbols = ['x', 'o', null];
        return board.length === 7 &&
            board.every(row => row.length === 7 &&
                row.every(symbol => symbols.includes(symbol)));
    }
};
IsBoard = __decorate([
    class_validator_1.ValidatorConstraint()
], IsBoard);
exports.IsBoard = IsBoard;
exports.isValidTransition = (playerSymbol, from, to) => {
    const changes = from
        .map((row, rowIndex) => row.map((symbol, columnIndex) => ({
        from: symbol,
        to: to[rowIndex][columnIndex]
    })))
        .reduce((a, b) => a.concat(b))
        .filter(change => change.from !== change.to);
    return changes.length === 1 &&
        changes[0].to === playerSymbol &&
        changes[0].from === null;
};
exports.calculateWinner = (board) => board
    .concat([0, 1, 2, 3, 4, 5, 6].map(n => board.map(row => row[n])))
    .concat([
    [0, 1, 2].map(n => board[n][n + 4]),
    [0, 1, 2, 3].map(n => board[n][n + 3]),
    [0, 1, 2, 3, 4].map(n => board[n][n + 2]),
    [0, 1, 2, 3, 4, 5].map(n => board[n][n + 1]),
    [0, 1, 2, 3, 4, 5, 6].map(n => board[n][n]),
    [0, 1, 2, 3, 4, 5].map(n => board[n + 1][n]),
    [0, 1, 2, 3, 4].map(n => board[n + 2][n]),
    [0, 1, 2, 3].map(n => board[n + 3][n]),
    [0, 1, 2].map(n => board[n + 4][n]),
    [0, 1, 2, 3].map(n => board[n][3 - n]),
    [0, 1, 2, 3, 4].map(n => board[n][4 - n]),
    [0, 1, 2, 3, 4, 5].map(n => board[n][5 - n]),
    [0, 1, 2, 3, 4, 5, 6].map(n => board[n][6 - n]),
    [1, 2, 3, 4, 5, 6].map(n => board[n][7 - n]),
    [2, 3, 4, 5, 6].map(n => board[n][8 - n]),
    [3, 4, 5, 6].map(n => board[n][9 - n]),
])
    .filter(row => {
    if (row.join('').includes('xxxx'))
        return row;
    else if (row.join('').includes('oooo'))
        return row;
})
    .map(row => {
    if (row.join('').includes('xxxx'))
        return row[3] = 'x';
    else if (row.join('').includes('oooo'))
        return row[3] = 'o';
})[0] || null;
exports.finished = (board) => board
    .reduce((a, b) => a.concat(b))
    .every(symbol => symbol !== null);
//# sourceMappingURL=logic.js.map