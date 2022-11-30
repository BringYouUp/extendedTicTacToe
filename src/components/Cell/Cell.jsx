import React from "react"

import styles from "./Cell.module.sass"

const Cell = ({value, moveHandler, winner, winnerStreak, position}) => {
	const finalStylesForCell = stylesArray => stylesArray.join(" ")

	const setClassNameForCell = () => {
		const stylesForCurrectCell = [styles.cell]

		if (!value)
			return finalStylesForCell(stylesForCurrectCell)

		value === "X" && stylesForCurrectCell.push(styles.tic)
		value === "O" && stylesForCurrectCell.push(styles.tac)

		stylesForCurrectCell.push(styles.occupied)

		if (!winner)
			return finalStylesForCell(stylesForCurrectCell)

		if (!winnerStreak.includes(position))
			return finalStylesForCell(stylesForCurrectCell)	

		value === "O" && stylesForCurrectCell.push(styles.tacWinner)
		value === "X" && stylesForCurrectCell.push(styles.ticWinner)
		
		return finalStylesForCell(stylesForCurrectCell)
	}

	return (
		<div onClick={moveHandler} className={setClassNameForCell()} ></div>)
} 

export default Cell