import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export enum SortPropertyEnum {
	RATING_DESC = 'rating',
	RATING_ASC = '-rating',
	TITLE_DESC = 'title',
	TITLE_ASC = '-title',
	PRICE_DESC = 'price',
	PRICE_ASC = '-price',
}

export type SortType = {
	name: string,
	sortProperty: SortPropertyEnum
}

export interface FilterState {
	categoryId: number,
	searchValue: string,
	currentPage: number,
	sort: SortType
}

const initialState: FilterState = {
	categoryId: 0,
	searchValue: '',
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: SortPropertyEnum.RATING_DESC
	}
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSort(state, action: PayloadAction<SortType>) {
			state.sort = action.payload
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setFilters(state, action: PayloadAction<FilterState>) {
			if (Object.keys(action.payload).length) {
				state.sort = action.payload.sort
				state.currentPage = Number(action.payload.currentPage)
				state.categoryId = Number(action.payload.categoryId)
			} else {
				state.currentPage = 1
				state.categoryId = 0
				state.sort = {
					name: 'популярности',
					sortProperty: SortPropertyEnum.RATING_DESC
				}
			}

		}
	},
})

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setSearchValue, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer