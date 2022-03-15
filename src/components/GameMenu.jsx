import React from "react";

import './../styles/root.sass'

import GameMessage from './GameMessage'
import GameOption from './GameOption'
import History from './History'

const GameMenu = ({currentBoard, currentPlayer, gameModeHandler, isGameWithBot, startNewGame, winner, history, moveTo, moveToOut}) => {
	return (
		<div className="GameMenu">
			<GameMessage
				winner={winner}
				currentBoard={currentBoard}
				currentPlayer={currentPlayer}
			/>

			<GameOption
				startNewGame={startNewGame}
				isGameWithBot={isGameWithBot}
				gameModeHandler={gameModeHandler}
			/>

			<History 
				history={history}
				moveTo={moveTo}
				moveToOut={moveToOut}



			/>
		</div>)
}

export default GameMenu