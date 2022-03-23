import React from "react";
import Cell from "./Cell"

import './../styles/root.sass'

const GameBoard = ({currentBoard, moveHandler, winner, winStreak}) => {
	return (
		<div className="GameBoard">
			{
				currentBoard.map((anotherCellOfBoard, position) =>{
					return <Cell
						key={position}
						value={anotherCellOfBoard}
						moveHandler={() => moveHandler(position)}
						
						winner={winner}
						position={position}
					/>
				})
			}
		</div>)
}

export default GameBoard