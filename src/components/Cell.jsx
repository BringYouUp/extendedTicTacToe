import React from "react";

import './../styles/root.sass'

const Cell = ({value, handlerOfCellClick}) => {

	return (
		<div onClick={handlerOfCellClick} className="Cell">
			{value}
		</div>)
}

export default Cell