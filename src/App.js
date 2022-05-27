import React, { useState, useEffect } from "react";

import useHistory from './hooks/useHistory'
import useCurrentBoard from './hooks/useCurrentBoard'
import useWinner from './hooks/useWinner'
import useBot from './hooks/useBot'

import Header from './components/Header/Header'
import GameBoard from './components/GameBoard/GameBoard'

import { START_GAME, SIZE_OF_BOARD } from './consts'

import styles from './App.module.sass'

const App = () => {
	const { history, updateHistory } = useHistory()
	const [ gameID, setGameID ] = useState(Date.now())
	const { currentBoard, updateCurrentBoard } = useCurrentBoard(history)
	const { winner, winnerStreak } = useWinner(history)
	const { moveOfBot, isGameWithBot, updateActivityOfBot, isBotMovesFirst, updateIsBotMovesFirst } = useBot(history, gameID)

	const moveHandler = anotherMove => {
		if (!Number.isInteger(anotherMove) || currentBoard.board[anotherMove] || winner) return

		let newIsXNext = !currentBoard.isXNext
		let newBoard = currentBoard.board.map((item, index) => index === anotherMove ? currentBoard.isXNext ? 'X' : 'O' : item)

		updateHistory(prev => [...prev, {board: newBoard, isXNext: newIsXNext}])
	}

	const startNewGame = () => {
		updateHistory([{
			board: new Array(SIZE_OF_BOARD ** 2).fill(null),
			isXNext: true
		}])
		setGameID(prev => Date.now())
	}

	const moveTo = position => updateCurrentBoard(position)
	const moveToOut = position => updateCurrentBoard(history.length - 1)

	useEffect(() => {
		moveHandler(moveOfBot)
	}, [moveOfBot])

	return (
		<div className={styles.game}>
			<Header
				isBotMovesFirst={isBotMovesFirst}
				updateActivityOfBot={updateActivityOfBot}
				updateIsBotMovesFirst={updateIsBotMovesFirst}
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