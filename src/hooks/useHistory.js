import React, { useState } from "react";

import { START_GAME } from './../consts'

const useHistory = key => {
	const [history, setHistory] = useState(START_GAME)

	const updateHistory = actualHistory => setHistory(actualHistory)

	return { history, updateHistory }
}

export default useHistory