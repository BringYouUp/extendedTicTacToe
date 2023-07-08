import { useEffect, lazy } from "react"

import styles from "./index.module.sass"
const HelpRow = lazy(() => import("./HelpRow.tsx"))

import { HELP_LABELS } from "@/consts"

type TProps = {
	showHelp: () => void
	isShowHelp: Boolean
}

const Help:React.FC<TProps> = ({showHelp, isShowHelp}):JSX.Element => {

	const keyHandler = (event: KeyboardEvent) => event.key === "Escape" && showHelp()	

	useEffect(() => {
		window.addEventListener("keyup", keyHandler)
		return () => window.removeEventListener("keyup", keyHandler)
	}, [])

	return (
		<div
			style={{"display": "flex"}}
			className={styles.help}>
			<div
				className={styles.helpStation}>
				<h2>the goal is 5 in a row</h2>
				
				<ul>
					{
						HELP_LABELS.map(({icon, label}) => (
							<HelpRow
								key={label}
								label={label}
								icon={icon}
							/>
						))
					}
				</ul>
			</div>
		</div>
	)
}

export default Help
