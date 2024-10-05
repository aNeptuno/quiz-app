'use client';
import { useEffect, useState } from 'react';
import { api } from '../api';

// Mock data
/* import response from '@/app/mocks/response.json';
const quizDataMock = response[0];
const answersMock = Object.values(quizDataMock.answers);
const correctAnswersMock = Object.values(quizDataMock.correct_answers);

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
function getAnswersMap(answers, correctAnswers) {
	const answersMap = answers.reduce((acc, current, index) => {
		if (current !== null) {
			acc[current] = correctAnswers[index].toLowerCase() === 'true';
		}
		return acc;
	}, {});
	return answersMap;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export default function useAnswers({ category, difficulty }) {
	const [quizData, setQuizData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [answersData, setAnswersData] = useState(null);
	const [answersMap, setAnswersMap] = useState(null);

	useEffect(() => {
		async function getQuizData() {
			setLoading(true);
			const { quizData } = await api.fetchQuiz({ category, difficulty });
			let index = getRandomInt(quizData.length);
			setQuizData(quizData[index]);
			if (quizData && quizData.length > 0) {
				const answers = Object.values(quizData[index].answers);
				const correctAnswers = Object.values(quizData[index].correct_answers);
				const answersData = getAnswersData(answers, correctAnswers);
				const answersMap = getAnswersMap(answers, correctAnswers);
				setAnswersData(answersData);
				setAnswersMap(answersMap);
			}
			setLoading(false);
		}
		getQuizData();
	}, [category, difficulty]);

	const checkAnswers = selectedAnswers => {
		let i = 0;
		while (selectedAnswers[i] && answersMap[selectedAnswers[i]]) i++;
		const isQuizCorrect = i === selectedAnswers.length;
		return isQuizCorrect;
	};

	return { quizData, answersData, checkAnswers, loading };
}
