import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol, Row } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {


  // checks if the board is looking like it's supposed to
  validate(board: Board) {
    const symbols = [ 'x', 'o', null ]
    return board.length === 7 &&
      board.every(row =>
        row.length === 7 &&
        row.every(symbol => symbols.includes(symbol))
      )
  }
}

// checks if the transition from the old to new board is valid and is following the rules of the game
export const isValidTransition = (playerSymbol: Symbol, from: Board, to: Board) => {
  const changes = from
    .map(
      (row, rowIndex) => row.map((symbol, columnIndex) => ({
        from: symbol, 
        to: to[rowIndex][columnIndex]
      }))
    )
    .reduce((a,b) => a.concat(b))
    .filter(change => change.from !== change.to)

  return changes.length === 1 && 
    changes[0].to === playerSymbol && 
    changes[0].from === null
}

export const calculateWinner = (board: Board): Symbol | null =>
  board
    .concat(
      // vertical winner
      [0, 1, 2, 3, 4, 5, 6].map(n => board.map(row => row[n])) as Row[]
    )
    .concat(
      [
        // diagonal winner ltr
        // maps the board to tilt 45 degrees clockwise
        [0, 1, 2].map(n => board[n][n+4]),
        [0, 1, 2, 3].map(n => board[n][n+3]),
        [0, 1, 2, 3, 4].map(n => board[n][n+2]),
        [0, 1, 2, 3, 4, 5].map(n => board[n][n+1]),
        [0, 1, 2, 3, 4, 5, 6].map(n => board[n][n]),   
        [0, 1, 2, 3, 4, 5].map(n => board[n+1][n]),
        [0, 1, 2, 3, 4].map(n => board[n+2][n]),
        [0, 1, 2, 3].map(n => board[n+3][n]),
        [0, 1, 2].map(n => board[n+4][n]),
        // diagonal winner rtl
        // maps the board to tilt 45 degrees counter clockwise
        [0, 1, 2, 3].map(n => board[n][3-n]),
        [0, 1, 2, 3, 4].map(n => board[n][4-n]),
        [0, 1, 2, 3, 4, 5].map(n => board[n][5-n]),
        [0, 1, 2, 3, 4, 5, 6].map(n => board[n][6-n]),
        [1, 2, 3, 4, 5, 6].map(n => board[n][7-n]),
        [2, 3, 4, 5, 6].map(n => board[n][8-n]),
        [3, 4, 5, 6].map(n => board[n][9-n]),
        
      ] as Row[]
    )
    .filter(row => {if (row.join('').includes('xxxx')) return row
              else if (row.join('').includes('oooo')) return row})
    // filters each row of to check if there is four in a row somewhere, 
    // if so it returns the winning row
    .map(row => {if (row.join('').includes('xxxx')) return row[3] = 'x'
    else if (row.join('').includes('oooo')) return row[3] = 'o'}) [0] || null
    // returns the winner if there is one, otherwise returns that there is no winner

export const finished = (board: Board): boolean =>
  board
    .reduce((a,b) => a.concat(b) as Row)
    .every(symbol => symbol !== null)
    // check if the board is full of symbols and therefore finished
