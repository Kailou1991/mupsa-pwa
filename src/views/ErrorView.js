import { t } from "../i18n";

export function ErrorView(message) {
  return `
    <section class="state-view card border-0 error-view">
      <div class="state-icon"><i class="bi bi-exclamation-triangle"></i></div>
      <h3>${t("error")}</h3>
      <p>${message || ""}</p>
    </section>
  `;
}
