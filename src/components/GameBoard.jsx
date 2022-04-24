import React from "react";
import Cell from "./Cell"

import './../styles/root.sass'

const GameBoard =({currentBoard, moveHandler, winner, winnerStreak}) => {
	return (
		<div className="game-board">
			{
				currentBoard.map((anotherCellOfBoard, position) =>{
					return <Cell
						key={position}
						value={anotherCellOfBoard}
						moveHandler={() => moveHandler(position)}
						winnerStreak={winnerStreak}
						winner={winner}
						position={position}
					/>
				})
			}
		</div>
	)
}

const areEqual = (prevProps, nextProps) => prevProps.currentBoard === nextProps.currentBoard

export default React.memo(GameBoard, areEqual)