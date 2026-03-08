import { t } from "../i18n";

export function HomeView() {
  return `
    <section class="hero-card home-hero card border-0">
      <div class="hero-logos" aria-hidden="true">
        <img src="/logo/omsa.png" alt="" onerror="this.style.display='none'" />
        <img src="/logo/praps.jpg" alt="" onerror="this.style.display='none'" />
      </div>
      <h2 class="hero-title">MuPsA</h2>
      <p class="hero-subtitle">${t("subtitle")}</p>
    </section>

    <section class="tiles-grid row g-3">
      <div class="col-6">
        <a class="home-tile tile-beige" href="#/diseases">
          <i class="bi bi-shield-plus"></i>
          <span>${t("diseases")}</span>
        </a>
      </div>
      <div class="col-6">
        <a class="home-tile tile-green" href="#/procedures">
          <i class="bi bi-clipboard2-pulse"></i>
          <span>${t("procedures")}</span>
        </a>
      </div>
      <div class="col-6">
        <a class="home-tile tile-blue" href="#/symptoms">
          <i class="bi bi-activity"></i>
          <span>${t("symptoms")}</span>
        </a>
      </div>
      <div class="col-6">
        <a class="home-tile tile-cream" href="#/search">
          <i class="bi bi-search"></i>
          <span>${t("search")}</span>
        </a>
      </div>
    </section>
  `;
}
