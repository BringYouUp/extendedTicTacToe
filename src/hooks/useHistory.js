import React, { useState, useEffect } from "react";

import useLocalStorage from './useLocalStorage'

import {START_GAME, LS_BOARD} from './../consts'

export default function useHistory (key) {
	const [storedDataAboutHistory, setDataAboutHistory] = useLocalStorage(key, START_GAME)
	const [history, setHistory] = useState(storedDataAboutHistory)

	const updateHistory = actualHistory => setHistory(actualHistory)
	useEffect(() => setDataAboutHistory(history), [history])

	return {history, updateHistory}
}