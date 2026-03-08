export function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderList(items) {
  return asArray(items)
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
}

export function formatSources(sources) {
  return asArray(sources)
    .map((s) => `${escapeHtml(s?.pdf || "source")} - p.${escapeHtml(s?.page ?? "?")}`)
    .join("<br>");
}

export function toIdSafe(value) {
  return String(value || "")
    .toLowerCase()
    .replaceAll(/[^a-z0-9_-]/g, "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/^-|-$/g, "");
}
