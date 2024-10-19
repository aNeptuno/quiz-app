export const api = {
	fetchCategories: async () => {
		let categories = [];
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
			categories = data;
		} catch (error) {
			console.error(`Error fetching categories: ${error}`);
			throw new Error(`Error fetching categories: ${error}`);
		}
		return categories;
	},
	fetchQuiz: async ({ category, difficulty }) => {
		const URL = `${process.env.NEXT_PUBLIC_API_QUESTIONS}?category=${category}&difficulty=${difficulty}`;
		let quizData = [];
		try {
			const res = await fetch(URL, {
				headers: {
					'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
					'Content-Type': 'application/json',
				},
				method: 'GET',
				cache: 'force-cache',
			});
			if (!res.ok) {
				throw new Error(`Error fetching quiz ${res.status}`);
			}
			quizData = await res.json();
		} catch (error) {
			throw new Error(`Error fetching quiz: ${error}`);
		}
		return { quizzes: quizData };
	},
};
