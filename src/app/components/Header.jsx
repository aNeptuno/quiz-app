import Link from 'next/link';
import DarkModeBtn from './DarkModeBtn';
import { FaQuestion } from 'react-icons/fa';

export default function Header() {
	return (
		<header className="w-full flex flex-row justify-between overflow-hidden px-10 py-4">
			<Link href="/" className="flex flex-row items-center">
				Quiz
				<FaQuestion />
				App
			</Link>
			<DarkModeBtn />
		</header>
	);
}
