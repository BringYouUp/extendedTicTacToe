import React from "react";

import History from './../History/History'
import GameMessage from './../GameMessage/GameMessage'
import HeaderItem from './../HeaderItem/HeaderItem'

import styles from './Header.module.sass'

import imgNewGame from './../../img/start.png'
import imgBot from './../../img/bot.png'
import imgBotActive from './../../img/bot-active.png'
import imgBotFirst from './../../img/bot-first.png'
import imgBotNotFirst from './../../img/bot-not-first.png'

export default function Header ({startNewGame, winner, currentBoard, currentPlayer, isGameWithBot , isBotMovesFirst, history, moveTo, moveToOut, updateActivityOfBot, updateIsBotMovesFirst}) {

	return (
		<div className={styles.header}>
			<GameMessage
				winner={winner}
				currentBoard={currentBoard}
				currentPlayer={currentPlayer}
			/>
			<div className={styles.gameButtons}>
				<HeaderItem
					title="start a new game"
					onClick={() => {startNewGame()}} >
					<img src={imgNewGame} alt="" />
				</HeaderItem>

				<HeaderItem
					title="set the game with a bot"
					className={isGameWithBot ? styles.occupied : null}
					onClick={() => {updateActivityOfBot(); startNewGame()}} >
					<img src={isGameWithBot ? imgBotActive : imgBot} alt="" />	
				</HeaderItem>

				<HeaderItem
					title="change a first player"
					className={isGameWithBot ? styles.occupied : null}
					onClick={() => {updateIsBotMovesFirst(); startNewGame()}} >
					<img src={isBotMovesFirst ? imgBotFirst : imgBotNotFirst} alt="" />
				</HeaderItem>

				<History
					history={history}
					moveTo={moveTo}
					moveToOut={moveToOut}
				/>
			</div>

		</div>)
}


