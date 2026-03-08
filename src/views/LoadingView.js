import { t } from "../i18n";

export function LoadingView() {
  return `
    <section class="state-view card border-0">
      <div class="spinner-border text-success" role="status" aria-hidden="true"></div>
      <p>${t("loading")}</p>
    </section>
  `;
}
