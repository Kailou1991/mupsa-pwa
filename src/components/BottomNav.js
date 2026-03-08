import { t } from "../i18n";

function activeClass(route, section) {
  if (section === "home") return route === "home" ? "active" : "";
  if (section === "diseases") return route === "diseases" || route === "disease" ? "active" : "";
  if (section === "procedures") return route === "procedures" || route === "procedure" ? "active" : "";
  if (section === "symptoms") return route === "symptoms" || route === "symptom" ? "active" : "";
  if (section === "search") return route === "search" ? "active" : "";
  return "";
}

export function BottomNav(route) {
  return `
    <nav class="bottom-nav" aria-label="Navigation principale">
      <a href="#/home" class="bottom-nav-item ${activeClass(route, "home")}">
        <i class="bi bi-house-door"></i>
        <span>${t("home")}</span>
      </a>
      <a href="#/diseases" class="bottom-nav-item ${activeClass(route, "diseases")}">
        <i class="bi bi-shield-plus"></i>
        <span>${t("diseases")}</span>
      </a>
      <a href="#/procedures" class="bottom-nav-item ${activeClass(route, "procedures")}">
        <i class="bi bi-clipboard2-pulse"></i>
        <span>${t("procedures")}</span>
      </a>
      <a href="#/symptoms" class="bottom-nav-item ${activeClass(route, "symptoms")}">
        <i class="bi bi-activity"></i>
        <span>${t("symptoms")}</span>
      </a>
      <a href="#/search" class="bottom-nav-item ${activeClass(route, "search")}">
        <i class="bi bi-search"></i>
        <span>${t("search")}</span>
      </a>
    </nav>
  `;
}
