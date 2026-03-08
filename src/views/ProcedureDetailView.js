import { EmptyState } from "../components/EmptyState";
import { ImageGallery } from "../components/ImageGallery";
import { t } from "../i18n";
import { asArray, escapeHtml, formatSources, renderList } from "../utils";
import { cleanText } from "../utils/textCleaner";

function normalizeLine(value) {
  return cleanText(String(value || ""))
    .replaceAll("diagnostic_or_field_procedure", "Procédure de terrain")
    .replaceAll("_", " ")
    .replaceAll(/\s+/g, " ")
    .trim();
}

function isPointsOnlyLine(line) {
  return /^(?:\.\s*){3,}$/.test(String(line || "").trim());
}

export function ProcedureDetailView({ procedure }) {
  if (!procedure) {
    return EmptyState({ title: t("noData"), message: t("procedures") });
  }

  const content = asArray(procedure.content)
    .map((line) => normalizeLine(line))
    .filter((line) => line && !isPointsOnlyLine(line));

  const images = asArray(procedure.images);
  const heroSrc = images[0]?.file || images[0]?.thumb || "";

  return `
    <section class="detail-topbar card border-0 d-flex align-items-center justify-content-between">
      <a class="back-btn" href="#/procedures"><i class="bi bi-arrow-left"></i> ${t("back")}</a>
      <span class="chip chip-blue"><i class="bi bi-clipboard2-pulse"></i> ${escapeHtml(procedure.section || "Procédure")}</span>
    </section>

    ${heroSrc ? `<section class="hero-image card border-0"><img src="${escapeHtml(heroSrc)}" alt="${escapeHtml(procedure.title || "")}" loading="lazy" /></section>` : ""}

    <section class="detail-summary card border-0">
      <h2>${escapeHtml(procedure.title || "-")}</h2>
      <p class="muted mb-0">${escapeHtml(procedure.section || "")}</p>
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-list-check"></i> ${t("content")}</h3>
      ${content.length ? `<ul class="detail-list">${renderList(content)}</ul>` : `<p>-</p>`}
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-link-45deg"></i> ${t("sources")}</h3>
      <p class="sources-text">${formatSources(procedure.source_pages) || "-"}</p>
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-images"></i> ${t("openImage")}</h3>
      ${ImageGallery({ images: procedure.images })}
    </section>
  `;
}
