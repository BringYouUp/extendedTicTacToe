import React from "react";

import styles from './Cell.module.sass'

const Cell = ({value, moveHandler, winner, winnerStreak, position}) => {
	const finalStylesForCell = stylesArray =>stylesArray.join(' ')

	const setClassNameForCell = () => {
		const stylesForCurrectCell = [styles.cell]

		if (!value) return finalStylesForCell(stylesForCurrectCell)

		if (value === 'X') stylesForCurrectCell.push(styles.tic)
		if (value === 'O') stylesForCurrectCell.push(styles.tac)

		stylesForCurrectCell.push(styles.occupied)

		if (!winner) return finalStylesForCell(stylesForCurrectCell)

		if (!winnerStreak.includes(position)) return finalStylesForCell(stylesForCurrectCell)	

		if (value === 'X') stylesForCurrectCell.push(styles.ticWinner)
		if (value === 'O') stylesForCurrectCell.push(styles.tacWinner)
		
		return finalStylesForCell(stylesForCurrectCell)
	}

	return (
		<div onClick={moveHandler} className={setClassNameForCell()} ></div>)
} 

export default Cell