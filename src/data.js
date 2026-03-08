import { cleanText } from "./utils/textCleaner";

const cache = {
  fr: null,
  ar: null
};

let currentLang = "fr";

function normalizePath(path) {
  if (!path || typeof path !== "string") return "";
  const p = path.replaceAll("\\", "/");
  if (p.startsWith("output/images/")) return `/${p.replace("output/images/", "images/")}`;
  if (p.startsWith("output/thumbs/")) return `/${p.replace("output/thumbs/", "thumbs/")}`;
  return p.startsWith("/") ? p : `/${p}`;
}

function cleanTextField(value) {
  return cleanText(String(value ?? ""));
}

function cleanTextList(value) {
  return (Array.isArray(value) ? value : [])
    .map((entry) => cleanTextField(entry))
    .filter(Boolean);
}

function cleanLikelyDiseases(value) {
  return cleanTextList(value).filter((entry) => {
    const lower = entry.toLowerCase();
    return !lower.includes("mesures") && !lower.includes("recommandations") && !lower.includes("mupsa");
  });
}

function cleanDisease(item = {}) {
  return {
    ...item,
    title: cleanTextField(item.title),
    summary: cleanTextField(item.summary),
    content: cleanTextList(item.content),
    notes: cleanTextList(item.notes),
    clinical_signs: cleanTextList(item.clinical_signs),
    lesions: cleanTextList(item.lesions)
  };
}

function cleanProcedure(item = {}) {
  return {
    ...item,
    title: cleanTextField(item.title),
    summary: cleanTextField(item.summary),
    content: cleanTextList(item.content),
    notes: cleanTextList(item.notes),
    clinical_signs: cleanTextList(item.clinical_signs),
    lesions: cleanTextList(item.lesions)
  };
}

function cleanSymptomMap(item = {}) {
  return {
    ...item,
    title: cleanTextField(item.title),
    symptom_title: cleanTextField(item.symptom_title),
    summary: cleanTextField(item.summary),
    content: cleanTextList(item.content),
    notes: cleanTextList(item.notes),
    clinical_signs: cleanTextList(item.clinical_signs),
    lesions: cleanTextList(item.lesions),
    likely_diseases: cleanLikelyDiseases(item.likely_diseases)
  };
}

function cleanImages(items, cleaner) {
  return (Array.isArray(items) ? items : []).map((item) => {
    const cleaned = cleaner(item || {});
    return {
      ...cleaned,
      images: (Array.isArray(item?.images) ? item.images : []).map((img) => ({
        ...img,
        file: normalizePath(img?.file || ""),
        thumb: normalizePath(img?.thumb || "")
      }))
    };
  });
}

function normalizeContent(raw) {
  return {
    ...raw,
    diseases: cleanImages(raw?.diseases, cleanDisease),
    procedures: cleanImages(raw?.procedures, cleanProcedure),
    symptom_maps: cleanImages(raw?.symptom_maps, cleanSymptomMap)
  };
}

export async function loadLanguageContent(lang) {
  const selected = lang === "ar" ? "ar" : "fr";
  currentLang = selected;

  if (!cache[selected]) {
    const response = await fetch(`/data/pwa_content.${selected}.final.json`, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Impossible de charger /data/pwa_content.${selected}.final.json (${response.status})`);
    }
    const json = await response.json();
    cache[selected] = normalizeContent(json);
    console.info("[data] language loaded", selected);
  }

  return cache[selected];
}

export function excerptFromList(items, max = 3) {
  return (Array.isArray(items) ? items : [])
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .slice(0, max);
}

export function getCoverImage(item) {
  const images = Array.isArray(item?.images) ? item.images : [];
  if (!images.length) return null;

  const first = images[0];
  const thumb = first?.thumb || first?.file || "";
  const file = first?.file || first?.thumb || "";
  if (!thumb && !file) return null;

  return { thumb, file };
}

export function getSpeciesOptions(diseases = []) {
  const options = new Set();

  (Array.isArray(diseases) ? diseases : []).forEach((disease) => {
    (Array.isArray(disease?.species) ? disease.species : []).forEach((species) => {
      const value = String(species || "").trim();
      if (value) options.add(value);
    });
  });

  return [...options].sort((a, b) => a.localeCompare(b, "fr"));
}

export function searchAll(content, query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return { diseases: [], procedures: [], symptom_maps: [] };

  const selected = content || cache[currentLang] || cache.fr || cache.ar || {};
  const match = (entry) => JSON.stringify(entry || {}).toLowerCase().includes(q);

  return {
    diseases: (Array.isArray(selected.diseases) ? selected.diseases : []).filter(match),
    procedures: (Array.isArray(selected.procedures) ? selected.procedures : []).filter(match),
    symptom_maps: (Array.isArray(selected.symptom_maps) ? selected.symptom_maps : []).filter(match)
  };
}
