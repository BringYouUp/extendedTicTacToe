import React, { useState, useEffect } from "react";

import useLocalStorage from './useLocalStorage'

import {START_GAME} from './../consts'

export default function useHistory (key) {
	const [storedData, setDataIntoLocalStorage] = useLocalStorage(key, START_GAME)
	const [history, setHistory] = useState(storedData)

	const updateHistory = actualHistory => setHistory(actualHistory)

	useEffect(() => {
		setDataIntoLocalStorage('EXTENDED_TIC_TAC_TOE', history)
	}, [history])

	return {history, updateHistory}
}