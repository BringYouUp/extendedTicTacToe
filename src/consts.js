const SIZE_OF_BOARD = 15
const START_GAME = [ {board: new Array(SIZE_OF_BOARD ** 2).fill(null), isXNext: true } ]
const WIN_STREAK = 5
const HALF_OF_WIN_STREAK = Math.trunc(WIN_STREAK / 2)

export { START_GAME, SIZE_OF_BOARD, WIN_STREAK, HALF_OF_WIN_STREAK }