import React from "react";
import Cell from "./Cell"

import './../styles/root.sass'

const GameBoard = ({currentBoard, updateHistory, winner, winStreak}) => {
	return (
		<div className="GameBoard">
			{
				currentBoard.map((anotherCellOfBoard, position) =>{
					return <Cell
						key={position}
						value={anotherCellOfBoard}
						updateHistory={() => updateHistory(position)}
						
						winner={winner}
						position={position}
					/>
				})
			}
		</div>)
}

export default GameBoard