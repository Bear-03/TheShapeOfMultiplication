export function clampNumber(min, num, max) {
	return Math.min(Math.max(num, min), max);
}
