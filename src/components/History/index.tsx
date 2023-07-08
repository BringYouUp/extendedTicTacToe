import { useEffect, lazy } from "react"

import styles from "./index.module.sass"

const HistoryRow = lazy(() => import("./HistoryRow"))

type TProps = {
	showHistory: () => void
	historyLength: number
	updateCurrentBoard: (position:number) => void
}

const History:React.FC<TProps> = ({ showHistory, historyLength, updateCurrentBoard }):JSX.Element => {
	const keyHandler = (event: KeyboardEvent) => event.key === "Escape" && showHistory()

	useEffect(() => {
		window.addEventListener("keyup", keyHandler)
		return () => window.removeEventListener("keyup", keyHandler)
	}, [])

	return (
		<div
			style={{'display' : 'block'}}
			onMouseLeave={() => updateCurrentBoard(history.length - 1)}
			className={styles.history}>
			<ul>
				{
					new Array(historyLength).fill(null)
						.map((_, index:number) => (
							<HistoryRow
								key={index}
								index={index}
								updateCurrentBoard={updateCurrentBoard}
							/>
						))
				}
			</ul>
		</div>
	)
}

export default History
