import { CardDisease } from "../components/CardDisease";
import { EmptyState } from "../components/EmptyState";
import { SearchBar } from "../components/SearchBar";
import { SpeciesFilter } from "../components/SpeciesFilter";
import { excerptFromList, getCoverImage, getSpeciesOptions } from "../data";
import { t } from "../i18n";

export function DiseasesView({ content, diseaseQuery = "", speciesFilter = "all" }) {
  const diseases = Array.isArray(content?.diseases) ? content.diseases : [];
  const q = diseaseQuery.trim().toLowerCase();

  const filtered = diseases.filter((disease) => {
    const bySpecies =
      speciesFilter === "all" ||
      (Array.isArray(disease?.species) &&
        disease.species.some((sp) => String(sp || "").toLowerCase() === speciesFilter.toLowerCase()));

    const byQuery = !q || JSON.stringify(disease || {}).toLowerCase().includes(q);
    return bySpecies && byQuery;
  });

  const controls = `
    <section class="view-head card border-0">
      <h2 class="view-title">${t("diseases")}</h2>
      <div class="d-flex flex-column gap-2">
        ${SearchBar({
          id: "disease-search",
          value: diseaseQuery,
          placeholder: t("diseaseSearchPlaceholder"),
          label: t("diseaseSearchPlaceholder")
        })}
        ${SpeciesFilter({ selected: speciesFilter, options: getSpeciesOptions(diseases) })}
      </div>
    </section>
  `;

  if (!filtered.length) {
    return `${controls}${EmptyState({ title: t("noResults"), message: t("diseases") })}`;
  }

  return `
    ${controls}
    <section class="view-list d-flex flex-column gap-3">
      ${filtered
        .map((disease) =>
          CardDisease({
            disease,
            excerpt: excerptFromList(disease?.clinical_signs, 3),
            cover: getCoverImage(disease)
          })
        )
        .join("")}
    </section>
  `;
}
