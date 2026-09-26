/**
 * Utility to generate clean, consistent URL-friendly slugs for markdown headings.
 * Safe to import in both Server and Client Components (no Node.js fs/path dependencies).
 */
export function slugifyHeading(text: string): string {
  return text
    .replace(/[`*_[\]()]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^\w\u1780-\u17FF]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
