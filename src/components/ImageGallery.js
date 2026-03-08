import { t } from "../i18n";
import { asArray, escapeHtml } from "../utils";

export function ImageGallery({ images = [] }) {
  const list = asArray(images);
  if (!list.length) {
    return `<div class="empty-inline">${t("noData")}</div>`;
  }

  return `
    <section class="gallery-grid">
      ${list
        .map(
          (img, idx) => `
        <button class="gallery-item" data-gallery-open="${escapeHtml(img.file || img.thumb || "")}" data-gallery-alt="${escapeHtml(img.image_id || `img-${idx}`)}" type="button">
          <img src="${escapeHtml(img.thumb || img.file || "")}" alt="${escapeHtml(img.image_id || `image-${idx}`)}" loading="lazy" />
        </button>
      `
        )
        .join("")}
    </section>

    <div class="media-modal" id="image-modal" hidden>
      <div class="media-modal-backdrop" data-gallery-close></div>
      <div class="media-modal-panel">
        <button class="btn close-modal-btn" data-gallery-close type="button">
          <i class="bi bi-x-lg"></i> ${t("close")}
        </button>
        <img id="image-modal-content" src="" alt="" />
      </div>
    </div>
  `;
}
