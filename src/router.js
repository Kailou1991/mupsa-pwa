function normalize(hash) {
  return (hash || "#/home").replace(/^#/, "").trim() || "/home";
}

function matchRoute(path) {
  const clean = path.replace(/\/+$/, "") || "/home";

  if (clean === "/" || clean === "/home") return { name: "home", params: {} };
  if (clean === "/diseases") return { name: "diseases", params: {} };
  if (clean === "/procedures") return { name: "procedures", params: {} };
  if (clean === "/symptoms") return { name: "symptoms", params: {} };
  if (clean === "/search") return { name: "search", params: {} };

  const disease = clean.match(/^\/disease\/([^/]+)$/);
  if (disease) return { name: "disease", params: { id: decodeURIComponent(disease[1]) } };

  const procedure = clean.match(/^\/procedure\/([^/]+)$/);
  if (procedure) return { name: "procedure", params: { id: decodeURIComponent(procedure[1]) } };

  const symptom = clean.match(/^\/symptom\/([^/]+)$/);
  if (symptom) return { name: "symptom", params: { id: decodeURIComponent(symptom[1]) } };

  return { name: "home", params: {} };
}

export function parseRoute(hash = window.location.hash) {
  return matchRoute(normalize(hash));
}

export function initRouter(onChange) {
  const run = () => onChange(parseRoute());
  window.addEventListener("hashchange", run);
  run();
}