import { useState, useEffect } from "react";

import { useCurrentBoard } from "./index.js"

import { TUseCurrentBoard, THistory } from "@types/index"

import { getNextMoveOfBot } from "@services/index.js"

const useBot = (currentHistory:THistory, gameID:number) => {
	const [ isGameWithBot, setActivityOfBot ] = useState<Boolean>(true)
	const [ isPause, setPause ] = useState<Boolean>(false)

	const [ isBotMovesFirst, setIsBotMovesFirst ] = useState<Boolean>(true)

	const [ isBotMoveNext, setIsBotMoveNext ] = useState<Boolean>(isBotMovesFirst)

	const [ moveOfBot, setMoveOfBot ] = useState<number>(NaN)
	const { currentBoard }: TUseCurrentBoard = useCurrentBoard(currentHistory)

	const makeMove = () => setIsBotMoveNext(prev => !prev)

	const directlyMakeMove = () => {
		if (isPause || !isGameWithBot || !isBotMoveNext) return

		setMoveOfBot(getNextMoveOfBot(currentBoard))
	}

	const updateActivityOfBot = () => {
		setActivityOfBot(prev => !prev)
	}
	
	const updateIsBotMovesFirst = () => setIsBotMovesFirst(prev => !prev)

	const startingGame = () => isGameWithBot && setIsBotMoveNext(isBotMovesFirst)

	useEffect (() => {
		currentHistory.length === 1
			? startingGame()
			: makeMove()
	}, [currentBoard, gameID])

	useEffect(() => {
		directlyMakeMove()
	}, [isBotMoveNext])

	useEffect(() => {
		isPause
			? setIsBotMoveNext(false)
			: directlyMakeMove()
	}, [isPause])

	return {
		moveOfBot,
		isGameWithBot,
		isBotMovesFirst,
		updateActivityOfBot,
		updateIsBotMovesFirst,
		setPause
	}
}

export default useBot