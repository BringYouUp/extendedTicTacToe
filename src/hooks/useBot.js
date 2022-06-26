import React, { useState, useEffect } from "react";

import { useCurrentBoard } from './index.js'

import { getNextMoveOfBot } from './../services/index.js'

import { SIZE_OF_BOARD } from './../consts'

export default function useBot (currentHistory, gameID) {
	const [ isGameWithBot, setActivityOfBot ] = useState(true)
	const [ isPause, setPause ] = useState(false)

	const [ isBotMovesFirst, setIsBotMovesFirst ] = useState(true)

	const [ isBotMoveNext, setIsBotMoveNext ] = useState(isBotMovesFirst)

	const [ moveOfBot, setMoveOfBot ] = useState(NaN)
	const { currentBoard } = useCurrentBoard(currentHistory)

	const makeMove = () => setIsBotMoveNext(prev => !prev)

	const directlyMakeMove = () => {
		if (isPause || !isGameWithBot || !isBotMoveNext) return

		setMoveOfBot(getNextMoveOfBot(currentBoard))
	}

	const updateActivityOfBot = () => setActivityOfBot(prev => !prev)
	
	const updateIsBotMovesFirst = () => setIsBotMovesFirst(prev => !prev)

	const startingGame = () => isGameWithBot ? setIsBotMoveNext(isBotMovesFirst) : null

	useEffect (() => currentHistory.length === 1 ? startingGame() : makeMove(), [currentBoard, gameID])

	useEffect(() => directlyMakeMove(), [isBotMoveNext])

	useEffect(() => isPause ? setIsBotMoveNext(false) : directlyMakeMove(), [isPause])

	return { moveOfBot, isGameWithBot, isBotMovesFirst, updateActivityOfBot, updateIsBotMovesFirst, setPause }
}