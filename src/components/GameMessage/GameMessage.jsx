import React from "react";

import styles from './GameMessage.module.sass'

const GameMessage = ({currentBoard, currentPlayer, winner}) => {
	const isMovesLeft = currentBoard.some(item => item == null)
	
	const getMessageForWinner = () => {
		if (!winner) return

		return (
			<>
				<span style={{color: `${winner === 'X' ? 'red' : 'blue'}`}}>{winner}</span> is a winner
			</>
		)
	}

	const getMessageForCurrentPlayer = () => {
		if (!(!winner && isMovesLeft)) return

		return (
			<>
				<span style={{color: `${currentPlayer === 'X' ? 'red' : 'blue'}`}}>{currentPlayer}</span> move
			</>
		)
	}

	const getMessageForDraw = () => {
		if (isMovesLeft) return

		return (
			<span style={{color: 'grey'}}> DRAW </span>
		)
	}

	currentPlayer = currentPlayer ? 'X' : 'O'

	return (
		<div className={styles.gameMessage}>
			{
				getMessageForWinner() ||
				getMessageForCurrentPlayer() ||
				getMessageForDraw()
			}			
		</div>
	)
}

const areEqual = (prevProps, nextProps) => prevProps.currentBoard === nextProps.currentBoard

export default React.memo(GameMessage, areEqual)