import React from "react";

import './../styles/root.sass'

const GameOption = ({startNewGame, isGameWithBot, gameModeHandler, isBotMovesFirst, updateIsBotMovesFirst }) => {
	return (
		<div className="GameOption">
			<ul>
				<li onClick={() => {startNewGame(true)}}>New Game</li>
				<li onClick={() => {gameModeHandler()}}>{isGameWithBot ? 'The game with a BOT' : 'To start with BOT'}</li>
				<li>
					{isGameWithBot 
						? <>
								<label htmlFor="bot-first">BOT moves first  </label>
								<input onChange={() => {updateIsBotMovesFirst()}} defaultChecked={isBotMovesFirst} id="bot-first" type="checkbox"
							/>
						</>
						: null
					}
				</li>
				
			</ul>
		</div>
	)
}

export default GameOption