import styles from "./index.module.sass"

import { Cell } from "@components/index"

import { TCellValue, TBoardData, THistory } from '@types/index'

import { moveHandler as onMove } from "@services/index"

type TProps = {
    winner: TCellValue
    winnerStreak: ReadonlyArray<number>
    currentBoard: TBoardData
    updateHistory: (h:THistory) => void
};

const GameBoard: React.FC<TProps> = ({currentBoard, updateHistory, winner, winnerStreak}):JSX.Element => {
	const moveHandler = (position: number) => () => {
		onMove(position, currentBoard, winner, updateHistory)
	}

	return (
		<div className={styles.gameBoard}>
			{
				currentBoard.board.map((anotherCellOfBoard, position) =>{
					return (
						<Cell
							key={position}
							value={anotherCellOfBoard}
							moveHandler={moveHandler(position)}
							winnerStreak={winnerStreak}
							winner={winner}
							position={position}
						/>
					)
				})
			}
		</div>
	)
}

const areEqual = (prevProps: TProps, nextProps: TProps) => prevProps.currentBoard.board === nextProps.currentBoard.board

export default React.memo(GameBoard, areEqual)