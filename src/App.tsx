import React, {createContext, Dispatch, SetStateAction, useState} from 'react';

import './scss/app.scss'
import Header from "./components/Header";
import Home from "./pages/Home";
import {Outlet, Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

export type ItemsProps = {
	id: string,
	title: string,
	price: number,
	imageUrl: string,
	sizes: Array<number>
	types: Array<number>
}

function App() {
	return (
		<Routes>
			<Route path={'/'} element={<MainLayout />}>
				<Route path={'/'} element={<Home/>}/>
				<Route path={'/cart'} element={<Cart/>}/>
				<Route path={'/pizza/:id'} element={<FullPizza/>}/>
				<Route path={'*'} element={<NotFound/>}/>
			</Route>
		</Routes>
	);
}

export default App;