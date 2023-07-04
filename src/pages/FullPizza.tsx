import {Link, useNavigate, useParams} from "react-router-dom";
import {FC, useEffect, useState} from "react";
import axios from "axios";

const FullPizza: FC = () => {
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		async function fetchPizza() {
			try {
				const {data} = await axios.get(`https://64956e0fb08e17c917921909.mockapi.io/items/${id}`)
				setPizza(data)
			} catch (err) {
				alert('Ошибка при получении пиццы')
				navigate('/')
			}
		}

		fetchPizza()
	}, [])

	if (!pizza) {
		return <>Загрузка...</>;
	}

	return (
		<div className="container">
			<img src={pizza.imageUrl} alt="" />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} ₽</h4>
			<Link to="/">
				<button className="button button--outline button--add">
					<span>Назад</span>
				</button>
			</Link>
		</div>
	);
}

export default FullPizza;