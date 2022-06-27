import React, { useState, useEffect } from "react";

import { START_GAME } from './../consts'

const useHistory = currentHistory => {
	const [currentBoard, setCurrentBoard] = useState(currentHistory[currentHistory.length - 1])

	const updateCurrentBoard = position => setCurrentBoard(currentHistory[position])

	useEffect(() => setCurrentBoard(currentHistory[currentHistory.length - 1]), [currentHistory.length])

	return {currentBoard, updateCurrentBoard}
}

export default useHistory