import { t } from "../i18n";
import { escapeHtml } from "../utils";

export function ErrorView(message = "") {
  return `
    <section class="state-view error">
      <h2>${t("errorLoadData")}</h2>
      ${message ? `<p>${escapeHtml(message)}</p>` : ""}
    </section>
  `;
}
