import React from "react";

import './../styles/root.sass'

const Header = ({startNewGame, setMenuvisible}) => {
	// console.log(winnerStreak)


	return (
		<div className="Header">
			<button type="button" onClick={() => {startNewGame()}}>=</button>
			<button type="button" onClick={() => {setMenuvisible(true)}}>|||</button>
		</div>)
}

export default Header