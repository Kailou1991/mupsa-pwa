import { escapeHtml, renderList } from "../utils";

function cleanDiseaseTitle(title) {
  return String(title || "")
    .replaceAll("-", " ")
    .replaceAll(/\s+/g, " ")
    .trim();
}

export function CardDisease({ disease, excerpt = [], cover }) {
  const species = Array.isArray(disease?.species) ? disease.species.filter(Boolean) : [];
  const title = cleanDiseaseTitle(disease?.title) || "-";

  return `
    <a class="entity-card card border-0" href="#/disease/${encodeURIComponent(disease?.id || "")}">
      <div class="entity-card-content d-flex align-items-center gap-3">
        <div class="entity-main flex-grow-1">
          <h3 class="entity-title mb-1">${escapeHtml(title)}</h3>
          <p class="entity-subtitle mb-2">${species.length ? escapeHtml(species.join(" • ")) : "-"}</p>
          ${excerpt.length ? `<ul class="entity-list">${renderList(excerpt.slice(0, 3))}</ul>` : ""}
        </div>

        ${cover ? `<img class="entity-thumb" src="${escapeHtml(cover.thumb)}" alt="${escapeHtml(title)}" loading="lazy" />` : `<div class="entity-thumb entity-thumb-empty"><i class="bi bi-image"></i></div>`}
      </div>
      <i class="bi bi-chevron-right entity-chevron" aria-hidden="true"></i>
    </a>
  `;
}
