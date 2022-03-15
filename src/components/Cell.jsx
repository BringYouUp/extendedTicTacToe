import React from "react";

import './../styles/root.sass'

const Cell = ({value, handlerOfCellClick, infoAboutWinner, position}) => {
	const {winner, winStreak} = infoAboutWinner

	const finalStylesForCell = stylesArray =>stylesArray.join(' ')

	const setClassNameForCell = () => {

		const stylesForCurrectCell = ['Cell']

		if (!value) return finalStylesForCell(stylesForCurrectCell)

		if (value === 'X') stylesForCurrectCell.push('tic')
		if (value === 'O') stylesForCurrectCell.push('tac')

		if (!winner) return finalStylesForCell(stylesForCurrectCell)

		if (!winStreak.includes(position)) return finalStylesForCell(stylesForCurrectCell)

		stylesForCurrectCell.push('winner')
		return finalStylesForCell(stylesForCurrectCell)
	}

	return (
		<div onClick={handlerOfCellClick} className={setClassNameForCell()} />)
}

export default Cell