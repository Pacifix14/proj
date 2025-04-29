export function cleanText(str: string) {
  if (!str || typeof str !== "string") return "";

  // Decode common HTML entities
  const htmlEntities: Record<string, string> = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&ndash;": "–",
    "&mdash;": "—",
    "&hellip;": "...",
    "&copy;": "©",
    "&reg;": "®",
    "&trade;": "™",
    "&euro;": "€",
    "&pound;": "£",
    "&yen;": "¥",
    "&cent;": "¢",
  };

  // First decode HTML entities
  str = str.replace(/&[^;]+;/g, (match) => htmlEntities[match] ?? match);

  // Remove ql-ui spans and other utility spans
  str = str.replace(/<span[^>]*class="ql-ui"[^>]*>[^<]*<\/span>/gi, "");
  str = str.replace(/<span[^>]*>[^<]*<\/span>/gi, "$1");

  // Handle bullet points in list items with proper line breaks
  str = str.replace(/<li[^>]*data-list="bullet"[^>]*>(.*?)<\/li>/gi, "\n• $1");
  str = str.replace(/<li[^>]*>(.*?)<\/li>/gi, "\n• $1");

  // Handle paragraphs to maintain single line breaks
  str = str.replace(/<\/p>\s*<p[^>]*>/gi, "\n\n");
  str = str.replace(/<p[^>]*>/gi, "");
  str = str.replace(/<\/p>/gi, "\n");

  // Handle ordered and unordered lists
  str = str.replace(/<\/?ol>/gi, "\n");
  str = str.replace(/<\/?ul>/gi, "\n");

  // Convert <br> tags to line breaks
  str = str.replace(/<br\s*\/?>/gi, "\n");

  // Remove other HTML tags but preserve their content
  str = str.replace(/<[^>]*>/g, "");

  // Convert dashes at the start of lines to bullet points
  str = str.replace(/^\s*-\s*/gm, "• ");
  str = str.replace(/\n\s*-\s*/g, "\n• ");

  // Replace multiple spaces with a single space
  str = str.replace(/\s+/g, " ");

  // Clean up line breaks (no more than 2 consecutive)
  str = str.replace(/\n{3,}/g, "\n\n");

  // Ensure each line is properly spaced and trimmed
  str = str
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");

  // Remove any remaining special characters
  str = str.replace(/[\u200B-\u200D\uFEFF]/g, "");

  // Ensure bullet points are on their own lines
  str = str.replace(/([^\n])• /g, "$1\n• ");

  return str.trim();
}
