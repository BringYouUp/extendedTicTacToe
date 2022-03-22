import React, { useState } from "react";

import './../styles/root.sass'

const History = ({history, moveTo, moveToOut, currentBoard}) => {
	const [isShowHistory, updateDisplayingHistory] = useState(false)

	const showHistory = () => updateDisplayingHistory(prev => !prev)

	return (
		<div onMouseLeave={() => moveToOut()} className="History">
			<button onClick={showHistory} type="button">Show History</button>
			<ul>
			{
				isShowHistory &&
				history.map((item, index) => (
					<li 
						key={index}
						onMouseEnter={() => {moveTo(index)}}
						
					>	
						Go to move #{index}
					</li>
				))
			}
			</ul>
		</div>)
}

export default History