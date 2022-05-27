import React, { useState } from "react";

import styles from './History.module.sass'

import imgHistory from './../../img/history.png'

const History = ({ history, moveTo, moveToOut, currentBoard }) => {
	const [isShowHistory, updateDisplayingHistory] = useState(false)

	const showHistory = () => updateDisplayingHistory(prev => !prev)

	return (
		<>
			<div
				title="show history"
				onClick={() => {showHistory()}}
				className={isShowHistory ? styles.occupied : ""} >
				<img src={imgHistory} alt="" />
			</div>

			<div
				style={{"visibility" : isShowHistory ? "visible" : "hidden"}}
				onMouseLeave={() => moveToOut()}
				className={styles.history}>
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
		</>
	)
}

const areEqual = (prevProps, nextProps) => prevProps.history === nextProps.history

export default React.memo(History, areEqual)


