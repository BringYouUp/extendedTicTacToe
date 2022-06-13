import React, {useState, useEffect} from "react";

import { START_GAME, IMG_NEW_GAME, IMG_BOT, IMG_BOT_ACTIVE, IMG_BOT_FIRST, IMG_BOT_NOT_FIRST, IMG_HELP, IMG_HISTORY } from './../../consts.js'

import GameMessage from './../GameMessage/GameMessage'
import History from './../History/History'
import Help from './../Help/Help'

import styles from './Header.module.sass'

export default function Header ({winner, currentBoard, currentPlayer, isGameWithBot , isBotMovesFirst, history, updateActivityOfBot, updateIsBotMovesFirst, updateCurrentBoard, updateHistory, setGameID, setPause}) {
	const [isShowHistory, updateDisplayingHistory] = useState(false)
	const [isShowHelp, updateDisplayingHelp] = useState(false)

	const startNewGame = () => {
		console.log('obj')
		updateHistory(START_GAME)
		setGameID(Date.now())
		setPause(false)
	}

	const showHistory = () => updateDisplayingHistory(prev => !prev)
	const showHelp = desiredState => updateDisplayingHelp(prev => desiredState ?? !prev)

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
					className={`${styles.headerElement} ${isGameWithBot ? styles.occupied : ''}`}
					onClick={() => {updateActivityOfBot(); startNewGame()}} >
					<img src={isGameWithBot ? IMG_BOT_ACTIVE : IMG_BOT} alt="" />	
				</div>

				<div
					className={`${styles.headerElement} ${isGameWithBot ? styles.occupied : ''}`}
					title="change a first player"
					onClick={() => {updateIsBotMovesFirst(); startNewGame()}} >
					<img src={isBotMovesFirst ? IMG_BOT_FIRST : IMG_BOT_NOT_FIRST} alt="" />
				</div>

				<div
					className={`${styles.headerElement} ${isShowHelp ? styles.occupied : ''}`}
					title="show help station"
					onClick={() => {showHelp()}}>
					<img src={IMG_HELP} alt="" />
				</div>
				
				<div
					className={`${styles.headerElement} ${isShowHistory ? styles.occupied : ''}`}
					title="show history"
					onClick={() => {showHistory()}}>
					<img src={IMG_HISTORY} alt="" />
				</div>

				{
					isShowHistory
					? 
						<History
							history={history}
							updateCurrentBoard={updateCurrentBoard}
							isShowHistory={isShowHistory}
						/>
					: null
				}

				{
					isShowHelp
					? 
						<Help
							showHelp={showHelp}
							isShowHelp={isShowHelp}
						/>
					: null
				}

			</div>

		</div>)
}


