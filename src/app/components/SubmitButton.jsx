export default function SubmitButton({ text }) {
	return (
		<button
			aria-label={text}
			type="submit"
			className="submit-btn rounded px-6 py-3 mt-10"
		>
			{text}
		</button>
	);
}
