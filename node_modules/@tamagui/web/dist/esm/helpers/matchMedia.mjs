const matchMedia = typeof window !== "undefined" && window.matchMedia || matchMediaFallback;
function matchMediaFallback(_) {
  return {
    match: (a, b) => false,
    addListener() {},
    removeListener() {},
    matches: false
  };
}
function setupMatchMedia(_) {}
export { matchMedia, setupMatchMedia };
//# sourceMappingURL=matchMedia.mjs.map
