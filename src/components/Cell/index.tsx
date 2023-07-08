import styles from "./index.module.sass"
import { TCellValue } from "@types/index"
import cn from "classnames"

type TProps = {
    value: TCellValue,
    moveHandler: () => void
    winner: TCellValue
    winnerStreak: ReadonlyArray<number>
    position: number,
};

const Cell: React.FC<TProps> = ({value, moveHandler, winner, winnerStreak, position}):JSX.Element => {
	return (
		<div onClick={moveHandler} className={cn(styles.cell, {
			[styles.occupied]: value,
			[styles.tic]: value && value === "X",
			[styles.tac]: value && value === "O",
			[styles.ticWinner]: winner && winnerStreak.includes(position) && value === "X",
			[styles.tacWinner]: winner && winnerStreak.includes(position) && value === "O"
		})} ></div>)
} 

export default Cell