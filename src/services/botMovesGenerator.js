import { SIZE_OF_BOARD, WIN_STREAK, HALF_OF_WIN_STREAK } from './../consts.js'

const toGenerateAttackNextMove = arrayOfWeighMoves => toCalculateNextLogicMove(arrayOfWeighMoves)

const isAwailableCell = (currentBoard, anotherBotMove) => currentBoard.board[anotherBotMove] === null

const getGeneratedCell = () => Math.trunc(Math.random() * Math.pow(SIZE_OF_BOARD, 2))

function getNextMoveOfBot(currentBoard) {
	const enemyPlayer = currentBoard.isXNext ? 'O' : 'X'
	const botPlayer = enemyPlayer === 'X' ? 'O' : 'X'

	let arrayOfWeighEnemyPlayerMoves = getWeightForEveryEmptyCell(currentBoard, enemyPlayer, botPlayer)
	let arrayOfWeighBotMoves = getWeightForEveryEmptyCell(currentBoard, botPlayer, enemyPlayer)

	let maxWeightOfEnemyPlayer = getMaxWeightOfPlayer(arrayOfWeighEnemyPlayerMoves)
	let maxWeightOfBotPlayer = getMaxWeightOfPlayer(arrayOfWeighBotMoves)

	if (maxWeightOfBotPlayer === 0) return toGenerateRandomBotMove(currentBoard)

	if (maxWeightOfEnemyPlayer < WIN_STREAK - 1.5) return toGenerateAttackNextMove(arrayOfWeighBotMoves)

	if (Math.trunc(maxWeightOfEnemyPlayer) <= Math.trunc(maxWeightOfBotPlayer)) return toGenerateAttackNextMove(arrayOfWeighBotMoves)

	return toGenerateAttackNextMove(arrayOfWeighEnemyPlayerMoves)
}

function isGeneratedCellIsAppropriate(anotherGeneratedCell) {
	if (anotherGeneratedCell <= SIZE_OF_BOARD * HALF_OF_WIN_STREAK) return
	if (anotherGeneratedCell >= SIZE_OF_BOARD ** 2 - SIZE_OF_BOARD * HALF_OF_WIN_STREAK) return

	if (anotherGeneratedCell % SIZE_OF_BOARD < HALF_OF_WIN_STREAK ) return
	if (anotherGeneratedCell % SIZE_OF_BOARD >= SIZE_OF_BOARD - HALF_OF_WIN_STREAK ) return

	return true
}

function toGenerateRandomBotMove(currentBoard) {
	let anotherBotMove = getGeneratedCell()
	while (!isGeneratedCellIsAppropriate(anotherBotMove) || !isAwailableCell(currentBoard, anotherBotMove))
		anotherBotMove = getGeneratedCell()
			
	return anotherBotMove
}

function getMaxWeightOfPlayer(arrayOfWeight) {
	let maxWeight = 0

	for (let anotherArrayOfWeight of arrayOfWeight) {
		let maxAnotherArrayOfWeight = getMaxCellWeight(anotherArrayOfWeight)
		maxWeight = maxWeight < maxAnotherArrayOfWeight ? maxAnotherArrayOfWeight : maxWeight 
	}
	return maxWeight
}

const isCellNearTopBorder = cellIndex => cellIndex < SIZE_OF_BOARD

const isCellNearBottomBorder = cellIndex => cellIndex >= SIZE_OF_BOARD ** 2 - SIZE_OF_BOARD - 1

const isCellNearLeftBorder = cellIndex => cellIndex % SIZE_OF_BOARD === 0

const isCellNearRightBorder = cellIndex => cellIndex % SIZE_OF_BOARD === SIZE_OF_BOARD - 1

function isCellNearBorder(cellIndex) {
	return isCellNearTopBorder(cellIndex)
		|| isCellNearBottomBorder(cellIndex)
		|| isCellNearLeftBorder(cellIndex)
		|| isCellNearRightBorder(cellIndex)
}

const getTruncedRandomNumber = maxNumber => Math.trunc(Math.random() * maxNumber)

