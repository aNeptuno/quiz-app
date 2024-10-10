'use client';

import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext({});

const THEME = 'theme';

export default function ThemeProvider({ children }) {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		const loadedTheme = localStorage.getItem(THEME);
		if ((loadedTheme === null) | (loadedTheme.length === 0)) return;
		setTheme(loadedTheme);
	}, []);

	// Adds 'dark' class to html element
	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add(theme);
		} else {
			document.documentElement.classList.remove('dark');
		}

		localStorage.setItem(THEME, theme);
	}, [theme]);

	const toggleTheme = () => {
		let newTheme;
		theme === 'light' ? (newTheme = 'dark') : (newTheme = 'light');
		setTheme(newTheme);
		localStorage.setItem(THEME, newTheme);
	};
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
