import React, { useState } from "react";

import { START_GAME } from '@/consts'

import { THistory, TUseHistory } from "@types/index"

const useHistory = ():TUseHistory => {
	const [history, setHistory] = useState<THistory>(START_GAME)

	const updateHistory = (actualHistory:THistory):void => setHistory(actualHistory)

	return { history, updateHistory }
}

export default useHistory