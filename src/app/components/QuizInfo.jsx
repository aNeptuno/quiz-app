'use client';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #455d75',
	boxShadow: 24,
};

export default function QuizInfo({
	correctAnswers,
	currentQuiz,
	isCorrect,
	getNextQuiz,
	open,
	handleClose,
}) {
	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className="flex flex-col pb-6 px-10 items-center quiz-modal">
						{isCorrect === true ? (
							<h1 className="text-green-500 text-center">Correct!</h1>
						) : (
							<h1 className="text-red-500">Wrong, keep studying!</h1>
						)}
						<p className="pb-6">
							Question:
							<br />{' '}
							<span className=" text-slate-500">{currentQuiz.question}</span>
						</p>
						<p>
							Correct answer(s):
							{correctAnswers.length > 0 ? (
								correctAnswers.map(answer => (
									<span key={answer}> {answer}</span>
								))
							) : (
								<span>No correct answers available</span>
							)}
						</p>
						<p>{currentQuiz.explanation ?? currentQuiz.explanation}</p>
						<button
							onClick={getNextQuiz}
							aria-label="Next question"
							className="submit-btn rounded px-4 py-3 mt-6"
						>
							Next question
						</button>
					</div>
				</Box>
			</Modal>
		</>
	);
}
