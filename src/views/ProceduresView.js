import { CardProcedure } from "../components/CardProcedure";
import { EmptyState } from "../components/EmptyState";
import { SearchBar } from "../components/SearchBar";
import { getCoverImage } from "../data";
import { t } from "../i18n";

export function ProceduresView({ content, query = "" }) {
  const list = Array.isArray(content?.procedures) ? content.procedures : [];
  const q = query.trim().toLowerCase();
  const filtered = list.filter((p) => !q || JSON.stringify(p || {}).toLowerCase().includes(q));

  const top = `
    <section class="view-head card border-0">
      <h2 class="view-title">${t("procedures")}</h2>
      ${SearchBar({ id: "procedure-search", value: query, placeholder: t("procedureSearchPlaceholder") })}
    </section>
  `;

  if (!filtered.length) {
    return `${top}${EmptyState({ title: t("noResults"), message: t("procedures") })}`;
  }

  return `
    ${top}
    <section class="view-list d-flex flex-column gap-3">
      ${filtered
        .map((procedure) =>
          CardProcedure({
            procedure,
            cover: getCoverImage(procedure),
            summary: (procedure?.content || []).slice(0, 2).join(" ") || "-"
          })
        )
        .join("")}
    </section>
  `;
}
