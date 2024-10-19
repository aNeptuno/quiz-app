'use client';
import { useCallback, useEffect, useState } from 'react';

// Mock data
/* import response from '@/app/mocks/response.json';
const currentQuizMock = response[0];
const answersMock = Object.values(currentQuizMock.answers);
const correctAnswersMock = Object.values(currentQuizMock.correct_answers);

const answersDataMock = getAnswersData(answersMock, correctAnswersMock);
const answersMapMock = getAnswersMap(answersMock, correctAnswersMock);
 */

function getAnswersData(answers, correctAnswers) {
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
	return answersData;
}

// example: answersMap = { ls: false, delete: false, remove: false, rmdir: true };
function getAnswersMap(answers, correctAnswers) {
	const answersMap = answers.reduce((acc, current, index) => {
		if (current !== null) {
			acc[current] = correctAnswers[index].toLowerCase() === 'true';
		}
		return acc;
	}, {});
	return answersMap;
}

export default function useAnswers({ quizzes }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [answersData, setAnswersData] = useState(null);
	const [answersMap, setAnswersMap] = useState(null);
	const [correctAnswers, setCorrectAnswers] = useState([]);
	const [finished, setFinished] = useState(false);

	const setCurrentQuizData = useCallback(() => {
		const currentQuiz = quizzes[currentIndex];
		if (currentQuiz) {
			const answers = Object.values(currentQuiz.answers);
			const correctAnswersData = Object.values(currentQuiz.correct_answers);
			const answersData = getAnswersData(answers, correctAnswersData);
			const answersMap = getAnswersMap(answers, correctAnswersData);
			setAnswersData(answersData);
			setAnswersMap(answersMap);
			const correctAnswers = Object.entries(answersMap)
				.filter(([key, value]) => value === true)
				.map(([key]) => key);
			setCorrectAnswers(correctAnswers);
		}
	}, [currentIndex, quizzes]);

	useEffect(() => {
		setCurrentQuizData();
	}, [currentIndex, setCurrentQuizData]);

	const checkAnswers = selectedAnswers => {
		if (selectedAnswers.length === 0) return false;
		let i = 0;
		while (selectedAnswers[i] && answersMap[selectedAnswers[i]]) i++;
		const isQuizCorrect = i === selectedAnswers.length;
		return isQuizCorrect;
	};

	const getNextQuiz = () => {
		if (currentIndex < quizzes.length - 1) {
			setCurrentIndex(prevIndex => prevIndex + 1);
		} else setFinished(true);
	};

	return {
		currentQuiz: quizzes[currentIndex],
		answersData,
		checkAnswers,
		correctAnswers,
		getNextQuiz,
		finished,
	};
}
