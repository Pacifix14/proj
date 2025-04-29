let MAX_TEXT_LENGTH = 25;

const truncateText = (text: string, maxTextLength?: number) => {
	MAX_TEXT_LENGTH = maxTextLength ?? MAX_TEXT_LENGTH;
	if (text.length <= MAX_TEXT_LENGTH) return text;
	return `${text.slice(0, MAX_TEXT_LENGTH)}...`;
};

export default truncateText;
