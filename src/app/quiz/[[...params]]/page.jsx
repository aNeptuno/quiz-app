import QuizComp from '@/app/components/QuizComp';
import Spinner from '@/app/components/Spinner';
import '@/app/hooks/useAnswers';
import { api } from '@/app/api';

export default async function QuizPage({ params }) {
	const [category, difficulty] = params.params;
	const { quizzes } = await api.fetchQuiz({ category, difficulty });
	return (
		<>{quizzes.length === 0 ? <Spinner /> : <QuizComp quizzes={quizzes} />}</>
	);
}
