'use client';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import useAnswers from '../hooks/useAnswers';
import QuizInfo from './QuizInfo';
import SubmitButton from './SubmitButton';
import Spinner from './Spinner';

export default function QuizForm({ quizzes }) {
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const [isCorrect, setIsCorrect] = useState(null);
	const [correctCount, setCorrectCount] = useState(0);
	const {
		currentQuiz,
		answersData,
		checkAnswers,
		correctAnswers,
		getNextQuiz,
		finished,
	} = useAnswers({
		quizzes,
	});

	const nextQuestion = () => {
		getNextQuiz();
		setSelectedAnswers([]);
		setIsCorrect(null);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const isCorrect = checkAnswers(selectedAnswers);
		setIsCorrect(isCorrect);
		if (isCorrect) {
			setCorrectCount(prev => prev + 1);
			confetti();
		}
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

	useEffect(() => {
		if (finished) confetti();
	}, [finished]);

	return (
		<>
			{finished === false ? (
				<>
					{correctCount > 0 && (
						<h3 className="pt-2">Correct questions: {correctCount}</h3>
					)}
					<h2 className="md:py-8 py-4">{currentQuiz.question}</h2>
					<form onSubmit={handleSubmit}>
						<div className="formInfo">
							{answersData === null ? (
								<Spinner />
							) : (
								answersData.map(item => {
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
											<div className="w-1/5 text-right md:text-center">
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
								})
							)}
						</div>
						{isCorrect === null && (
							<div className="formBtn">
								<SubmitButton text="Send answer" />
							</div>
						)}
					</form>
					{isCorrect !== null && (
						<QuizInfo
							currentQuiz={currentQuiz}
							correctAnswers={correctAnswers}
							isCorrect={isCorrect}
							getNextQuiz={nextQuestion}
						/>
					)}
				</>
			) : (
				<div>
					<h1>
						Congratulations! You completed all available questions for this
						category and difficulty! 🎉
					</h1>
					<h2>
						Correct questions: {correctCount}/{quizzes.length - 1}
					</h2>
				</div>
			)}
		</>
	);
}
