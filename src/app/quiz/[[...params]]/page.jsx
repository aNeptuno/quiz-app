import QuizComp from '@/app/components/QuizComp';
import '@/app/hooks/useAnswers';

export default async function QuizPage({ params }) {
	const [category, difficulty] = params.params;
	return <QuizComp category={category} difficulty={difficulty} />;
}
