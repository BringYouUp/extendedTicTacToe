import React, { useState } from "react";

import './../styles/root.sass'

const History = ({history, moveTo, moveToOut, currentBoard}) => {
	
	return (
		<div onMouseLeave={() => moveToOut()} className="history">
			<ul>
				{
					history.map((item, index) => (
						<li key={index} onMouseEnter={() => {moveTo(index)}}>	
							{
								index !== 0
									? `Go to move #${index}`
									: 'Start game'
							}
						</li>
					))
				}
			</ul>
		</div>
	)
}

const areEqual = (prevProps, nextProps) => prevProps.history === nextProps.history

export default React.memo(History, areEqual)