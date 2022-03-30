import React from "react";

import './../styles/root.sass'

const GameOption = ({startNewGame, isGameWithBot, gameModeHandler}) => {
	return (
		<div className="GameOption">
			<ul>
				<li onClick={() => {startNewGame()}}>New Game</li>
				<li onClick={() => {gameModeHandler()}}>{isGameWithBot ? 'With a BOT' : 'Not with a BOT'}</li>
				
			</ul>
		</div>
	)
}

export default GameOption