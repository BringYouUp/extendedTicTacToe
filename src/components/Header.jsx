import React, {useState} from "react";

import GameMessage from './GameMessage'
import History from './History'

import './../styles/root.sass'

const Header = ({startNewGame, winner, currentBoard, currentPlayer, isGameWithBot, updateActivityOfBot, isBotMovesFirst, setIsBotMovesFirst, history, moveTo, moveToOut}) => {
	const [isShowHistory, updateDisplayingHistory] = useState(false)

	const showHistory = () => updateDisplayingHistory(prev => !prev)

	return (
		<div className="Header">
			<GameMessage
				winner={winner}
				currentBoard={currentBoard}
				currentPlayer={currentPlayer}
			/>
			<div title="to start new game" className="Header__newGame" onClick={() => {startNewGame()}}></div>
			<div title="is game with bot" className="Header__withBot" onClick={() => {updateActivityOfBot(prev => !prev)}} style={{backgroundColor: `${isGameWithBot ? "red" : "transparent"}`}}></div>
			<div title="is bot moves first" className="Header__botFirst" onClick={() => {setIsBotMovesFirst(prev => !prev)}} style={{backgroundColor: `${isBotMovesFirst ? "red" : "transparent"}`}}>1</div>
			<div title="show history" className="Header__history" onClick={() => {showHistory()}} style={{isShowHistory: `${isBotMovesFirst ? "yellow" : "transparent"}`}}>
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