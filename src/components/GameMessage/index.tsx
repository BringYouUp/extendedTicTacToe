import { ReactNode } from "react"

import styles from "./index.module.sass"

import { Space } from "@components/index"

import { TCellValue, TGameBoard } from "@types/index"

type TProps = {
    winner: TCellValue
    currentPlayer: "X" | "O" | Boolean | ReactNode
    currentBoard: TGameBoard
}

const GameMessage: React.FC<TProps> = ({currentBoard, currentPlayer, winner}):JSX.Element => {
	const isMovesLeft = currentBoard.some(item => item == null)
	const actualPlayer = currentPlayer ? "X" : "O"
	
	const getMessageForWinner = () => {
		if (!winner) return

		return (
			<>
				<span style={{
					color: `${winner === 'X' ? "var(--ticWinnerColor)" : "var(--tacWinnerColor)"}`
				}}>{winner}</span><Space />is a winner
			</>
		)
	}

	const getMessageForCurrentPlayer = () => {
		if (winner || !isMovesLeft) return

		return (
			<>
				<span style={{
					color: `${actualPlayer === 'X' ? "var(--ticColor)" : "var(--tacColor)"}`
				}}>{actualPlayer}</span><Space />move
			</>
		)
	}

	const getMessageForDraw = () => {
		if (isMovesLeft) return

		return <span style={{color: 'grey'}}><Space />DRAW</span>
	}

	// currentPlayer = currentPlayer ? "X" : "O"

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

export default GameMessage