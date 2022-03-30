import React from "react";

import './../styles/root.sass'

const GameMessage = ({currentBoard, currentPlayer, winner}) => {
	const isMovesLeft = currentBoard.some(item => item == null)
	
	currentPlayer = currentPlayer ? 'X' : 'O'

	return (
		<div className="GameMessage">
			{winner && `${winner} is winner`}

			{!winner && isMovesLeft && `${currentPlayer} move`}

			{!isMovesLeft && 'DRAW'}
		</div>
	)
}

const areEqual = (prevProps, nextProps) => prevProps.currentBoard === nextProps.currentBoard

export default React.memo(GameMessage, areEqual)