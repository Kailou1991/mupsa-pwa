import { LanguageSwitch } from "./LanguageSwitch";

export function Header(lang) {
  return `
    <header class="mupsa-header">
      <div class="mupsa-header-top"></div>
      <div class="mupsa-header-bar card border-0">
        <div class="mupsa-header-logos" aria-label="Institutions partenaires">
          <img src="/logo/omsa.png" alt="OMSA" onerror="this.style.display='none'" />
          <img src="/logo/praps.jpg" alt="PRAPS" onerror="this.style.display='none'" />
        </div>
        ${LanguageSwitch(lang)}
      </div>
    </header>
  `;
}
