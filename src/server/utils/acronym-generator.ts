export const generateAcronym = (text: string): string => {
  if (!text) return "";

  // Split the text into words
  const words = text.split(/\s+/);

  // If it's a single word and already short (2-3 characters), return as is
  if (words.length === 1 && text.length <= 3) {
    return text.toUpperCase();
  }

  // Generate acronym from first letters of each word
  const acronym = words
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  return acronym;
};
