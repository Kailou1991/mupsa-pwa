import { t } from "../i18n";
import { escapeHtml } from "../utils";

export function SpeciesFilter({ selected = "all", options = [] }) {
  return `
    <label class="filter-shell" for="species-filter">
      <span class="filter-label">${t("species")}</span>
      <select id="species-filter" class="form-select species-select">
        <option value="all" ${selected === "all" ? "selected" : ""}>${t("allSpecies")}</option>
        ${options
          .map(
            (sp) =>
              `<option value="${escapeHtml(sp)}" ${selected === sp ? "selected" : ""}>${escapeHtml(sp)}</option>`
          )
          .join("")}
      </select>
    </label>
  `;
}
