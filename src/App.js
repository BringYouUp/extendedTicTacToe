import React, { useState, useEffect } from "react";

import { useBot, useCurrentBoard, useHistory, useWinner } from '@hooks/index.js'

import { Header, GameBoard } from '@/components/index.js'

import { moveHandler } from '@services/index.js'

import styles from './App.module.sass'

const App = () => {
	const { history, updateHistory } = useHistory()
	const [ gameID, setGameID ] = useState(Date.now())
	const { currentBoard, updateCurrentBoard } = useCurrentBoard(history)
	const { winner, winnerStreak } = useWinner(history)
	const { moveOfBot, isGameWithBot, updateActivityOfBot, isBotMovesFirst, updateIsBotMovesFirst, setPause } = useBot(history, gameID)

	useEffect(() => moveHandler(moveOfBot, currentBoard, winner, updateHistory), [moveOfBot])
	
	useEffect(() => winner ? setPause(true) : null, [winner])

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
				updateHistory={updateHistory}
				setGameID={setGameID}
				setPause={setPause}
				history={history}
				updateCurrentBoard={updateCurrentBoard}
			/>
		
			<GameBoard
				currentBoard={currentBoard}
				updateHistory={updateHistory}
				winner={winner}
				winnerStreak={winnerStreak}
			/>
		</div>)
}

export default App