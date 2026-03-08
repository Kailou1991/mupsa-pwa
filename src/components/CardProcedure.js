import { escapeHtml } from "../utils";
import { cleanText } from "../utils/textCleaner";

function sanitizeSummary(value) {
  const text = cleanText(String(value || ""));
  return text
    .replaceAll("diagnostic_or_field_procedure", "Procédure de terrain")
    .replaceAll("_", " ")
    .replaceAll(/\s+/g, " ")
    .trim();
}

export function CardProcedure({ procedure, cover, summary = "" }) {
  return `
    <a class="entity-card card border-0" href="#/procedure/${encodeURIComponent(procedure?.id || "")}">
      <div class="entity-card-content d-flex align-items-center gap-3">
        <div class="entity-main flex-grow-1">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="chip chip-blue"><i class="bi bi-clipboard2-pulse"></i> ${escapeHtml(procedure?.section || "Procédure")}</span>
          </div>
          <h3 class="entity-title mb-1">${escapeHtml(procedure?.title || "-")}</h3>
          <p class="entity-subtitle mb-0">${escapeHtml(sanitizeSummary(summary || "-"))}</p>
        </div>

        ${cover ? `<img class="entity-thumb" src="${escapeHtml(cover.thumb)}" alt="${escapeHtml(procedure?.title || "")}" loading="lazy" />` : `<div class="entity-thumb entity-thumb-empty"><i class="bi bi-file-text"></i></div>`}
      </div>
      <i class="bi bi-chevron-right entity-chevron" aria-hidden="true"></i>
    </a>
  `;
}
