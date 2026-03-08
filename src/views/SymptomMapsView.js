import { CardSymptomMap } from "../components/CardSymptomMap";
import { EmptyState } from "../components/EmptyState";
import { SearchBar } from "../components/SearchBar";
import { t } from "../i18n";

export function SymptomMapsView({ content, query = "" }) {
  const list = Array.isArray(content?.symptom_maps) ? content.symptom_maps : [];
  const q = query.trim().toLowerCase();
  const filtered = list.filter((s) => !q || JSON.stringify(s || {}).toLowerCase().includes(q));

  const top = `
    <section class="view-head card border-0">
      <h2 class="view-title">${t("symptoms")}</h2>
      ${SearchBar({ id: "symptom-search", value: query, placeholder: t("symptomSearchPlaceholder") })}
    </section>
  `;

  if (!filtered.length) {
    return `${top}${EmptyState({ title: t("noResults"), message: t("symptoms") })}`;
  }

  return `
    ${top}
    <section class="view-list d-flex flex-column gap-3">
      ${filtered.map((symptom) => CardSymptomMap({ symptom })).join("")}
    </section>
  `;
}
