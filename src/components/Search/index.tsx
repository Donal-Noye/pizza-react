import styles from './search.module.scss'
import {BiSearch} from "react-icons/bi";
import {IoMdClose} from "react-icons/io";
import {ChangeEvent, FC, MutableRefObject, useCallback, useRef, useState} from "react";
import debounce from 'lodash.debounce'
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {setSearchValue} from "../../redux/slices/filterSlice";

const Search: FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const [value, setValue] = useState('');
	const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

	const onClickClear = () => {
		dispatch(setSearchValue(''))
		setValue('')
		inputRef.current.focus();
	}

	const updateSearchValue = useCallback(
		debounce(str => {
			dispatch(setSearchValue(str))
		}, 250),
		[]
	);

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
		updateSearchValue(e.target.value)
	}

	return (
		<div className={styles.root}>
			<BiSearch className={styles.icon} size={22}/>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				type="text"
				placeholder='Поиск пиццы...'
			/>
			{value && (
				<IoMdClose onClick={onClickClear} className={styles.clearIcon} size={22}/>
			)}
		</div>
	);
}

export default Search;