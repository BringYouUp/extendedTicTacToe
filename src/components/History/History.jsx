import React, { useState } from "react";


import styles from './History.module.sass'

import imgHistory from './../../img/history.png'

const History = ({isShowHistory, history, updateCurrentBoard }) => {
	return (
		<div
			style={{"display" : isShowHistory ? "block" : "none"}}
			onMouseLeave={() => updateCurrentBoard(history.length - 1)}
			className={styles.history}>
			<ul>
				{
					history.map((item, index) => (
						<li key={index} onMouseEnter={() => {updateCurrentBoard(index)}}>	
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

