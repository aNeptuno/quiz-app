import localFont from 'next/font/local';
import './globals.css';
import Header from './components/Header';
import { Inter } from 'next/font/google';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata = {
	title: 'Quiz App',
	description: 'Programming quiz app',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Header />
				<main className="md:px-10 px-8 py-10">{children}</main>
			</body>
		</html>
	);
}
