import React from "react";

import './../styles/root.sass'

const Cell = ({value, moveHandler, winner, winnerStreak, position}) => {
	const finalStylesForCell = stylesArray =>stylesArray.join(' ')

	const setClassNameForCell = () => {

		const stylesForCurrectCell = ['cell']

		if (!value) return finalStylesForCell(stylesForCurrectCell)

		if (value === 'X') stylesForCurrectCell.push('tic')
		if (value === 'O') stylesForCurrectCell.push('tac')

		if (!winner) return finalStylesForCell(stylesForCurrectCell)

		if (!winnerStreak.includes(position)) return finalStylesForCell(stylesForCurrectCell)

		stylesForCurrectCell.push('winner')
		return finalStylesForCell(stylesForCurrectCell)
	}

	return (
		<div onClick={moveHandler} className={setClassNameForCell()} />)
}

export default Cell