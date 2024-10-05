export default function capitalizeStr(str) {
	const cap = str.slice(0, 1).toUpperCase();
	const rest = str.slice(1, str.length);
	return cap.concat(rest);
}
