export function LanguageSwitch(lang) {
  return `
    <div class="lang-switch d-flex align-items-center" role="group" aria-label="Language switch">
      <button class="lang-btn ${lang === "fr" ? "active" : ""}" data-lang="fr" type="button">FR</button>
      <button class="lang-btn ${lang === "ar" ? "active" : ""}" data-lang="ar" type="button">AR</button>
    </div>
  `;
}
