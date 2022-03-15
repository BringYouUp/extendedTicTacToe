import React, { useState, useEffect, useLayoutEffect } from "react";
import useWinner from './hooks/useWinner'

import GameBoard from './components/GameBoard'
import GameMenu from './components/GameMenu'

import './styles/root.sass'

const SIZE_OF_BOARD = 15
const START_GAME = [ {board: new Array(SIZE_OF_BOARD ** 2).fill(null), isXNext: true } ]

const App = () => {
	const [history, updateHistory] = useState(START_GAME)
	const [numberOfMoves, updateNumberOfMoves] = useState(0)
	const [currentBoard, updateCurrentBoard] = useState(history[numberOfMoves])
	const [infoAboutWinner, updateWinner] = useWinner(currentBoard, SIZE_OF_BOARD)
	const [isGameWithBot, changeGameMode] = useState(false)
	const [isBotMove, botMove] = useState(false)

	const handlerOfCellClick = positionOfMove => {

		if (currentBoard.board[positionOfMove] || infoAboutWinner.winner) return

		updateNumberOfMoves(prev => prev + 1)
		updateHistory(prev => {
			let newHistory = [...(history.slice(0, numberOfMoves + 1))]
			let newIsXNext = !currentBoard.isXNext
			let newBoard = currentBoard.board.map((item, index) => index === positionOfMove ? currentBoard.isXNext ? 'X' : 'O' : item)

			return [...newHistory, {board: newBoard, isXNext: newIsXNext}]
		})

		if ()

	}

	const startNewGame = () => {
		updateHistory(START_GAME)
		updateWinner(history[0], SIZE_OF_BOARD)
		updateNumberOfMoves(0)
	}

	const moveTo = targetMove => updateNumberOfMoves(targetMove)
	const moveToOut = targetMove => updateNumberOfMoves(history.length - 1)

	useEffect(() => {
		updateLocalStorage()
		updateCurrentBoard(history[numberOfMoves])
		updateWinner(history[numberOfMoves], SIZE_OF_BOARD)
	}, [numberOfMoves])

	const updateLocalStorage = () => localStorage.setItem('EXTENDED_TIC_TAC_TOE', JSON.stringify(history))
	
	const startSavedGame = () => {
		let savedData = JSON.parse(localStorage['EXTENDED_TIC_TAC_TOE'])
		updateHistory(savedData)
		updateNumberOfMoves(savedData.length - 1)
	}

	const gameModeHandler = () => changeGameMode(prev => !prev)

	const isThereIsSavedGame = () => localStorage['EXTENDED_TIC_TAC_TOE']

	useLayoutEffect(() => {
		if (isThereIsSavedGame())
			startSavedGame()
		else
			updateLocalStorage()
	}, [])

	return (
		<div className="game">
			<GameBoard
				currentBoard={currentBoard.board}
				handlerOfCellClick={handlerOfCellClick}
				infoAboutWinner={infoAboutWinner}
			/>

			<GameMenu
				currentBoard={currentBoard.board}
				currentPlayer={currentBoard.isXNext}
				winner={infoAboutWinner.winner}
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