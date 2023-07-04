import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import {RootState} from "../store";

export type ItemProps = {
	id: string,
	title: string,
	price: number,
	imageUrl: string,
	types: string,
	sizes: number,
	count: number,
}

export interface CartState {
	totalPrice: number,
	items: Array<ItemProps>,
}

const initialState: CartState = {
	totalPrice: 0,
	items: [],
}

const cartSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<ItemProps>) {
			const findItem = state.items.find(item => item.id === action.payload.id)

			if (findItem) {
				findItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1
				})
			}

			state.totalPrice += state.items.reduce((sum, item) => {
				return (item.price * item.count) + sum
			}, 0)
		},
		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find(item => item.id === action.payload)
			if (findItem) {
				findItem.count--
			}
		},
		removeItem(state, action: PayloadAction<ItemProps>) {
			// @ts-ignore
			state.items = state.items.filter(item => item.id !== action.payload)
		},
		clearItems(state) {
			state.items = []
			state.totalPrice = 0
		},
	},
})

export const selectCart = (state: RootState) => state.cart

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer