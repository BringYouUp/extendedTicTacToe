import React, { useState, useEffect, useLayoutEffect } from "react";

import useHistory from './hooks/useHistory'
import useWinner from './hooks/useWinner'
import useBot from './hooks/useBot'

import GameBoard from './components/GameBoard'
import GameMenu from './components/GameMenu'

import './styles/root.sass'

const App = () => {
	const {history, currentBoard, updateHistory} = useHistory('EXTENDED_TIC_TAC_TOE')
	const {winner, winnerStreak} = useWinner(currentBoard)

	const [isGameWithBot, changeGameMode] = useState(false)

	const [botMove, setBotMove] = useBot(currentBoard)
	
	const startNewGame = () => {

	}

	const gameModeHandler = () => {
		changeGameMode(prev => !prev)
		startNewGame()
	}

	return (
		<div className="game">
			<GameBoard
				currentBoard={currentBoard.board}
				updateHistory={updateHistory}
				winner={winner}
				winnerStreak={winnerStreak}
			/>

			<GameMenu
				currentBoard={currentBoard.board}
				currentPlayer={currentBoard.isXNext}
				winner={winner}
				startNewGame={startNewGame}
				history={history}
				// moveTo={moveTo}
				// moveToOut={moveToOut}
				isGameWithBot={isGameWithBot}
				gameModeHandler={gameModeHandler}
			/>
		</div>)
}

export default App