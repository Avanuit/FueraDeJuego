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
var getCSSStylesAtomic_native_exports = {};
__export(getCSSStylesAtomic_native_exports, {
  getCSSStylesAtomic: () => getCSSStylesAtomic,
  getStyleAtomic: () => getStyleAtomic,
  styleToCSS: () => styleToCSS
});
module.exports = __toCommonJS(getCSSStylesAtomic_native_exports);
var empty = function () {
  console.warn("no-op native");
};
var getCSSStylesAtomic = empty;
var getStyleAtomic = empty;
var styleToCSS = empty;
//# sourceMappingURL=getCSSStylesAtomic.native.js.map
