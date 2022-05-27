import React from "react";

import History from './../History/History'
import GameMessage from './../GameMessage/GameMessage'

import styles from './Header.module.sass'

import imgNewGame from './../../img/start.png'
import imgBot from './../../img/bot.png'
import imgBotActive from './../../img/bot-active.png'
import imgBotFirst from './../../img/bot-first.png'
import imgBotNotFirst from './../../img/bot-not-first.png'

const Header = ({startNewGame, winner, currentBoard, currentPlayer, isGameWithBot , isBotMovesFirst, history, moveTo, moveToOut, updateActivityOfBot, updateIsBotMovesFirst}) => {

	return (
		<div className={styles.header}>
			<GameMessage
				winner={winner}
				currentBoard={currentBoard}
				currentPlayer={currentPlayer}
			/>
			<div className={styles.gameButtons}>
				<div
					title="start a new game"
					onClick={() => {startNewGame()}} >
					<img src={imgNewGame} alt="" />
				</div>

				<div
					title="set the game with a bot"
					className={isGameWithBot ? styles.occupied : null}
					onClick={() => {updateActivityOfBot(); startNewGame()}} >
					<img src={isGameWithBot ? imgBotActive : imgBot} alt="" />	
				</div>

				<div
					title="change a first player"
					className={isGameWithBot ? styles.occupied : null}
					onClick={() => {updateIsBotMovesFirst(); startNewGame()}} >
					<img src={isBotMovesFirst ? imgBotFirst : imgBotNotFirst} alt="" />
				</div>

				<History
					history={history}
					moveTo={moveTo}
					moveToOut={moveToOut}
				/>
			</div>

		</div>)
}

export default Header

