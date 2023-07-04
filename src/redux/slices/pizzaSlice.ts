import type { PayloadAction } from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ItemsProps} from "../../App";
import axios from "axios";

export type SearchPizzaParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: number;
};

export const fetchPizzas = createAsyncThunk<ItemsProps[], SearchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const {sortBy, order, category, search, currentPage} = params
		const {data} = await axios.get<ItemsProps[]>(`https://64956e0fb08e17c917921909.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
		return data
	}
)

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

type PizzaState = {
	items: Array<ItemsProps>,
	status: Status.LOADING | Status.SUCCESS | Status.ERROR
}

const initialState: PizzaState = {
	items: [],
	status: Status.LOADING
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<ItemsProps[]>) {
			state.items = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = Status.LOADING
				state.items = []
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload
				state.status = Status.SUCCESS
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = Status.ERROR
				state.items = []
			})
	}
})

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer