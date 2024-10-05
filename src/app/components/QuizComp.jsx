'use client';
import confetti from 'canvas-confetti';
import { useState } from 'react';
import useAnswers from '../hooks/useAnswers';
import SubmitButton from './SubmitButton';

export default function Quiz({ category, difficulty }) {
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const [isCorrect, setIsCorrect] = useState(null);
	const { quizData, answersData, checkAnswers, loading } = useAnswers({
		category,
		difficulty,
	});

	const handleSubmit = e => {
		e.preventDefault();
		const isCorrect = checkAnswers(selectedAnswers);
		setIsCorrect(isCorrect);
		if (isCorrect) confetti();
	};

	const handleChange = e => {
		const { value } = e.target;
		if (selectedAnswers.length === 0) {
			setSelectedAnswers([...selectedAnswers, value]);
			return;
		}
		if (!selectedAnswers.includes(value)) {
			setSelectedAnswers([...selectedAnswers, value]);
		} else {
			setSelectedAnswers(selectedAnswers.filter(answer => answer !== value));
		}
	};

	const getQuestion = () => {
		window.location.reload();
	};
	return (
		<section className="p-6">
			{loading === false && (
				<>
					<h1 className="text-center pb-10">Test your {category} knowledge</h1>
					<h3 className="pb-4">Difficulty: {quizData.difficulty}</h3>
					<h2 className="pb-4">{quizData.question}</h2>

					<form className="text-center" onSubmit={handleSubmit}>
						{answersData.map(item => {
							return (
								<div
									key={item.answer}
									className="py-4 flex flex-row justify-between"
								>
									<label htmlFor={item.answer}>
										<span className="text-blue-900 font-bold pr-3">
											{item.option}.{' '}
										</span>
										<span className="text-gray-900">{item.answer}</span>
									</label>
									<input
										className="w-5"
										type="checkbox"
										name={item.answer}
										id={item.answer}
										value={item.answer}
										onChange={handleChange}
										disabled={isCorrect !== null}
									/>
								</div>
							);
						})}
						{isCorrect === null && <SubmitButton text="Send answer" />}
					</form>
					{isCorrect !== null && (
						<div className="flex flex-col pb-4 items-center">
							{isCorrect === true ? (
								<h1 className="text-green-500 text-center">Correct!</h1>
							) : (
								<h1 className="text-red-500">Wrong, keep studying!</h1>
							)}
							<p>{quizData.explanation}</p>
							<button
								onClick={getQuestion}
								className="bg-blue-300 hover:bg-blue-500 rounded text-slate-100 px-4 py-3 mt-6"
							>
								Next question
							</button>
						</div>
					)}
				</>
			)}
		</section>
	);
}
