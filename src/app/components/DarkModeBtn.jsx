'use client';
import { useContext } from 'react';
import { BsSunFill } from 'react-icons/bs';
import { FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeProvider';

export default function DarkModeBtn() {
	const { theme, toggleTheme } = useContext(ThemeContext);
	return (
		<button onClick={toggleTheme}>
			{theme === 'light' ? <FaMoon size={20} /> : <BsSunFill size={20} />}
		</button>
	);
}
