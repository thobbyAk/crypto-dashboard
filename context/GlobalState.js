import React, { useReducer, createContext, useEffect, useState } from "react";
import AppReducer from "./AppReducer";

const initialState = {
	users: [],
	marketData: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	function addUser(user) {
		dispatch({
			type: "ADD_USER",
			payload: user,
		});
	}

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
			);
			const newdata = await response.json();
			// console.log("newData", newdata);
			dispatch({
				type: "INITIALIZE_MARKETDATA",
				payload: newdata,
			});
		};

		fetchData();
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				users: state.users,
				addUser,
				// setNewMarketData,
				marketData: state.marketData,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
