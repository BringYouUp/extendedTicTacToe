import React from "react";
import Cell from "./../Cell/Cell"

import moveHandler from './../../helpers/moveHandler.js'

import styles from './GameBoard.module.sass'

const GameBoard =({currentBoard, updateHistory, winner, winnerStreak}) => {
	return (
		<div className={styles.gameBoard}>
			{
				currentBoard.board.map((anotherCellOfBoard, position) =>{
					return <Cell
						key={position}
						value={anotherCellOfBoard}
						moveHandler={() => moveHandler(position, currentBoard, winner, updateHistory)}
						winnerStreak={winnerStreak}
						winner={winner}
						position={position}
					/>
				})
			}
		</div>
	)
}

const areEqual = (prevProps, nextProps) => prevProps.currentBoard.board === nextProps.currentBoard.board

export default React.memo(GameBoard, areEqual)