function getCellsThatConnectedWithBorders (sortedByWeightArray, countOfArraysThatHaveMaxWeight) {
	let cellsAreNearBorder = []
	let cellsAreNotNearBorder = []

	for (let i = 0; i < countOfArraysThatHaveMaxWeight; i++)
		if (isCellNearBorder(+sortedByWeightArray[i].index))
			cellsAreNearBorder.push(sortedByWeightArray[i])
		else
			cellsAreNotNearBorder.push(sortedByWeightArray[i])

	return [cellsAreNearBorder, cellsAreNotNearBorder]
}

const getArraySortedByPriority = cellsAreNearBorder => cellsAreNearBorder.sort((a, b) => a.priority - b.priority)

function getMoreAppropriateCellNearBorder(cellsAreNearBorder) {
	for (let i = 0; i < cellsAreNearBorder.length; i++) {
		let cellIndex = +cellsAreNearBorder[i].index
		let priority = isCellNearTopBorder(cellIndex) + isCellNearBottomBorder(cellIndex) + isCellNearLeftBorder(cellIndex) + isCellNearRightBorder(cellIndex)

		cellsAreNearBorder[i].priority = priority
	}
	return +getArraySortedByPriority(cellsAreNearBorder)[0].index
}


function toCalculateNextLogicMove (weightArrayOfAttacker) {
	let sortedByWeightArray = getSortedByWeightArray(weightArrayOfAttacker)

	let countOfArraysThatHaveMaxWeight = getCountOfCellsThatHaveMaxWeight(sortedByWeightArray)

	if (countOfArraysThatHaveMaxWeight.length < 2) return +sortedByWeightArray[0].index

	if (getMaxCellWeight(sortedByWeightArray[0]) >= WIN_STREAK - 1) return +sortedByWeightArray[getTruncedRandomNumber(countOfArraysThatHaveMaxWeight)].index

	let [cellsAreNearBorder, cellsAreNotNearBorder] = getCellsThatConnectedWithBorders(sortedByWeightArray, countOfArraysThatHaveMaxWeight)

	if (cellsAreNotNearBorder.length > 0) return +cellsAreNotNearBorder[getTruncedRandomNumber(cellsAreNotNearBorder.length)].index

	return getMoreAppropriateCellNearBorder(cellsAreNearBorder)
}

function getMaxCellWeight(someObject) {
	let {horizontalWeight, verticalWeight, mainDiagonalWeight, secondaryDiagonalWeight} = someObject
	return Math.max(horizontalWeight, verticalWeight, mainDiagonalWeight, secondaryDiagonalWeight)
}

function getSortedByWeightArray(arrayOfWeight) {
	return arrayOfWeight
		.filter(item => item.index)
		.sort((a, b) =>  getMaxCellWeight(b) - getMaxCellWeight(a))
}

