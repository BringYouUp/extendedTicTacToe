import React, { useEffect } from "react";

import styles from './Help.module.sass'

import { IMG_NEW_GAME, IMG_BOT, IMG_BOT_ACTIVE, IMG_BOT_FIRST, IMG_BOT_NOT_FIRST, IMG_HELP, IMG_HISTORY } from './../../consts.js'

const Help = ({showHelp, isShowHelp}) => {

	function keyHandler (event) {
		if (event.key === 'Escape') showHelp(false)
	}

	useEffect(() => {
		window.addEventListener('keyup', keyHandler)
		return () => window.removeEventListener('keyup', keyHandler)
	}, [])

	return (
		<div
			style={{"display" : isShowHelp ? "flex" : "none"}}
			className={styles.help}>
			<div
				className={styles.helpStation}>
				
				<ul>
					<li>
						<img className={styles.helpElement} src={IMG_NEW_GAME} alt="" />
						<span>start new game</span></li>
					<li>
						<img className={styles.helpElement} src={IMG_BOT} alt="" />
						<span>game with friend</span></li>
					<li>
						<img className={styles.helpElement} src={IMG_BOT_ACTIVE} alt="" />
						<span>game with bot</span></li>
					<li>
						<img className={styles.helpElement} src={IMG_BOT_FIRST} alt="" />
						<span>bot moves first</span></li>
					<li>
						<img className={styles.helpElement} src={IMG_BOT_NOT_FIRST} alt="" />
						<span>bot moves after player</span></li>
					<li>
						<img className={styles.helpElement} src={IMG_HELP} alt="" />
						<span>help station</span></li>
					<li>
						<img className={styles.helpElement} src={IMG_HISTORY} alt="" />
						<span>game history</span></li>


				</ul>
			</div>
		</div>
	)
}

export default Help


