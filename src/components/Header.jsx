import React, {useState} from "react";

import GameMessage from './GameMessage'
import History from './History'

import './../styles/root.sass'

const Header = ({startNewGame, winner, currentBoard, currentPlayer, isGameWithBot, updateActivityOfBot, isBotMovesFirst, setIsBotMovesFirst, history, moveTo, moveToOut}) => {
	const [isShowHistory, updateDisplayingHistory] = useState(false)

	const showHistory = () => updateDisplayingHistory(prev => !prev)

	return (
		<div className="header">
			<GameMessage
				winner={winner}
				currentBoard={currentBoard}
				currentPlayer={currentPlayer}
			/>
			<div className="game-buttons">
				<div className="game-buttons__new-game" onClick={() => {startNewGame()}}></div>
				<div className={`${isGameWithBot ? 'game-buttons__bot-active' : 'game-buttons__bot'}`} onClick={() => {updateActivityOfBot(prev => !prev)}} />
				<div className={`${isBotMovesFirst ? 'game-buttons__bot-first' : 'game-buttons__bot-not-first'}`} onClick={() => {setIsBotMovesFirst(prev => !prev)}} />
				<div className="game-buttons__show-history" onClick={() => {showHistory()}} />
				{
					isShowHistory
					? <History 
						history={history}
						moveTo={moveTo}
						moveToOut={moveToOut}
					/>
					: null
				}
			</div>

		</div>)
}

export default Header