import { escapeHtml } from "../utils";

export function SearchBar({ id, value = "", placeholder = "", label = "" }) {
  return `
    <label class="search-shell" for="${escapeHtml(id)}">
      <span class="visually-hidden">${escapeHtml(label || placeholder)}</span>
      <i class="bi bi-search"></i>
      <input
        id="${escapeHtml(id)}"
        class="form-control search-input"
        type="search"
        value="${escapeHtml(value)}"
        placeholder="${escapeHtml(placeholder)}"
        autocomplete="off"
      />
    </label>
  `;
}
