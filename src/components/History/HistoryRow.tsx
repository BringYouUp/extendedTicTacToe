type TProps = {
	index: number,
	updateCurrentBoard: (index:number) => void
}

const HistoryRow:React.FC<TProps> = ({ index, updateCurrentBoard }):JSX.Element => {
	return (
		<li onMouseEnter={() => {updateCurrentBoard(index)}}>	
			{
				index !== 0
					? `Go to move #${index}`
					: "Start game"
			}
		</li>
	)
}

export default HistoryRow