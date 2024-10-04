import response from '@/app/mocks/response.json';

const quizData = response[0];
const answers = Object.values(quizData.answers);
const correctAnswers = Object.values(quizData.correct_answers);

const answersData = answers.reduce((acc, current, index) => {
	if (current !== null) {
		const isCorrect = correctAnswers[index].toLowerCase() === 'true';
		acc.push({
			answer: current,
			correct: isCorrect,
			option: String.fromCharCode(97 + index),
		});
	}
	return acc;
}, []);

const answersMap = answers.reduce((acc, current, index) => {
	if (current !== null) {
		acc[current] = correctAnswers[index].toLowerCase() === 'true';
	}
	return acc;
}, {});

const checkAnswers = selectedAnswers => {
	let i = 0;
	while (selectedAnswers[i] && answersMap[selectedAnswers[i]]) i++;
	const isQuizCorrect = i === selectedAnswers.length;
	return isQuizCorrect;
};

export default function useAnswers({ category }) {
	return { quizData, answersData, checkAnswers };
}
