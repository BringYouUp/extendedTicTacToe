const SIZE_OF_BOARD = 15
const START_GAME = [ {board: new Array(SIZE_OF_BOARD ** 2).fill(null), isXNext: true } ]

const START_BOARD = new Array(SIZE_OF_BOARD ** 2).fill(null)

const LS_BOARD = 'GAME_BOARD'
const LS_IS_GAME_WITH_BOT = 'GAME_WITH_BOT'
const LS_IS_BOT_MOVE_NEXT = 'GAME_BOT_MOVE_NEXT'

export {SIZE_OF_BOARD, START_GAME, LS_BOARD, LS_IS_GAME_WITH_BOT, LS_IS_BOT_MOVE_NEXT, START_BOARD}