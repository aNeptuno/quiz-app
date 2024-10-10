'use client';
import confetti from 'canvas-confetti';
import { useState } from 'react';
import useAnswers from '../hooks/useAnswers';
import QuizInfo from './QuizInfo';
import Spinner from './Spinner';
import SubmitButton from './SubmitButton';

function getDiffClass(diff) {
	if (diff === 'Easy') return `difficulty-easy`;
	if (diff === 'Medium') return `difficulty-medium`;
	if (diff === 'Hard') return `difficulty-hard`;
}

export default function Quiz({ category, difficulty }) {
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const [isCorrect, setIsCorrect] = useState(null);
	const { quizData, answersData, checkAnswers, loading, correctAnswers } =
		useAnswers({
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

	return (
		<section className="sm:p-0 p-6 md:w-[80%] lg:w-[50%] m-auto">
			{loading ? (
				<Spinner />
			) : (
				<>
					<h1 className="text-center mb-6">
						Test your {category === 'uncategorized' ? '' : category} knowledge
					</h1>
					<h3 className={getDiffClass(quizData.difficulty)}>
						Difficulty: {quizData.difficulty}
					</h3>
					<h2 className="md:py-8 py-4">{quizData.question}</h2>

					<form onSubmit={handleSubmit}>
						<div className="formInfo">
							{answersData.map(item => {
								return (
									<div
										key={item.answer}
										className="py-4 flex w-full justify-between"
									>
										<label htmlFor={item.answer} className="w-4/5">
											<span className="text-blue-900 option-letter font-bold pr-3">
												{item.option}.{' '}
											</span>
											<span className="text-gray-900 option-text">
												{item.answer}
											</span>
										</label>
										<div className="w-1/5">
											<input
												className="w-5 h-5 cursor-pointer"
												type="checkbox"
												name={item.answer}
												id={item.answer}
												value={item.answer}
												onChange={handleChange}
												disabled={isCorrect !== null}
											/>
										</div>
									</div>
								);
							})}
						</div>
						{isCorrect === null && (
							<div className="formBtn">
								<SubmitButton text="Send answer" />
							</div>
						)}
					</form>

					{isCorrect !== null && (
						<QuizInfo
							quizData={quizData}
							correctAnswers={correctAnswers}
							isCorrect={isCorrect}
						/>
					)}
				</>
			)}
		</section>
	);
}
