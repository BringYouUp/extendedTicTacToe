import React, { useState, useEffect } from "react";

import useHistory from './hooks/useHistory'
import useCurrentBoard from './hooks/useCurrentBoard'
import useWinner from './hooks/useWinner'
import useBot from './hooks/useBot'
import useLocalStorage from './hooks/useLocalStorage'
import useMenu from './hooks/useMenu'

import Header from './components/Header'
import GameBoard from './components/GameBoard'
import GameMenu from './components/GameMenu'

import {START_GAME, START_BOARD, LS_BOARD, LS_IS_GAME_WITH_BOT, LS_IS_BOT_MOVES_FIRST} from './consts'

import './styles/root.sass'

const App = () => {
	const { history, updateHistory } = useHistory(LS_BOARD)
	const { currentBoard, updateCurrentBoard } = useCurrentBoard(history)
	const { winner, winnerStreak } = useWinner(history)
	const { moveOfBot, isGameWithBot, setGameMode, startNewGameWithBot } = useBot(history)
	const { isMenuActive, setMenuvisible } = useMenu()

	const [ storedDataIsBotMovesFirst, setNextPlayerIntoLocalStorage ] = useLocalStorage(LS_IS_BOT_MOVES_FIRST, false)
	const [ isBotMovesFirst, setIsBotMovesFirst ] = useState(storedDataIsBotMovesFirst)

	const moveHandler = anotherMove => {
		if (currentBoard.board[anotherMove] || winner) return

		let newIsXNext = !currentBoard.isXNext
		let newBoard = currentBoard.board.map((item, index) => index === anotherMove ? currentBoard.isXNext ? 'X' : 'O' : item)

		updateHistory(prev => [...prev, {board: newBoard, isXNext: newIsXNext}])
	}

	const startNewGame = () => {
		updateHistory(START_GAME)
		if (isGameWithBot) startNewGameWithBot(isBotMovesFirst)
	}

	const updateIsBotMovesFirst = () => setIsBotMovesFirst(prev => !prev)

	const moveTo = position => updateCurrentBoard(position)

	const moveToOut = position => updateCurrentBoard(history.length - 1)

	const gameModeHandler = () => {
		updateHistory(START_GAME)
		setGameMode()
	}

	useEffect(() => {
		startNewGame()
		setNextPlayerIntoLocalStorage(isBotMovesFirst)
	} , [isBotMovesFirst])

	useEffect(() => moveHandler(moveOfBot), [moveOfBot])

	return (
		<div className="game">
			<Header
				startNewGame={startNewGame}
				setMenuvisible={setMenuvisible}
			/>

			<GameBoard
				currentBoard={currentBoard.board}
				moveHandler={moveHandler}
				winner={winner}
				winnerStreak={winnerStreak}
			/>
			{isMenuActive 
				? <GameMenu
					currentBoard={currentBoard.board}
					currentPlayer={currentBoard.isXNext}
					winner={winner}
					startNewGame={startNewGame}
					history={history}
					moveTo={moveTo}
					moveToOut={moveToOut}
					isGameWithBot={isGameWithBot}
					gameModeHandler={gameModeHandler}
					setMenuvisible={setMenuvisible}
					isBotMovesFirst={isBotMovesFirst}
					updateIsBotMovesFirst={updateIsBotMovesFirst}
				/>
				: null
			}
		</div>)
}

export default App