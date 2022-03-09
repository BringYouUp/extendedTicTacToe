import React from "react";

import './../styles/root.sass'

import GameOption from './GameOption'
import History from './History'

const GameMenu = () => {

	return (
		<div className="GameMenu">
			<GameOption />
			<History />
		</div>)
}

export default GameMenu