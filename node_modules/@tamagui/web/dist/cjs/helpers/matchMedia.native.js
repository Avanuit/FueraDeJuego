"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod);
var matchMedia_native_exports = {};
__export(matchMedia_native_exports, {
  matchMedia: () => matchMedia,
  setupMatchMedia: () => setupMatchMedia
});
module.exports = __toCommonJS(matchMedia_native_exports);
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
//# sourceMappingURL=matchMedia.native.js.map