function getCountOfCellsThatHaveMaxWeight(sortedByWeightArray) {
	let maxWeight = getMaxCellWeight(sortedByWeightArray[0])

	for (let i = 0; i < sortedByWeightArray.length; i++) {
		let maxWeightOfAnotherCell = getMaxCellWeight(sortedByWeightArray[i])
		if (maxWeightOfAnotherCell !== maxWeight) return i
	}

	return sortedByWeightArray.length
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

		for (let i = 1; i < WIN_STREAK; i++) {
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
			if (leftCellsFree + rightCellsFree >= WIN_STREAK - 1) return true
		}
		return false
	}

	function isVerticalCellsSuffice(index) {
		let isTopCellFree = true
		let isBottomCellFree = true
		let topCellsFree = 0
		let bottomCellsFree = 0

		for (let i = 1; i < WIN_STREAK; i++) {
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
			if (topCellsFree + bottomCellsFree >= WIN_STREAK - 1) return true
		}
		return false
	}

	function isMainDiagonalCellsSuffice(index) {
		let isTopLeftCellFree = true
		let isBottomRightCellFree = true
		let topLeftCellsFree = 0
		let bottomRightCellsFree = 0

		for (let i = 1; i < WIN_STREAK; i++) {
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
			if (topLeftCellsFree + bottomRightCellsFree >= WIN_STREAK - 1) return true
		}
		return false
	}

	function isSecondaryDiagonalCellsSuffice(index) {
		let isTopRightCellFree = true
		let isBottomLeftCellFree = true
		let topRightCellsFree = 0
		let bottomLeftCellsFree = 0

		for (let i = 1; i < WIN_STREAK; i++) {
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
			if (topRightCellsFree + bottomLeftCellsFree >= WIN_STREAK - 1) return true
		}
		return false
	}

	function toLeft(index) {
		for (let i = 1; i <= WIN_STREAK; i++) {
			if ((index - i) % SIZE_OF_BOARD === SIZE_OF_BOARD - 1) return i - 1

			let currentCell = currentBoard.board[index - i]

			if (i !== 1 && currentCell === null) return i - 1 + 0.5
			if (currentCell !== enemyPlayer) return i - 1
		}
	}

	function toRight(index) {
		for (let i = 1; i <= WIN_STREAK; i++) {
			if ((index + i) % SIZE_OF_BOARD === 0) return i - 1

			let currentCell = currentBoard.board[index + i]

			if (i !== 1 && currentCell === null) return i - 1 + 0.5
			if (currentCell !== enemyPlayer) return i - 1
		}
	}

	function toUp (index) {
		for (let i = 1; i <= WIN_STREAK; i++) {
			if (index - i * SIZE_OF_BOARD < 0) return i - 1

			let currentCell = currentBoard.board[index - i * SIZE_OF_BOARD]

			if (i !== 1 && currentCell === null) return i - 1 + 0.5
			if (currentCell !== enemyPlayer) return i - 1
		}
	}

	function toDown (index) {
		for (let i = 1; i <= WIN_STREAK; i++) {
			if (index + i * SIZE_OF_BOARD > SIZE_OF_BOARD ** 2) return i - 1

			let currentCell = currentBoard.board[index + i * SIZE_OF_BOARD]

			if (i !== 1 && currentCell === null) return i - 1 + 0.5
			if (currentCell !== enemyPlayer) return i - 1
		}
	}

	function toUpLeft(index) {
		for (let i = 1; i <= WIN_STREAK; i++) {
			if (index - i * SIZE_OF_BOARD - i < 0) return i - 1
			if ((index - i) % SIZE_OF_BOARD === SIZE_OF_BOARD - 1) return i - 1

			let currentCell = currentBoard.board[index - i * SIZE_OF_BOARD - i]

			if (i !== 1 && currentCell === null) return i - 1 + 0.5
			if (currentCell !== enemyPlayer) return i - 1
		}
	}

	function toDownRight(index) {
		for (let i = 1; i <= WIN_STREAK; i++) {
			if (index + i * SIZE_OF_BOARD + i > SIZE_OF_BOARD ** 2) return i - 1
			if ((index + i) % SIZE_OF_BOARD === 0) return i - 1

			let currentCell = currentBoard.board[index + i * SIZE_OF_BOARD + i]

			if (i !== 1 && currentCell === null) return i - 1 + 0.5
			if (currentCell !== enemyPlayer) return i - 1
		}
	}

	function toUpRight(index) {
		for (let i = 1; i <= WIN_STREAK; i++) {
			if (index - i * SIZE_OF_BOARD + i < 0) return i - 1
			if ((index + i) % SIZE_OF_BOARD === 0) return i - 1

			let currentCell = currentBoard.board[index - i * SIZE_OF_BOARD + i]

			if (i !== 1 && currentCell === null) return i - 1 + 0.5
			if (currentCell !== enemyPlayer) return i - 1
		}
	}

	function toDownLeft(index) {
		for (let i = 1; i <= WIN_STREAK; i++) {
			if (index + i * SIZE_OF_BOARD - i > SIZE_OF_BOARD ** 2) return i - 1
			if ((index - i) % SIZE_OF_BOARD === SIZE_OF_BOARD - 1) return i - 1

			let currentCell = currentBoard.board[index + i * SIZE_OF_BOARD - i]

			if (i !== 1 && currentCell === null) return i - 1 + 0.5
			if (currentCell !== enemyPlayer) return i - 1
		}
	}

	return cache
}

export default getNextMoveOfBot