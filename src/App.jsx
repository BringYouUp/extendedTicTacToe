import React, { useState, useEffect } from "react";

import useHistory from './hooks/useHistory'
import useCurrentBoard from './hooks/useCurrentBoard'
import useWinner from './hooks/useWinner'
import useBot from './hooks/useBot'

import Header from './components/Header'
import GameBoard from './components/GameBoard'

import { START_GAME } from './consts'

import './styles/root.sass'

const App = () => {
	const { history, updateHistory } = useHistory()
	const { currentBoard, updateCurrentBoard } = useCurrentBoard(history)
	const { winner, winnerStreak } = useWinner(history)
	const { moveOfBot, isGameWithBot, updateActivityOfBot, startNewGameWithBot, isBotMovesFirst, setIsBotMovesFirst, makeMove, setIsBotMoveNext} = useBot(history)

	const moveHandler = anotherMove => {
		if (currentBoard.board[anotherMove] || winner) return

		let newIsXNext = !currentBoard.isXNext
		let newBoard = currentBoard.board.map((item, index) => index === anotherMove ? currentBoard.isXNext ? 'X' : 'O' : item)

		updateHistory(prev => [...prev, {board: newBoard, isXNext: newIsXNext}])
	}

	const startNewGame = () => {
		startNewGameWithBot(isBotMovesFirst)
		updateHistory(START_GAME)
	}

	const moveTo = position => updateCurrentBoard(position)
	const moveToOut = position => updateCurrentBoard(history.length - 1)

	useEffect(() => startNewGame(), [isGameWithBot, isBotMovesFirst])

	useEffect(() => !Number.isNaN(moveOfBot) ? moveHandler(moveOfBot) : null, [moveOfBot])

	return (
		<div className="game">
			<Header
				isBotMovesFirst={isBotMovesFirst}
				setIsBotMovesFirst={setIsBotMovesFirst}
				updateActivityOfBot={updateActivityOfBot}
				isGameWithBot={isGameWithBot}
				winner={winner}
				currentBoard={currentBoard.board}
				currentPlayer={currentBoard.isXNext}
				startNewGame={startNewGame}
				history={history}
				moveTo={moveTo}
				moveToOut={moveToOut}
			/>
		
			<GameBoard
				currentBoard={currentBoard.board}
				moveHandler={moveHandler}
				winner={winner}
				winnerStreak={winnerStreak}
			/>
		</div>)
}

export default App