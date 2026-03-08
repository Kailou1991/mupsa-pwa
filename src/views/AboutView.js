import { t } from "../i18n";

export function AboutView({ manifest, content }) {
  const lang = content?.lang || "fr";
  const summary = manifest?.[lang] || {};

  return `
    <section class="panel card stack">
      <h2>${t("about")}</h2>
      <p>${t("fieldGuide")}</p>
      <div class="home-logos">
        <img src="/logo/omsa.png" alt="OMSA" class="logo-large" onerror="this.style.display='none'" />
        <img src="/logo/praps.jpg" alt="PRAPS" class="logo-large" onerror="this.style.display='none'" />
      </div>
      <p><strong>Version:</strong> 1.0.0</p>
      <p><strong>${t("offlineReady")}</strong></p>
      <p>${t("installHint")}</p>
      <p class="muted">Maladies: ${summary?.diseases ?? "-"} | Procedures: ${summary?.procedures ?? "-"} | Symptomes: ${summary?.symptom_maps ?? "-"}</p>
    </section>
  `;
}
