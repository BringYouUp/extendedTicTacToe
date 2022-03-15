import React from "react";

import './../styles/root.sass'

const GameOption = ({startNewGame, isGameWithBot, gameModeHandler}) => {

	return (
		<div className="GameOption">
			<ul>
				<li onClick={() => {startNewGame()}}>New Game</li>
				<li onClick={() => {gameModeHandler()}}>{isGameWithBot ? 'Game with BOT' : 'Change Game MODE'}</li>
			</ul>
		</div>)
}

export default GameOption