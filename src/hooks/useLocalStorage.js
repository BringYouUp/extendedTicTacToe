import React, { useState, useEffect } from "react";

export default function useLocalStorage (key, defaultValue) {
	const [storedData, setStoredData] = useState(() => {
		let rawStoredData = localStorage.getItem(key)

		if (rawStoredData) return JSON.parse(rawStoredData)

		localStorage.setItem(key, JSON.stringify(defaultValue))

		return defaultValue
	})

	const setDataIntoLocalStorage = value => localStorage.setItem(key, JSON.stringify(value))

	return [storedData, setDataIntoLocalStorage]
}