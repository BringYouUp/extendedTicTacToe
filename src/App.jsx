import React, { useState, useEffect, useLayoutEffect } from "react";

import GameBoard from './components/GameBoard'
import GameMenu from './components/GameMenu'

import './styles/root.sass'
import {checkForWinner} from './helpers'



const WIDTH_OF_BOARD = 10

const HEIGHT_OF_BOARD = 10

const START_GAME = new Array(100).fill(null)

const App = () => {

	const [currentBoard, updateBoard] = useState(START_GAME)

	const [numberOfMoves, updateNumberOfMoves] = useState(0)

	const [isXNext, updatePlayer] = useState(true)
	
	console.log(checkForWinner(currentBoard, isXNext))

	const handlerOfCellClick = positionOfMove => {

		if (currentBoard[positionOfMove]) return

		updateNumberOfMoves(prev => prev + 1)

		updateBoard(prev => {
			let newCurrentBoard = [...prev]

			newCurrentBoard[positionOfMove] = isXNext ? 'X' : 'O'

			return newCurrentBoard
		})

		updatePlayer(prev => !prev)

	}

	const saveGame = () => {}

	const newGame = () => {}



	return (
		<div className="game">
			<GameBoard currentBoard={currentBoard} handlerOfCellClick={handlerOfCellClick}/>
			<GameMenu />
		</div>)
}

export default App