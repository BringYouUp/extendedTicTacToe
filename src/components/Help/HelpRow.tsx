import styles from "./index.module.sass"

type TProps = {
	icon: string
	label: string
}

const HelpRow:React.FC<TProps> = ({icon, label}):JSX.Element => {
	return (
		<li key={label}>
			<img className={styles.helpElement} src={icon} alt="" />
			<span>{label}</span>
		</li>
	)
}

export default HelpRow