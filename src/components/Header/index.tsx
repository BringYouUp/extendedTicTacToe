import {useState, Suspense, lazy} from "react"

import {
	START_GAME,
	IMG_NEW_GAME,
	IMG_BOT,
	IMG_BOT_ACTIVE,
	IMG_BOT_FIRST,
	IMG_BOT_NOT_FIRST,
	IMG_HELP,
	IMG_HISTORY
} from "@/consts"

import { GameMessage } from "@/components/index"

import { TCellValue, TGameBoard, THistory } from "@types/index"

import styles from "./index.module.sass"


const History = lazy(() => import("../History/index"))
const Help = lazy(() => import("../Help/index"))

type TProps = {
	winner: TCellValue
	currentBoard: TGameBoard
	currentPlayer: Boolean | TCellValue
	isGameWithBot: Boolean
	isBotMovesFirst: Boolean
	history: THistory
	updateActivityOfBot: () => void
	updateIsBotMovesFirst: () => void
	updateCurrentBoard: (position: number) => void
	updateHistory: (h: THistory) => void
	setGameID: (id: number) => void
	setPause: (isPause: Boolean) => void
}

const Header: React.FC<TProps> = ({
	winner,
	currentBoard,
	currentPlayer,
	isGameWithBot ,
	isBotMovesFirst,
	history,
	updateActivityOfBot,
	updateIsBotMovesFirst,
	updateCurrentBoard,
	updateHistory,
	setGameID,
	setPause
}):JSX.Element => {
	const [isShowHistory, updateDisplayingHistory] = useState<Boolean>(false)
	const [isShowHelp, updateDisplayingHelp] = useState<Boolean>(false)

	const startNewGame = () => {
		updateHistory(START_GAME)
		setGameID(Date.now())
		setPause(false)
	}

	const showHistory = () => {
		isShowHelp && updateDisplayingHelp(prev => !prev)
		updateDisplayingHistory(prev => !prev)
	}
	const showHelp = (desiredState?: Boolean) => {
		isShowHistory && updateDisplayingHistory(prev => !prev)
		updateDisplayingHelp(prev => desiredState ?? !prev)
	}

	// console.log("history", history)

	return (
		<div className={styles.header}>
			<GameMessage
				winner={winner}
				currentBoard={currentBoard}
				currentPlayer={currentPlayer}
			/>

			<div className={styles.gameButtons}>
				<div
					className={styles.headerElement}
					title="start a new game"
					onClick={() => {startNewGame()}} >
					<img src={IMG_NEW_GAME} alt="" />
				</div>

				<div
					title="set the game with a bot"
					className={`${styles.headerElement} ${isGameWithBot ? styles.occupied : ""}`}
					onClick={() => {updateActivityOfBot(); startNewGame()}} >
					<img src={isGameWithBot ? IMG_BOT_ACTIVE : IMG_BOT} alt="" />	
				</div>

				<div
					className={`${styles.headerElement} ${isGameWithBot ? styles.occupied : ""}`}
					title="change a first player"
					onClick={() => {updateIsBotMovesFirst(); startNewGame()}} >
					<img src={isBotMovesFirst ? IMG_BOT_FIRST : IMG_BOT_NOT_FIRST} alt="" />
				</div>

				<div
					className={`${styles.headerElement} ${isShowHelp ? styles.occupied : ""}`}
					title="show help station"
					onClick={() => {showHelp()}}>
					<img src={IMG_HELP} alt="" />
				</div>
				
				<div
					className={`${styles.headerElement} ${isShowHistory ? styles.occupied : ""}`}
					title="show history"
					onClick={showHistory}>
					<img src={IMG_HISTORY} alt="" />
				</div>

				{
					isShowHistory
					&& (
						<Suspense fallback="">
							<History
								showHistory={showHistory}
								historyLength={history.length}
								updateCurrentBoard={updateCurrentBoard}
							/>
						</Suspense>
					)
				}
				{
					isShowHelp
					&& (
						<Suspense fallback="">
							<Help
								showHelp={showHelp}
								isShowHelp={isShowHelp}
							/>
						</Suspense>
					)
				}
			</div>
		</div>)
}

export default Header

