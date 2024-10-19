import QuizForm from './QuizForm';

function getDiffClass(diff) {
	if (diff === 'Easy') return `difficulty-easy`;
	if (diff === 'Medium') return `difficulty-medium`;
	if (diff === 'Hard') return `difficulty-hard`;
}

export default function Quiz({ quizzes }) {
	return (
		<section className="sm:p-0 px-1 md:px-6 md:w-[80%] lg:w-[50%] m-auto">
			<>
				<h1 className="text-center pt-0 px-1 md:mb-6">
					Test your{' '}
					{quizzes[0].category === 'uncategorized' ? '' : quizzes[0].category}{' '}
					knowledge
				</h1>
				<h3 className={getDiffClass(quizzes[0].difficulty)}>
					Difficulty: {quizzes[0].difficulty}
				</h3>

				<QuizForm quizzes={quizzes} />
			</>
		</section>
	);
}
