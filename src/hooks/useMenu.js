import React, { useState } from "react";

const useMenu = currentHistory => {
	const [isMenuActive, setMenuActive] = useState(false)

	const setMenuvisible = isActive => setMenuActive(isActive)

	return { isMenuActive, setMenuvisible }
}

export default useMenu