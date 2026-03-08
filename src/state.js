const listeners = new Set();

export const state = {
  lang: "fr",
  content: null,
  loading: true,
  error: ""
};

export function setState(patch) {
  Object.assign(state, patch);
  listeners.forEach((listener) => listener(state));
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
