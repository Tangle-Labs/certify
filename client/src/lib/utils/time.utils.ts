export const secondsToStr = (seconds: number) => {
	const numberEnding = (number: number) => {
		return number > 1 ? "s" : "";
	};
	const years = Math.floor(seconds / (86400 * 365));
	if (years) {
		return years + " year" + numberEnding(years);
	}

	const months = Math.floor(seconds / (86400 * 30));
	if (months) {
		return months + " month" + numberEnding(months);
	}
	const days = Math.floor(seconds / 86400);
	if (days) {
		return days + " day" + numberEnding(days);
	}
};
