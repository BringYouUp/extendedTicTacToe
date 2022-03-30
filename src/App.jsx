import React, { useState, useEffect } from "react";

import useHistory from './hooks/useHistory'
import useCurrentBoard from './hooks/useCurrentBoard'
import useWinner from './hooks/useWinner'
import useBot from './hooks/useBot'

import GameBoard from './components/GameBoard'
import GameMenu from './components/GameMenu'

import {START_GAME} from './consts'

import './styles/root.sass'

const App = () => {
	const { history, updateHistory } = useHistory('EXTENDED_TIC_TAC_TOE')
	const { currentBoard, updateCurrentBoard } = useCurrentBoard(history)
	const { winner, winnerStreak } = useWinner(history)

	const [ isGameWithBot, setGameMode ] = useState(true)
	const { moveOfBot } = useBot(isGameWithBot, history)

	useEffect(() => moveHandler(moveOfBot), [moveOfBot])

	const moveHandler = anotherMove => {
		if (currentBoard.board[anotherMove] || winner) return

		let newIsXNext = !history.at(-1).isXNext
		let newBoard = history.at(-1).board.map((item, index) => index === anotherMove ? history.at(-1).isXNext ? 'X' : 'O' : item)

		updateHistory(prev => [...prev, {board: newBoard, isXNext: newIsXNext}])
	}

	const startNewGame = () => {
		updateHistory(START_GAME)
	}
	
	const moveTo = position => updateCurrentBoard(position)

	const moveToOut = position => updateCurrentBoard(history.length - 1)

	const gameModeHandler = () => {
		updateHistory(START_GAME)
		setGameMode(prev => !prev)
	}

	useEffect(() => {
		// console.log('App rendered')
	})

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