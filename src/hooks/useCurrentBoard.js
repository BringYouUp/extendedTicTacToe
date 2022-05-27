import React, { useState, useEffect, useMemo } from "react";

import {START_GAME} from './../consts'

export default function useHistory (currentHistory) {
	const [currentBoard, setCurrentBoard] = useState(currentHistory.at(-1))

	const updateCurrentBoard = position => setCurrentBoard(currentHistory[position])

	useEffect(() => {

		// console.log('updateCurrentBoard')
		setCurrentBoard(currentHistory.at(-1))
	}, [currentHistory.length])


	return {currentBoard, updateCurrentBoard}
}