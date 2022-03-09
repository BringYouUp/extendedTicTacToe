import React from "react";
import Cell from "./Cell"

import './../styles/root.sass'

const GameBoard = ({currentBoard, handlerOfCellClick}) => {
	return (
		<div className="GameBoard">
			{
				currentBoard.map((anotherCellOfBoard, position) =>{
					return <Cell
						key={position}
						value={anotherCellOfBoard}
						handlerOfCellClick={() => {handlerOfCellClick(position)}}
					/>
				})
			}
		</div>)
}

export default GameBoard