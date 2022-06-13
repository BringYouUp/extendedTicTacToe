const SIZE_OF_BOARD = 15
const START_GAME = [ {board: new Array(SIZE_OF_BOARD ** 2).fill(null), isXNext: true } ]
const WIN_STREAK = 5
const HALF_OF_WIN_STREAK = Math.trunc(WIN_STREAK / 2)

import IMG_NEW_GAME from './img/start.png'
import IMG_BOT from './img/bot.png'
import IMG_BOT_ACTIVE from './img/bot-active.png'
import IMG_BOT_FIRST from './img/bot-first.png'
import IMG_BOT_NOT_FIRST from './img/bot-not-first.png'
import IMG_HISTORY from './img/history.png'
import IMG_HELP from './img/help.png'

export { START_GAME, SIZE_OF_BOARD, WIN_STREAK, HALF_OF_WIN_STREAK, IMG_NEW_GAME, IMG_BOT, IMG_BOT_ACTIVE, IMG_BOT_FIRST, IMG_BOT_NOT_FIRST, IMG_HISTORY, IMG_HELP }