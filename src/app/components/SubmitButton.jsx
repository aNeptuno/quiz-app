export default function SubmitButton({ text }) {
	return (
		<button
			aria-label={text}
			type="submit"
			className="bg-blue-300 hover:bg-blue-500 rounded text-slate-100 px-6 py-3 mt-6"
		>
			{text}
		</button>
	);
}
