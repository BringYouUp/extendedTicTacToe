type TPlayer = "X" | "O"
type TCellValue = null | TPlayer
type TGameBoard = Array<TCellValue>
type TBoardData = {
	board: TGameBoard,
	isXNext: Boolean
}
type TUseCurrentBoard = {
	currentBoard: TBoardData,
	updateCurrentBoard?: (position:number) => void
}

type THistory = Array<TBoardData>
type TUseHistory = {
	history: THistory
	updateHistory: (h:THistory) => void
}

type TUseWinner = {
	winner: TCellValue
	winnerStreak: Array<number>
}

type TUseBot = {
	moveOfBot: number,
	isGameWithBot: Boolean,
	updateActivityOfBot: () => void
	isBotMovesFirst: Boolean
	updateIsBotMovesFirst: () => void
	setPause: (isPause: Boolean) => void
}

export {
	TPlayer,
	TCellValue,
	TGameBoard,
	TBoardData,
	TUseCurrentBoard,
	THistory,
	TUseHistory,
	TUseWinner,
	TUseBot
}