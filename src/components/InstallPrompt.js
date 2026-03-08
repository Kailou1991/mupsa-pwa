import { t } from "../i18n";

export function InstallPrompt({ available = false, installed = false, showFallback = false }) {
  if (installed) return "";

  if (available) {
    return `
      <section class="install-banner card border-0" aria-label="pwa-install-banner">
        <div class="install-banner-body">
          <div class="install-banner-copy">
            <i class="bi bi-phone-vibrate"></i>
            <p class="mb-0">${t("installCta")}</p>
          </div>
          <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-success btn-sm" data-install-app>${t("installButton")}</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" data-install-dismiss>${t("close")}</button>
          </div>
        </div>
      </section>
    `;
  }

  if (showFallback) {
    return `
      <section class="install-hint card border-0" aria-label="pwa-install-hint">
        <div class="install-banner-copy">
          <i class="bi bi-download"></i>
          <p class="mb-0">${t("installHint")}</p>
        </div>
      </section>
    `;
  }

  return "";
}
