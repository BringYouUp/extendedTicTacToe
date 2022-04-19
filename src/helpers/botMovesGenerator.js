import { SIZE_OF_BOARD } from './../consts.js'

function getNextMoveOfBot(currentBoard) {
	const enemyPlayer = currentBoard.isXNext ? 'O' : 'X'
	const botPlayer = enemyPlayer === 'X' ? 'O' : 'X'

	let arrayOfWeighEnemyPlayerMoves = getWeightForEveryEmptyCell(currentBoard, enemyPlayer, botPlayer)
	let arrayOfWeighBotMoves = getWeightForEveryEmptyCell(currentBoard, botPlayer, enemyPlayer)

	let maxWeightOfEnemyPlayer = maxWeightOfPlayer(arrayOfWeighEnemyPlayerMoves)
	let maxWeightOfBotPlayer = maxWeightOfPlayer(arrayOfWeighBotMoves)

	if (maxWeightOfBotPlayer === 0) return toGenerateRandomBotMove(currentBoard)

	if (maxWeightOfEnemyPlayer < 3 ) return toGenerateAttackNextMove(arrayOfWeighBotMoves)

	if (maxWeightOfEnemyPlayer <= maxWeightOfBotPlayer) return toGenerateAttackNextMove(arrayOfWeighBotMoves)

	return toGenerateAttackNextMove(arrayOfWeighEnemyPlayerMoves)
}

function toGenerateAttackNextMove(arrayOfWeighMoves) { return toCalculateNextLogicMove(arrayOfWeighMoves) }

function isAwailableCell(currentBoard, anotherBotMove) { return currentBoard.board[anotherBotMove] === null }

function getGeneratedCell() { return Math.trunc(Math.random() * Math.pow(SIZE_OF_BOARD, 2)) }

function toGenerateRandomBotMove(currentBoard) {
	let anotherBotMove = getGeneratedCell()
	while (!isAwailableCell(currentBoard, anotherBotMove))
		anotherBotMove = getGeneratedCell()
			
	return anotherBotMove
}

function maxWeightOfPlayer(arrayOfWeight) {
	let maxWeight = 0

	for (let anotherArrayOfWeight of arrayOfWeight) {
		let maxAnotherArrayOfWeight = getMax(anotherArrayOfWeight)
		maxWeight = maxWeight < maxAnotherArrayOfWeight ? maxAnotherArrayOfWeight : maxWeight 
	}
	return maxWeight
}

function toCalculateNextLogicMove (arrayOfWeightOfAttacker) {
	let optimizedArray = getOptimizedArray(arrayOfWeightOfAttacker)

	let countOfArraysThatHaveMaxWeight = getCountOfArraysThatHaveMaxWeight(optimizedArray)
	let chosenMove = Math.trunc(Math.random() * countOfArraysThatHaveMaxWeight)

	return +optimizedArray[chosenMove].index
}

function getMax(someObject) {
	let {horizontalWeight, verticalWeight, mainDiagonalWeight, secondaryDiagonalWeight} = someObject
	return Math.max(horizontalWeight, verticalWeight, mainDiagonalWeight, secondaryDiagonalWeight)
}

function getOptimizedArray(arrayOfWeight) {
	return arrayOfWeight
		.filter(item => item.index)
		.sort((a, b) =>  getMax(b) - getMax(a))
}

function getCountOfArraysThatHaveMaxWeight(optimizedArray) {
	// debugger
	let maxWeight = getMax(optimizedArray[0])

	for (let i = 0; i < optimizedArray.length; i++) {
		let maxWeightOfAnotherCell = getMax(optimizedArray[i])
		if (maxWeightOfAnotherCell !== maxWeight) return i
	}

	return optimizedArray.length
}

