import React, { useState, useEffect, useMemo } from "react";

import useCurrentBoard from './useCurrentBoard'

import getNextMoveOfBot from './../helpers/botMovesGenerator'

import { SIZE_OF_BOARD } from './../consts'

const useBot = currentHistory => {
	const [ isGameWithBot, updateActivityOfBot ] = useState(false)

	const [ isBotMovesFirst, setIsBotMovesFirst ] = useState(false)

	const [ isBotMoveNext, setIsBotMoveNext ] = useState(isBotMovesFirst)

	const [ moveOfBot, setMoveOfBot ] = useState(NaN)
	const { currentBoard } = useCurrentBoard(currentHistory)

	const startNewGameWithBot = isBotMoveFirst => setIsBotMoveNext(isBotMoveFirst)

	const makeMove = () => {
		setIsBotMoveNext(prev => !prev)

		if (!isGameWithBot || !isBotMoveNext) return

		let anotherBotMove = getNextMoveOfBot(currentBoard)

		setMoveOfBot(anotherBotMove)	
	}

	useEffect (() => makeMove(), [currentBoard.board])

	return { moveOfBot, isGameWithBot, updateActivityOfBot, startNewGameWithBot, isBotMovesFirst, setIsBotMovesFirst, makeMove, setIsBotMoveNext }
}

export default useBot