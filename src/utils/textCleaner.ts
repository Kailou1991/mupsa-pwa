const POINTS_ONLY_LINE_RE = /^\s*\.{3,}\s*$/gm;
const SPACED_POINTS_ONLY_LINE_RE = /^\s*(?:\.\s*){3,}\s*$/gm;
const DOT_LEADER_WITH_PAGE_RE = /(?:\.\s*){3,}\s*\d+\s*$/gm;
const NUMBER_ONLY_LINE_RE = /^\d+\s*$/gm;
const SINGLE_CHAR_LINE_RE = /^\s*[a-zA-Z]\s*$/gm;
const MUPSA_RE = /\bM\.?\s*U\.?\s*P\.?\s*S\.?\s*A(?:\s*\d+)?\b/gi;

export function cleanText(text: string): string {
  const source = String(text ?? "").replace(/\r\n?/g, "\n");

  return source
    .replace(POINTS_ONLY_LINE_RE, "")
    .replace(SPACED_POINTS_ONLY_LINE_RE, "")
    .replace(DOT_LEADER_WITH_PAGE_RE, "")
    .replace(NUMBER_ONLY_LINE_RE, "")
    .replace(MUPSA_RE, "")
    .replace(SINGLE_CHAR_LINE_RE, "")
    .replace(/[ \t]{2,}/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}