function getWeightForEveryEmptyCell(currentBoard, enemyPlayer, botPlayer) {
	let cache = currentBoard.board.map((item, index) => {
		
		if (item !== null) return {}


		let horizontalWeight = isHorizontalCellsSuffice(index) ? toLeft(index) + toRight(index) : 0
		let verticalWeight = isVerticalCellsSuffice(index) ? toUp(index) + toDown(index) : 0
		let mainDiagonalWeight = isMainDiagonalCellsSuffice(index) ? toUpLeft(index) + toDownRight(index) : 0
		let secondaryDiagonalWeight = isSecondaryDiagonalCellsSuffice(index) ? toUpRight(index) + toDownLeft(index) : 0

		let maxWeight = Math.max(horizontalWeight, verticalWeight, mainDiagonalWeight, secondaryDiagonalWeight)

		return maxWeight > 0 ? { horizontalWeight, verticalWeight, mainDiagonalWeight, secondaryDiagonalWeight, index: ''+index } : {}
	})

	function isBothFalse(a, b) {
		if (a === false && b === false)
			return true
	}

	function isHorizontalCellsSuffice(index) {
		let isLeftCellFree = true
		let isRightCellFree = true
		let leftCellsFree = 0
		let rightCellsFree = 0

		for (let i = 1; i < 5; i++) {
			if (isLeftCellFree) {
				if ((index - i) % SIZE_OF_BOARD === SIZE_OF_BOARD - 1) isLeftCellFree = false
				if (currentBoard.board[index - i] === botPlayer) isLeftCellFree = false
				if (isLeftCellFree) leftCellsFree = i
			}

			if (isRightCellFree) {
				if ((index + i) % SIZE_OF_BOARD === 0) isRightCellFree = false
				if (currentBoard.board[index + i] === botPlayer) isRightCellFree = false
				if (isRightCellFree) rightCellsFree = i
			}

			if (isBothFalse(isLeftCellFree, isRightCellFree)) return false
			if (leftCellsFree + rightCellsFree >= 4) return true
		}
		return false
	}

	function isVerticalCellsSuffice(index) {
		let isTopCellFree = true
		let isBottomCellFree = true
		let topCellsFree = 0
		let bottomCellsFree = 0

		for (let i = 1; i < 5; i++) {
			if (isTopCellFree) {
				if (index - i * SIZE_OF_BOARD < 0) isTopCellFree = false
				if (currentBoard.board[index - i * SIZE_OF_BOARD] === botPlayer) isTopCellFree = false
				if (isTopCellFree) topCellsFree = i
			}

			if (isBottomCellFree) {
				if (index + i * SIZE_OF_BOARD > SIZE_OF_BOARD ** 2) isBottomCellFree = false
				if (currentBoard.board[index + i * SIZE_OF_BOARD] === botPlayer) isBottomCellFree = false
				if (isBottomCellFree) bottomCellsFree = i
			}

			if (isBothFalse(isTopCellFree, isBottomCellFree)) return false
			if (topCellsFree + bottomCellsFree >= 4) return true
		}
		return false
	}

	function isMainDiagonalCellsSuffice(index) {
		let isTopLeftCellFree = true
		let isBottomRightCellFree = true
		let topLeftCellsFree = 0
		let bottomRightCellsFree = 0

		for (let i = 1; i < 5; i++) {
			if (isTopLeftCellFree) {
				if (index - i * SIZE_OF_BOARD - i < 0) isTopLeftCellFree = false
				if ((index - i) % SIZE_OF_BOARD === SIZE_OF_BOARD - 1) isTopLeftCellFree = false
				if (currentBoard.board[index - i * SIZE_OF_BOARD - i] === botPlayer) isTopLeftCellFree = false
				if (isTopLeftCellFree) topLeftCellsFree = i
			}

			if (isBottomRightCellFree) {
				if (index + i * SIZE_OF_BOARD + i > SIZE_OF_BOARD ** 2) isBottomRightCellFree = false
				if ((index + i) % SIZE_OF_BOARD === 0) isBottomRightCellFree = false
				if (currentBoard.board[index + i * SIZE_OF_BOARD + i] === botPlayer) isBottomRightCellFree = false
				if (isBottomRightCellFree) bottomRightCellsFree = i
			}

			if (isBothFalse(isTopLeftCellFree, isBottomRightCellFree)) return false
			if (topLeftCellsFree + bottomRightCellsFree >= 4) return true
		}
		return false
	}

	function isSecondaryDiagonalCellsSuffice(index) {
		let isTopRightCellFree = true
		let isBottomLeftCellFree = true
		let topRightCellsFree = 0
		let bottomLeftCellsFree = 0

		for (let i = 1; i < 5; i++) {
			if (isTopRightCellFree) {
				if (index - i * SIZE_OF_BOARD + i < 0) isTopRightCellFree = false
				if ((index + i) % SIZE_OF_BOARD === 0) isTopRightCellFree = false
				if (currentBoard.board[index - i * SIZE_OF_BOARD + i] === botPlayer) isTopRightCellFree = false
				if (isTopRightCellFree) topRightCellsFree = i
			}

			if (isBottomLeftCellFree) {
				if (index + i * SIZE_OF_BOARD - i > SIZE_OF_BOARD ** 2) isBottomLeftCellFree = false
				if ((index - i) % SIZE_OF_BOARD === SIZE_OF_BOARD - 1) isBottomLeftCellFree = false
				if (currentBoard.board[index + i * SIZE_OF_BOARD - i] === botPlayer) isBottomLeftCellFree = false
				if (isBottomLeftCellFree) bottomLeftCellsFree = i
			}

			if (isBothFalse(isTopRightCellFree, isBottomLeftCellFree)) return false
			if (topRightCellsFree + bottomLeftCellsFree >= 4) return true
		}
		return false
	}

	function toLeft(index) {
		// if (index ===  48) debugger
		for (let i = 1; i < 5; i++) {
			if ((index - i) % SIZE_OF_BOARD === SIZE_OF_BOARD - 1) return i - 1
			if (currentBoard.board[index - i] !== enemyPlayer) return i - 1
		}
		return 4
	}

	function toRight(index) {
		for (let i = 1; i < 5; i++) {
			if ((index + i) % SIZE_OF_BOARD === 0) return i - 1
			if (currentBoard.board[index + i] !== enemyPlayer) return i - 1
		}
		return 4
	}

	function toUp (index) {
		for (let i = 1; i < 5; i++) {
			if (index - i * SIZE_OF_BOARD < 0) return i - 1
			if (currentBoard.board[index - i * SIZE_OF_BOARD] !== enemyPlayer) return i - 1
		}
		return 4
	}

	function toDown (index) {
		for (let i = 1; i < 5; i++) {
			if (index + i * SIZE_OF_BOARD > SIZE_OF_BOARD ** 2) return i - 1
			if (currentBoard.board[index + i * SIZE_OF_BOARD] !== enemyPlayer) return i - 1
		}
		return 4
	}

	function toUpLeft(index) {
		for (let i = 1; i < 5; i++) {
			if (index - i * SIZE_OF_BOARD - i < 0) return i - 1
			if ((index - i) % SIZE_OF_BOARD === SIZE_OF_BOARD - 1) return i - 1
			if (currentBoard.board[index - i * SIZE_OF_BOARD - i] !== enemyPlayer) return i - 1
		}
		return 4
	}

	function toDownRight(index) {
		for (let i = 1; i < 5; i++) {
			if (index + i * SIZE_OF_BOARD + i > SIZE_OF_BOARD ** 2) return i - 1
			if ((index + i) % SIZE_OF_BOARD === 0) return i - 1
			if (currentBoard.board[index + i * SIZE_OF_BOARD + i] !== enemyPlayer) return i - 1
		}
		return 4
	}

	function toUpRight(index) {
		for (let i = 1; i < 5; i++) {
			if (index - i * SIZE_OF_BOARD + i < 0) return i - 1
			if ((index + i) % SIZE_OF_BOARD === 0) return i - 1
			if (currentBoard.board[index - i * SIZE_OF_BOARD + i] !== enemyPlayer) return i - 1
		}
		return 4
	}

	function toDownLeft(index) {
		for (let i = 1; i < 5; i++) {
			if (index + i * SIZE_OF_BOARD - i > SIZE_OF_BOARD ** 2) return i - 1
			if ((index - i) % SIZE_OF_BOARD === SIZE_OF_BOARD - 1) return i - 1
			if (currentBoard.board[index + i * SIZE_OF_BOARD - i] !== enemyPlayer) return i - 1
		}
		return 4
	}

	return cache
}

export default getNextMoveOfBot