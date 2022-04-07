import React, { useState, useEffect } from "react";

import useHistory from './hooks/useHistory'
import useCurrentBoard from './hooks/useCurrentBoard'
import useWinner from './hooks/useWinner'
import useBot from './hooks/useBot'
import useLocalStorage from './hooks/useLocalStorage'

import GameBoard from './components/GameBoard'
import GameMenu from './components/GameMenu'

import {START_BOARD, START_GAME, LS_BOARD, LS_IS_GAME_WITH_BOT} from './consts'

import './styles/root.sass'

const App = () => {
	const { history, updateHistory } = useHistory(LS_BOARD)
	const { currentBoard, updateCurrentBoard } = useCurrentBoard(history)
	const { winner, winnerStreak } = useWinner(history)
	const { moveOfBot, isGameWithBot, setGameMode } = useBot(history)

	const moveHandler = anotherMove => {
		if (currentBoard.board[anotherMove] || winner) return

		let newIsXNext = !currentBoard.isXNext
		let newBoard = currentBoard.board.map((item, index) => index === anotherMove ? currentBoard.isXNext ? 'X' : 'O' : item)

		updateHistory(prev => [...prev, {board: newBoard, isXNext: newIsXNext}])
	}

	const startNewGame = () => updateHistory([{board: START_BOARD, isXNext: true}])

	const moveTo = position => updateCurrentBoard(position)

	const moveToOut = position => updateCurrentBoard(history.length - 1)

	const gameModeHandler = () => {
		updateHistory(START_GAME)
		setGameMode()
	}

	useEffect(() => moveHandler(moveOfBot), [moveOfBot])

	return (
		<div className="game">
			<GameBoard
				currentBoard={currentBoard.board}
				moveHandler={moveHandler}
				winner={winner}
				winnerStreak={winnerStreak}
			/>

			<GameMenu
				currentBoard={currentBoard.board}
				currentPlayer={currentBoard.isXNext}
				winner={winner}
				startNewGame={startNewGame}
				history={history}
				moveTo={moveTo}
				moveToOut={moveToOut}
				isGameWithBot={isGameWithBot}
				gameModeHandler={gameModeHandler}
			/>
		</div>)
}

export default App