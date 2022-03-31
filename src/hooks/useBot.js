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

	let anotherBotMove = getGeneratedCell()

	let arrayOfWeight = getWeightForEmptyCell(currentBoard, enemyPlayer)

	console.log(isThereIsDanger(arrayOfWeight))

	while (!isAwailableCell(currentBoard, anotherBotMove))
		anotherBotMove = getGeneratedCell()

	return anotherBotMove
}

function isThereIsDanger(arrayOfWeight) {
	let maxWeight = 0

	for (let anotherArrayOfWeight of arrayOfWeight) {
		maxWeight = maxWeight < anotherArrayOfWeight.horizontalWeight ? anotherArrayOfWeight.horizontalWeight : maxWeight 
		maxWeight = maxWeight < anotherArrayOfWeight.verticalWeight ? anotherArrayOfWeight.verticalWeight : maxWeight 
		maxWeight = maxWeight < anotherArrayOfWeight.mainDiagonalWeight ? anotherArrayOfWeight.mainDiagonalWeight : maxWeight 
		maxWeight = maxWeight < anotherArrayOfWeight.secondaryDiagonalWeight ? anotherArrayOfWeight.secondaryDiagonalWeight : maxWeight 
	}

	return maxWeight >= 3
}

function getWeightForEmptyCell(currentBoard, enemyPlayer) {
	let cache = currentBoard.board.map((item, index) => {
		
		if (item !== null) return {}

		let horizontalWeight = toLeft(item, index) + toRight(item, index)
		let verticalWeight = toUp(item, index) + toDown(item, index)
		let mainDiagonalWeight = toUpLeft(item, index) + toDownRight(item, index)
		let secondaryDiagonalWeight = toUpRight(item, index) + toDownLeft(item, index)

		return { horizontalWeight, verticalWeight, mainDiagonalWeight, secondaryDiagonalWeight }
	})

	function toLeft(item, index) {
		for (let i = 1; i < 5; i++) {
			if ((index - i) % SIZE_OF_BOARD === SIZE_OF_BOARD - 1) return i - 1
			if (currentBoard.board[index - i] !== enemyPlayer) return i - 1
		}
		return 4
	}

	function toRight(item, index) {
		for (let i = 1; i < 5; i++) {
			if ((index + i) % SIZE_OF_BOARD === 0) return i - 1
			if (currentBoard.board[index + i] !== enemyPlayer) return i - 1
		}
		return 4
	}

	function toUp (item, index) {
		for (let i = 1; i < 5; i++) {
			if (index - i * SIZE_OF_BOARD < 0) return i - 1
			if (currentBoard.board[index - i * SIZE_OF_BOARD] !== enemyPlayer) return i - 1
		}
		return 4
	}

	function toDown (item, index) {
		for (let i = 1; i < 5; i++) {
			if (index + i * SIZE_OF_BOARD > SIZE_OF_BOARD ** 2) return i - 1
			if (currentBoard.board[index + i * SIZE_OF_BOARD] !== enemyPlayer) return i - 1
		}
		return 4
	}

	function toUpLeft(item, index) {
		for (let i = 1; i < 5; i++) {
			if (index - i * SIZE_OF_BOARD - i < 0) return i - 1
			if ((index - i) % SIZE_OF_BOARD === SIZE_OF_BOARD - 1) return i - 1
			if (currentBoard.board[index - i * SIZE_OF_BOARD - i] !== enemyPlayer) return i - 1
		}
		return 4
	}

	function toDownRight(item, index) {
		for (let i = 1; i < 5; i++) {
			if (index + i * SIZE_OF_BOARD + i > SIZE_OF_BOARD ** 2) return i - 1
			if ((index + i) % SIZE_OF_BOARD === 0) return i - 1
			if (currentBoard.board[index + i * SIZE_OF_BOARD + i] !== enemyPlayer) return i - 1
		}
		return 4
	}

	function toUpRight(item, index) {
		for (let i = 1; i < 5; i++) {
			if (index - i * SIZE_OF_BOARD + i < 0) return i - 1
			if ((index + i) % SIZE_OF_BOARD === 0) return i - 1
			if (currentBoard.board[index - i * SIZE_OF_BOARD + i] !== enemyPlayer) return i - 1
		}
		return 4
	}

	function toDownLeft(item, index) {
		for (let i = 1; i < 5; i++) {
			if (index + i * SIZE_OF_BOARD - i > SIZE_OF_BOARD ** 2) return i - 1
			if ((index - i) % SIZE_OF_BOARD === SIZE_OF_BOARD - 1) return i - 1
			if (currentBoard.board[index + i * SIZE_OF_BOARD - i] !== enemyPlayer) return i - 1
		}
		return 4
	}

	return cache
}

function prettyOutputOfData(data) {
	console.group()
	console.log(data)
	console.groupEnd()


}




// to optimize useBOT !!!!











export default useBot