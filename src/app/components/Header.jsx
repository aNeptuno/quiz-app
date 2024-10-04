import Link from 'next/link';

export default function Header() {
	return (
		<header className="w-full flex flex-row justify-between overflow-hidden px-10 py-4">
			<Link href="/">QuizApp</Link>
			<button>Dark mode</button>
		</header>
	);
}
