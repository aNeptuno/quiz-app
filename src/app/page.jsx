import MainForm from './components/MainForm';
import { api } from '@/app/api';

export default async function Home() {
	const categories = await api.fetchCategories();
	return (
		<div className="flex flex-col items-center">
			<h1>Test your knowledge</h1>
			<MainForm categories={categories} />
		</div>
	);
}
