import { EmptyState } from "../components/EmptyState";
import { ImageGallery } from "../components/ImageGallery";
import { t } from "../i18n";
import { asArray, escapeHtml, formatSources, renderList } from "../utils";

function cleanDiseaseTitle(title) {
  return String(title || "")
    .replaceAll("-", " ")
    .replaceAll(/\s+/g, " ")
    .trim();
}

function section(title, items, icon = "bi-dot") {
  const rows = asArray(items).map((x) => String(x || "").trim()).filter(Boolean);
  if (!rows.length) return "";
  return `
    <section class="detail-section card border-0">
      <h3><i class="bi ${icon}"></i> ${escapeHtml(title)}</h3>
      <ul class="detail-list">${renderList(rows)}</ul>
    </section>
  `;
}

function heroImage(disease, title) {
  const images = asArray(disease?.images);
  const src = images[0]?.file || images[0]?.thumb || "";
  if (!src) return "";
  return `
    <section class="hero-image card border-0">
      <img src="${escapeHtml(src)}" alt="${escapeHtml(title)}" loading="lazy" />
    </section>
  `;
}

export function DiseaseDetailView({ disease }) {
  if (!disease) {
    return EmptyState({ title: t("noData"), message: t("diseases") });
  }

  const title = cleanDiseaseTitle(disease?.title) || "-";
  const species = asArray(disease.species).map((sp) => `<span class="species-badge">${escapeHtml(sp)}</span>`).join("");

  return `
    <section class="detail-topbar card border-0 d-flex align-items-center justify-content-between">
      <a class="back-btn" href="#/diseases"><i class="bi bi-arrow-left"></i> ${t("back")}</a>
      <button class="fav-btn" type="button" aria-label="favorite"><i class="bi bi-bookmark"></i></button>
    </section>

    ${heroImage(disease, title)}

    <section class="detail-summary card border-0">
      <h2>${escapeHtml(title)}</h2>
      <div class="species-badges">${species || `<span class="muted">-</span>`}</div>
    </section>

    ${section(t("clinicalSigns"), disease.clinical_signs, "bi-activity")}
    ${section(t("lesions"), disease.lesions, "bi-bandaid")}
    ${section(t("transmission"), disease.transmission, "bi-arrow-left-right")}
    ${section(t("samples"), disease.samples, "bi-eyedropper")}
    ${section(t("treatment"), disease.treatment, "bi-capsule-pill")}
    ${section(t("generalNotes"), disease.general_notes, "bi-journal-text")}
    ${section(t("actionGuidance"), disease.actions, "bi-shield-check")}

    <section class="detail-section card border-0">
      <h3><i class="bi bi-link-45deg"></i> ${t("sources")}</h3>
      <p class="sources-text">${formatSources(disease.source_pages) || "-"}</p>
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-images"></i> ${t("openImage")}</h3>
      ${ImageGallery({ images: disease.images })}
    </section>
  `;
}
