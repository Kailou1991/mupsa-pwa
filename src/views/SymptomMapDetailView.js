import { EmptyState } from "../components/EmptyState";
import { ImageGallery } from "../components/ImageGallery";
import { t } from "../i18n";
import { asArray, escapeHtml, formatSources, renderList } from "../utils";

function keepLikelyDiseaseName(value) {
  const text = String(value || "").trim();
  const lower = text.toLowerCase();
  if (!text) return false;
  if (lower.includes("mesures") || lower.includes("recommandations") || lower.includes("mupsa")) return false;
  return true;
}

export function SymptomMapDetailView({ symptom }) {
  if (!symptom) {
    return EmptyState({ title: t("noData"), message: t("symptoms") });
  }

  const likely = asArray(symptom.likely_diseases).map((v) => String(v || "").trim()).filter(keepLikelyDiseaseName);
  const notes = asArray(symptom.notes).map((v) => String(v || "").trim()).filter(Boolean);
  const images = asArray(symptom.images);
  const heroSrc = images[0]?.file || images[0]?.thumb || "";

  return `
    <section class="detail-topbar card border-0 d-flex align-items-center justify-content-between">
      <a class="back-btn" href="#/symptoms"><i class="bi bi-arrow-left"></i> ${t("back")}</a>
      <span class="chip chip-sand"><i class="bi bi-exclamation-diamond"></i> ${escapeHtml(String(likely.length))}</span>
    </section>

    ${heroSrc ? `<section class="hero-image card border-0"><img src="${escapeHtml(heroSrc)}" alt="${escapeHtml(symptom.symptom_title || "")}" loading="lazy" /></section>` : ""}

    <section class="detail-summary card border-0">
      <h2>${escapeHtml(symptom.symptom_title || "-")}</h2>
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-diagram-3"></i> ${t("likelyDiseases")}</h3>
      ${likely.length ? `<ul class="detail-list">${renderList(likely)}</ul>` : `<p>-</p>`}
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-journal-text"></i> ${t("notes")}</h3>
      ${notes.length ? `<ul class="detail-list">${renderList(notes)}</ul>` : `<p>-</p>`}
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-link-45deg"></i> ${t("sources")}</h3>
      <p class="sources-text">${formatSources(symptom.source_pages) || "-"}</p>
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-images"></i> ${t("openImage")}</h3>
      ${ImageGallery({ images: symptom.images })}
    </section>
  `;
}
