import { useState, useEffect } from "react";
import { useBot, useCurrentBoard, useHistory, useWinner } from "@hooks/index"

import styles from "./App.module.sass"

import { Header, GameBoard } from "@components/index"

import { TUseHistory, TUseCurrentBoard, TUseWinner, TUseBot } from "@types/index"

import { moveHandler } from "@services/index"

const App:React.FC = ():JSX.Element => {
	const { history, updateHistory }:TUseHistory = useHistory()
	const [ gameID, setGameID ] = useState<number>(Date.now())
	const { currentBoard, updateCurrentBoard }:TUseCurrentBoard = useCurrentBoard(history)
	const { winner, winnerStreak }:TUseWinner = useWinner(history)
	const {
		moveOfBot,
		isGameWithBot,
		updateActivityOfBot,
		isBotMovesFirst,
		updateIsBotMovesFirst,
		setPause
	}:TUseBot = useBot(history, gameID)

	useEffect(() => {
		moveHandler(moveOfBot, currentBoard, winner, updateHistory)
	}, [moveOfBot])
	
	useEffect(() => {
		winner && setPause(true)
	}, [winner])

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