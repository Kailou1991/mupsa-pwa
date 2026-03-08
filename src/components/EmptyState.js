import { escapeHtml } from "../utils";

export function EmptyState({ title, message }) {
  return `
    <section class="empty-state card border-0">
      <div class="empty-icon"><i class="bi bi-inbox"></i></div>
      <h3>${escapeHtml(title || "-")}</h3>
      ${message ? `<p>${escapeHtml(message)}</p>` : ""}
    </section>
  `;
}
