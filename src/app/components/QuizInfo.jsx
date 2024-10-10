const getQuestion = () => {
	window.location.reload();
};

export default function QuizInfo({ correctAnswers, quizData, isCorrect }) {
	return (
		<div className="flex flex-col pb-4 items-center">
			{isCorrect === true ? (
				<h1 className="text-green-500 text-center">Correct!</h1>
			) : (
				<h1 className="text-red-500">Wrong, keep studying!</h1>
			)}
			<p>
				Correct answer(s):
				{correctAnswers.length > 0 ? (
					correctAnswers.map(answer => <span key={answer}> {answer}</span>)
				) : (
					<span>No correct answers available</span>
				)}
			</p>
			<p>{quizData.explanation ?? quizData.explanation}</p>
			<button
				onClick={getQuestion}
				aria-label="Next question"
				className="bg-slate-300 hover:bg-slate-400 rounded text-slate-50 px-4 py-3 mt-6"
			>
				Next question
			</button>
		</div>
	);
}
