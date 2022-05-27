import React, { useState, useEffect } from "react";

import useCurrentBoard from './useCurrentBoard'

import getNextMoveOfBot from './../helpers/botMovesGenerator'

import { SIZE_OF_BOARD } from './../consts'

const useBot = (currentHistory, gameID) => {
	const [ isGameWithBot, setActivityOfBot ] = useState(false)

	const [ isBotMovesFirst, setIsBotMovesFirst ] = useState(false)

	const [ isBotMoveNext, setIsBotMoveNext ] = useState(isBotMovesFirst)

	const [ moveOfBot, setMoveOfBot ] = useState(NaN)
	const { currentBoard } = useCurrentBoard(currentHistory)

	const makeMove = () => setIsBotMoveNext(prev => !prev)

	const directlyMakeMove = () => {
		if (!isGameWithBot || !isBotMoveNext) return

		setMoveOfBot(getNextMoveOfBot(currentBoard))
	}

	const updateActivityOfBot = () => setActivityOfBot(prev => !prev)

	const updateIsBotMovesFirst = () => setIsBotMovesFirst(prev => !prev)

	const startingGame = () => {
		if (!isGameWithBot) return

		setIsBotMoveNext(isBotMovesFirst)
	}

	useEffect (() => {
		if (currentHistory.length === 1)
			startingGame()
		else
			makeMove()
	}, [currentBoard, gameID])

	useEffect(() => directlyMakeMove(), [isBotMoveNext])

	return { moveOfBot, isGameWithBot, isBotMovesFirst, updateActivityOfBot, updateIsBotMovesFirst }
}

export default useBot