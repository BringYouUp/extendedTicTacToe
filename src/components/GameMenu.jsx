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
				currentBoard={currentBoard}
				moveTo={moveTo}
				moveToOut={moveToOut}
			/>
		</div>
	)
}

const areEqual = 	(prevProps, nextProps) => 
	prevProps.currentBoard === nextProps.currentBoard &&
	prevProps.isGameWithBot == nextProps.isGameWithBot

export default React.memo(GameMenu, areEqual)