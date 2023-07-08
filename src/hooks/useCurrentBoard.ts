import React, { useState, useEffect } from "react";

import { START_GAME } from "@/consts"

import { THistory, TUseCurrentBoard} from "@types/index"

const useCurrentBoard = (currentHistory:THistory):TUseCurrentBoard => {
	const [currentBoard, setCurrentBoard] = useState(currentHistory[currentHistory.length - 1])

	const updateCurrentBoard = (position:number):void => setCurrentBoard(currentHistory[position])

	useEffect(() => setCurrentBoard(currentHistory[currentHistory.length - 1]), [currentHistory.length])

	return {currentBoard, updateCurrentBoard}
}

export default useCurrentBoard