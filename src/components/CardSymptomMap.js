import { escapeHtml, renderList } from "../utils";

function keepLikelyDiseaseName(value) {
  const text = String(value || "").trim();
  const lower = text.toLowerCase();
  if (!text) return false;
  if (lower.includes("mesures") || lower.includes("recommandations") || lower.includes("mupsa")) return false;
  return true;
}

export function CardSymptomMap({ symptom }) {
  const likelyAll = (Array.isArray(symptom?.likely_diseases) ? symptom.likely_diseases : [])
    .map((item) => String(item || "").trim())
    .filter(keepLikelyDiseaseName);

  const likely = likelyAll.slice(0, 3);
  const total = likelyAll.length;

  return `
    <a class="entity-card card border-0" href="#/symptom/${encodeURIComponent(symptom?.id || "")}">
      <div class="entity-card-content d-flex align-items-center gap-3">
        <div class="entity-main flex-grow-1">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="chip chip-sand"><i class="bi bi-exclamation-diamond"></i> ${escapeHtml(String(total))}</span>
          </div>
          <h3 class="entity-title mb-1">${escapeHtml(symptom?.symptom_title || "-")}</h3>
          ${likely.length ? `<ul class="entity-list">${renderList(likely)}</ul>` : ""}
        </div>
        <div class="entity-thumb entity-thumb-empty"><i class="bi bi-activity"></i></div>
      </div>
      <i class="bi bi-chevron-right entity-chevron" aria-hidden="true"></i>
    </a>
  `;
}
