import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { InstallPrompt } from "./components/InstallPrompt";
import { loadLanguageContent } from "./data";
import { applyLanguage } from "./i18n";
import { initRouter } from "./router";
import { state, setState, subscribe } from "./state";
import { DiseaseDetailView } from "./views/DiseaseDetailView";
import { DiseasesView } from "./views/DiseasesView";
import { ErrorView } from "./views/ErrorView";
import { HomeView } from "./views/HomeView";
import { LoadingView } from "./views/LoadingView";
import { ProcedureDetailView } from "./views/ProcedureDetailView";
import { ProceduresView } from "./views/ProceduresView";
import { SearchView } from "./views/SearchView";
import { SymptomMapDetailView } from "./views/SymptomMapDetailView";
import { SymptomMapsView } from "./views/SymptomMapsView";

let root;
let currentRoute = { name: "home", params: {} };
const debounceTimers = new Map();
let deferredInstallPrompt = null;

const uiState = {
  diseaseQuery: "",
  speciesFilter: "all",
  procedureQuery: "",
  symptomQuery: "",
  searchQuery: ""
};

const installState = {
  available: false,
  installed: false,
  showFallback: false,
  dismissed: false
};

function detectInitialLanguage() {
  const saved = localStorage.getItem("mupsa-lang");
  if (saved === "fr" || saved === "ar") return saved;
  return navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "fr";
}

function pickById(items, id) {
  return (Array.isArray(items) ? items : []).find((item) => String(item?.id || "") === String(id || ""));
}

function isAndroidDevice() {
  return /android/i.test(navigator.userAgent || "");
}

function isStandaloneMode() {
  return window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone === true;
}

function renderView() {
  if (state.loading) return LoadingView();
  if (state.error) return ErrorView(state.error);

  const content = state.content || {};

  if (currentRoute.name === "diseases") {
    return DiseasesView({
      content,
      diseaseQuery: uiState.diseaseQuery,
      speciesFilter: uiState.speciesFilter
    });
  }

  if (currentRoute.name === "disease") {
    return DiseaseDetailView({ disease: pickById(content.diseases, currentRoute.params?.id) });
  }

  if (currentRoute.name === "procedures") {
    return ProceduresView({ content, query: uiState.procedureQuery });
  }

  if (currentRoute.name === "procedure") {
    return ProcedureDetailView({ procedure: pickById(content.procedures, currentRoute.params?.id) });
  }

  if (currentRoute.name === "symptoms") {
    return SymptomMapsView({ content, query: uiState.symptomQuery });
  }

  if (currentRoute.name === "symptom") {
    return SymptomMapDetailView({ symptom: pickById(content.symptom_maps, currentRoute.params?.id) });
  }

  if (currentRoute.name === "search") {
    return SearchView({ content, query: uiState.searchQuery });
  }

  return HomeView();
}

function render() {
  const view = renderView();
  const installBanner = InstallPrompt({
    available: installState.available && !installState.dismissed,
    installed: installState.installed,
    showFallback: installState.showFallback && !installState.dismissed
  });

  root.innerHTML = `
    <div class="mupsa-app">
      ${Header(state.lang)}
      ${installBanner}
      <main class="mupsa-main">${view}</main>
      ${BottomNav(currentRoute.name)}
    </div>
  `;
}

async function loadForLanguage(lang) {
  try {
    setState({ loading: true, error: "" });
    applyLanguage(lang);
    const content = await loadLanguageContent(lang);
    localStorage.setItem("mupsa-lang", lang);
    setState({ lang, content, loading: false, error: "" });
  } catch (error) {
    setState({ loading: false, error: error?.message || String(error) });
  }
}

function debounceState(field, value, delay = 240) {
  const timer = debounceTimers.get(field);
  if (timer) window.clearTimeout(timer);
  debounceTimers.set(
    field,
    window.setTimeout(() => {
      uiState[field] = value;
      render();
    }, delay)
  );
}

function openImageModal(src, alt) {
  const modal = root.querySelector("#image-modal");
  const content = root.querySelector("#image-modal-content");
  if (!modal || !content) return;
  content.src = src || "";
  content.alt = alt || "";
  modal.hidden = false;
}

function closeImageModal() {
  const modal = root.querySelector("#image-modal");
  const content = root.querySelector("#image-modal-content");
  if (!modal || !content) return;
  modal.hidden = true;
  content.src = "";
  content.alt = "";
}

async function runInstallPrompt() {
  if (!deferredInstallPrompt) return;

  deferredInstallPrompt.prompt();

  try {
    await deferredInstallPrompt.userChoice;
  } catch {
    // Ignore user prompt choice errors
  }

  deferredInstallPrompt = null;
  installState.available = false;
  render();
}

function initInstallEvents() {
  installState.installed = isStandaloneMode();
  installState.showFallback = !installState.installed && isAndroidDevice();

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installState.available = true;
    installState.showFallback = false;
    render();
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    installState.available = false;
    installState.installed = true;
    installState.showFallback = false;
    render();
  });
}

function bindEvents() {
  root.addEventListener("click", (event) => {
    const langBtn = event.target.closest("[data-lang]");
    if (langBtn) {
      const lang = langBtn.getAttribute("data-lang");
      if (lang && lang !== state.lang) loadForLanguage(lang);
      return;
    }

    const installBtn = event.target.closest("[data-install-app]");
    if (installBtn) {
      runInstallPrompt();
      return;
    }

    const installDismiss = event.target.closest("[data-install-dismiss]");
    if (installDismiss) {
      installState.dismissed = true;
      render();
      return;
    }

    const galleryBtn = event.target.closest("[data-gallery-open]");
    if (galleryBtn) {
      openImageModal(galleryBtn.getAttribute("data-gallery-open"), galleryBtn.getAttribute("data-gallery-alt"));
      return;
    }

    if (event.target.closest("[data-gallery-close]")) closeImageModal();
  });

  root.addEventListener("input", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;

    if (input.id === "disease-search") debounceState("diseaseQuery", input.value);
    if (input.id === "procedure-search") debounceState("procedureQuery", input.value);
    if (input.id === "symptom-search") debounceState("symptomQuery", input.value);
    if (input.id === "global-search") debounceState("searchQuery", input.value);
  });

  root.addEventListener("change", (event) => {
    const select = event.target;
    if (!(select instanceof HTMLSelectElement)) return;

    if (select.id === "species-filter") {
      uiState.speciesFilter = select.value || "all";
      render();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeImageModal();
  });
}

export function initApp(node) {
  root = node;
  initInstallEvents();
  bindEvents();
  subscribe(() => render());

  initRouter((route) => {
    currentRoute = route;
    render();
  });

  loadForLanguage(detectInitialLanguage());
}
