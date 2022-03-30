import React, { useState, useEffect, useMemo } from "react";

import useCurrentBoard from './useCurrentBoard'

import {SIZE_OF_BOARD} from './../consts'

const useBot = (isGameWithBot, currentHistory) => {
	const [ moveOfBot, setMoveOfBot ] = useState('')
	const [ isBotMoveNext, setIsBotMoveNext ] = useState(false)
	const { currentBoard } = useCurrentBoard(currentHistory)

	useEffect (() => setIsBotMoveNext(prev => !prev), [currentBoard.board])

	useMemo (() => {
		if (!isGameWithBot || !isBotMoveNext) return

		let anotherBotMove = getAnotherMoveForBot(currentBoard)

		setMoveOfBot(anotherBotMove)
	}, [isBotMoveNext])

	return {moveOfBot}
}

const getGeneratedCell = () => Math.trunc(Math.random() * Math.pow(SIZE_OF_BOARD, 2))

const isAwailableCell = (currentBoard, anotherBotMove) => currentBoard.board[anotherBotMove] === null

const getAnotherMoveForBot = currentBoard => {
	const enemyPlayer = currentBoard.isXNext ? 'O' : 'X'
	// const movesOfEnemyPlayer = currentBoard.board.filter(anotherMove => anotherMove === enemyPlayer)
	// const movesOfBot = currentBoard.board.filter(anotherMove => anotherMove !== null && anotherMove !== enemyPlayer)

	let anotherBotMove = getGeneratedCell()

	let arrayOfWights = getWieghtForEmptyCell(currentBoard, enemyPlayer)
	// console.log(arrayOfWights)
	prettyOutputOfData(arrayOfWights)


	while (!isAwailableCell(currentBoard, anotherBotMove))
		anotherBotMove = getGeneratedCell()

	return anotherBotMove
}

function getWieghtForEmptyCell(currentBoard, enemyPlayer) {
	let cache = currentBoard.board.map((item, index) => {
		
		if (item !== null) return 0

		let horizontal = toLeftRight(item, index)
		let vertical = toUp(item, index) + toDown(item, index)

		return horizontal + vertical

	})



	function toLeftRight(item, index) {
		for (let i = 1; i < 5; i++) {
			if ((index + i) % SIZE_OF_BOARD === SIZE_OF_BOARD - 1) return i - 1
			if (currentBoard.board[index - i] !== enemyPlayer) return i - 1
		}
		return 4
	}

	// function to(item, index) {
	// 	for (let i = 1; i < 5; i++) {
	// 		if ((index + i) % SIZE_OF_BOARD === 0) return i - 1
	// 		if (currentBoard.board[index + i] !== enemyPlayer) return i - 1
	// 	}
	// 	return 4
	// }

	function toUp (item, index) {
		for (let i = 1; i < 5; i++) {
			if (i * SIZE_OF_BOARD - index < 0) return i - 1
			if (currentBoard.board[index - i * SIZE_OF_BOARD] !== enemyPlayer) return i - 1
		}
		return 4
	}

	function toDown (item, index) {
		for (let i = 1; i < 5; i++) {
			if (i * SIZE_OF_BOARD - index > SIZE_OF_BOARD ** 2) return i - 1
			if (currentBoard.board[index + i * SIZE_OF_BOARD] !== enemyPlayer) return i - 1
		}
		return 4
	}

	return cache
}

function prettyOutputOfData(data) {
	console.group()
	for(let i = 0; i < 15; i++) console.log(data.slice(15 * i, 15 * (i + 1)))
	console.groupEnd()
}














export default useBot