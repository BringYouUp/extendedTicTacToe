import React, { useState, useEffect } from "react";

import useLocalStorage from './useLocalStorage'

import {START_GAME} from './../consts'

export default function useHistory (currentHistory) {
	const [currentBoard, setCurrentBoard] = useState(currentHistory[currentHistory.length - 1])

	const updateCurrentBoard = position => setCurrentBoard(currentHistory[position])

	useEffect(() => setCurrentBoard(currentHistory.at(-1)), [currentHistory])

	return {currentBoard, updateCurrentBoard}
}