import React, { useState, useEffect, useMemo } from "react";

import {START_GAME} from './../consts'

export default function useHistory (currentHistory) {
	const [currentBoard, setCurrentBoard] = useState(currentHistory[currentHistory.length - 1])

	const updateCurrentBoard = position => setCurrentBoard(currentHistory[position])

	useEffect(() => {

		setCurrentBoard(currentHistory[currentHistory.length - 1])
	}, [currentHistory.length])


	return {currentBoard, updateCurrentBoard}
}