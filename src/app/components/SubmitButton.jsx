export default function SubmitButton({ text }) {
	return (
		<button
			aria-label={text}
			type="submit"
			className=" bg-slate-300 hover:bg-slate-400 rounded text-slate-50 px-6 py-3 mt-6"
		>
			{text}
		</button>
	);
}
