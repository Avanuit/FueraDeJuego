var mediaState =
// development only safeguard
process.env.NODE_ENV === "development" ? new Proxy({}, {
  get(target, key) {
    if (typeof key === "string" && key[0] === "$" &&
    // dont error on $$typeof
    key[1] !== "$") {
      throw new Error(`Access mediaState should not use "$": ${key}`);
    }
    return Reflect.get(target, key);
  }
}) : {};
var setMediaState = function (next) {
  mediaState = next;
};
var mediaQueryConfig = {};
var getMedia = function () {
  return mediaState;
};
var mediaKeys = /* @__PURE__ */new Set();
export { getMedia, mediaKeys, mediaQueryConfig, mediaState, setMediaState };
//# sourceMappingURL=mediaState.native.js.map
