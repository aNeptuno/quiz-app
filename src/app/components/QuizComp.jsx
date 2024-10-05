'use client';
import confetti from 'canvas-confetti';
import { useState } from 'react';
import useAnswers from '../hooks/useAnswers';
import SubmitButton from './SubmitButton';
import Spinner from './Spinner';

function getDiffClass(diff) {
	if (diff === 'Easy') return `text-green-500`;
	if (diff === 'Medium') return `text-yellow-500`;
	if (diff === 'Hard') return `text-red-500`;
}

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
		<section className="sm:p-0 p-6 md:w-[80%] lg:w-[40%] m-auto">
			{loading ? (
				<Spinner />
			) : (
				<>
					<h1 className="text-center pb-10">
						Test your {category === 'uncategorized' ? '' : category} knowledge
					</h1>
					<h3 className={getDiffClass(quizData.difficulty)}>
						Difficulty: {quizData.difficulty}
					</h3>
					<h2 className="py-8">{quizData.question}</h2>

					<form className="text-center" onSubmit={handleSubmit}>
						<div>
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
						</div>
						{isCorrect === null && <SubmitButton text="Send answer" />}
					</form>
					{isCorrect !== null && (
						<div className="flex flex-col pb-4 items-center">
							{isCorrect === true ? (
								<h1 className="text-green-500 text-center">Correct!</h1>
							) : (
								<h1 className="text-red-500">Wrong, keep studying!</h1>
							)}
							<p>{quizData.explanation ?? quizData.explanation}</p>
							<button
								onClick={getQuestion}
								aria-label="Next question"
								className="bg-slate-300 hover:bg-slate-400 rounded text-slate-50 px-4 py-3 mt-6"
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
