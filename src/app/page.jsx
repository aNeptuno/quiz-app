'use client';
import { useEffect, useState } from 'react';
import QuizComp from './components/QuizComp';
import SubmitButton from './components/SubmitButton';
import { useRouter } from 'next/router';

const difficulties = ['Easy', 'Medium', 'Hard'];

export default function Home() {
	const [category, setCategory] = useState('code');
	const [categories, setCategories] = useState([]);
	const [difficulty, setDifficulty] = useState('Easy');

	useEffect(() => {
		async function getCategories() {
			try {
				const res = await fetch(process.env.NEXT_PUBLIC_API_CATEGORIES, {
					headers: {
						'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
						'Content-Type': 'application/json',
					},
				});
				if (!res.ok) {
					throw new Error(`Error fetching categories`);
				}
				const data = await res.json();
				setCategories(data);
			} catch (error) {
				console.error(`Error fetching categories: ${error}`);
				throw new Error(`Error fetching categories: ${error}`);
			}
		}
		getCategories();
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
	};

	const handleChange = e => {
		const { value, name } = e.target;
		if (name === 'categories') setCategory(value);
		if (name === 'difficulty') setDifficulty(value);
	};

	return (
		<div className="flex flex-col items-center">
			<h1>Test your programming knowledge</h1>

			<form onSubmit={handleSubmit} className="text-center">
				<div className="flex flex-row flex-1 items-center">
					<label htmlFor="categories">Choose a category: </label>
					<select
						name="categories"
						id="categories"
						value={category}
						onChange={handleChange}
						className="m-5 p-2"
					>
						{categories.map(cat => {
							return (
								<option
									key={cat.name.toLowerCase()}
									value={cat.name.toLowerCase()}
								>
									{cat.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className="flex flex-row flex-1 items-center">
					<label htmlFor="categories">Choose a difficulty: </label>
					<select
						name="difficulty"
						id="difficulty"
						value={difficulty}
						onChange={handleChange}
						className="m-5 p-2"
					>
						{difficulties.map(diff => {
							return (
								<option key={diff} value={diff}>
									{diff}
								</option>
							);
						})}
					</select>
				</div>
				<SubmitButton text="Start quiz" />
			</form>

			<QuizComp category={category} />
		</div>
	);
}
