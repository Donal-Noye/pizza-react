import {FC} from "react";

type PropsType = {
	value: number,
	onChangeCategory: (i: number) => void,
}

const Categories: FC<PropsType> = ({value, onChangeCategory}) => {
	const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]

	return (
		<div className="categories">
			<ul>
				{categories.map((item, i) => {
					return (
						<li
							key={i}
							onClick={() => onChangeCategory(i)}
							className={value === i ? 'active' : ''}
						>{item}</li>
					)
				})}
			</ul>
		</div>
	);
}

export default Categories;