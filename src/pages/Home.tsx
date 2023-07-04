import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import React, {useEffect, useRef} from "react";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import qs from 'qs'
import {useNavigate} from "react-router-dom";
import {fetchPizzas, SearchPizzaParams} from "../redux/slices/pizzaSlice";

function Home() {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const isSearch = useRef<boolean>(false)
	const isMounted = useRef<boolean>(false);

	const {categoryId, sort, currentPage, searchValue} = useSelector((state: RootState) => state.filter)
	const {items, status} = useSelector((state: RootState) => state.pizza)

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id))
	}

	const pizzas = items.filter(item => {
		return item.title.toLowerCase().includes(searchValue.toLowerCase())
	}).map(item => (
		<PizzaBlock
			key={item.id}
			id={item.id}
			title={item.title}
			price={item.price}
			imageUrl={item.imageUrl}
			sizes={item.sizes}
			types={item.types}
		/>
	))
	const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>)

	const onPageChange = (number: number) => {
		dispatch(setCurrentPage(number))
	}

	const getPizzas = async () => {
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		try {
			dispatch(fetchPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage
			} as SearchPizzaParams))
		} catch (err) {
			console.error(err)
			alert('Ошибка')
		}

		window.scrollTo(0, 0);
	}

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
			const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

			dispatch(setFilters({
				searchValue: params.search,
				categoryId: Number(params.category),
				currentPage: Number(params.currentPage),
				sort: sort || sortList[0]
			}));
		}
		isSearch.current = true;
	}, [])

	useEffect(() => {
		getPizzas();
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory}/>
				<Sort/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === 'error' ? (
				<div className="content__error-info">
					<h2>Произошла ошибка</h2>
					<p>К сожалению, не удлаось получить пиццы. Попробуйте повторить попытку позже</p>
				</div>) : (
				<>
					<div className="content__items">
						{status === 'loading'
							? skeletons
							: pizzas}
					</div>
					<Pagination currentPage={currentPage} onChangePage={onPageChange}/>
				</>
			)}

		</div>
	);
}

export default Home;