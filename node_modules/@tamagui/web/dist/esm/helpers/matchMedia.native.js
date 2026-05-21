var matchMediaImpl = matchMediaFallback;
var matchMedia = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return matchMediaImpl(...args);
};
function matchMediaFallback(query) {
  if (!process.env.IS_STATIC && process.env.NODE_ENV === "development") {
    console.warn("warning: matchMedia implementation is not provided.");
  }
  return {
    match: function (a, b) {
      return false;
    },
    addListener: function () {},
    removeListener: function () {},
    matches: false
  };
}
function setupMatchMedia(_) {
  if (process.env.NODE_ENV === "development") {
    if (typeof _ !== "function") {
      if (!process.env.IS_STATIC) {
        console.trace(`setupMatchMedia was called without a function, this can cause issues on native`, _);
      }
    }
  }
  matchMediaImpl = _;
  globalThis["matchMedia"] = _;
}
export { matchMedia, setupMatchMedia };
//# sourceMappingURL=matchMedia.native.js.map
