'use client';
import Quiz from './components/Quiz';

export default function Home() {
	return (
		<div className="flex flex-col items-center">
			<h1>Test your programming knowledge</h1>
			<ul>
				<li>Programming</li>
			</ul>
			<Quiz category={'Programming'} />
		</div>
	);
}
