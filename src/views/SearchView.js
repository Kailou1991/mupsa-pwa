import { CardDisease } from "../components/CardDisease";
import { CardProcedure } from "../components/CardProcedure";
import { CardSymptomMap } from "../components/CardSymptomMap";
import { EmptyState } from "../components/EmptyState";
import { SearchBar } from "../components/SearchBar";
import { excerptFromList, getCoverImage, searchAll } from "../data";
import { t } from "../i18n";

export function SearchView({ content, query = "" }) {
  const q = query.trim();
  const top = `
    <section class="view-head card border-0">
      <h2 class="view-title">${t("search")}</h2>
      ${SearchBar({
        id: "global-search",
        value: query,
        placeholder: t("searchPlaceholder"),
        label: t("searchPlaceholder")
      })}
    </section>
  `;

  if (!q) {
    return `${top}${EmptyState({ title: t("search"), message: t("searchPlaceholder") })}`;
  }

  const results = searchAll(content, q);
  const total = results.diseases.length + results.procedures.length + results.symptom_maps.length;

  if (!total) {
    return `${top}${EmptyState({ title: t("noResults"), message: q })}`;
  }

  return `
    ${top}

    <section class="result-group card border-0">
      <h3>${t("groupedDiseases")} <span class="chip chip-cream">${results.diseases.length}</span></h3>
      <div class="d-flex flex-column gap-3">
        ${results.diseases
          .map((disease) =>
            CardDisease({
              disease,
              excerpt: excerptFromList(disease?.clinical_signs, 3),
              cover: getCoverImage(disease)
            })
          )
          .join("") || `<p class="muted">${t("noResults")}</p>`}
      </div>
    </section>

    <section class="result-group card border-0">
      <h3>${t("groupedProcedures")} <span class="chip chip-blue">${results.procedures.length}</span></h3>
      <div class="d-flex flex-column gap-3">
        ${results.procedures
          .map((procedure) =>
            CardProcedure({
              procedure,
              cover: getCoverImage(procedure),
              summary: (procedure?.content || []).slice(0, 2).join(" ")
            })
          )
          .join("") || `<p class="muted">${t("noResults")}</p>`}
      </div>
    </section>

    <section class="result-group card border-0">
      <h3>${t("groupedSymptoms")} <span class="chip chip-sand">${results.symptom_maps.length}</span></h3>
      <div class="d-flex flex-column gap-3">
        ${results.symptom_maps.map((symptom) => CardSymptomMap({ symptom })).join("") || `<p class="muted">${t("noResults")}</p>`}
      </div>
    </section>
  `;
}
