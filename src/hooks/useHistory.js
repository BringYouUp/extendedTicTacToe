import React, { useState } from "react";

import {START_GAME} from './../consts'

export default function useHistory (key) {
	const [history, setHistory] = useState(START_GAME)

	const updateHistory = actualHistory => setHistory(actualHistory)

	return {history, updateHistory}
}