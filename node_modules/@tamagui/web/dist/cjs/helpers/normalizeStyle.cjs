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
var normalizeStyle_exports = {};
__export(normalizeStyle_exports, {
  normalizeStyle: () => normalizeStyle
});
module.exports = __toCommonJS(normalizeStyle_exports);
var import_expandStyle = require("./expandStyle.cjs");
var import_expandStyles = require("./expandStyles.cjs");
var import_isObj = require("./isObj.cjs");
var import_normalizeValueWithProperty = require("./normalizeValueWithProperty.cjs");
var import_pseudoDescriptors = require("./pseudoDescriptors.cjs");
function normalizeStyle(style, disableNormalize = false) {
  const res = {};
  for (let key in style) {
    const prop = style[key];
    if (prop == null) continue;
    if (key in import_pseudoDescriptors.pseudoDescriptors ||
    // this should capture all parent-based styles like media, group, etc
    key[0] === "$" && (0, import_isObj.isObj)(prop)) {
      res[key] = normalizeStyle(prop, disableNormalize);
      continue;
    }
    const value = disableNormalize ? prop : (0, import_normalizeValueWithProperty.normalizeValueWithProperty)(prop, key);
    const out = (0, import_expandStyle.expandStyle)(key, value);
    if (out) {
      Object.assign(res, Object.fromEntries(out));
    } else {
      res[key] = value;
    }
  }
  (0, import_expandStyles.fixStyles)(res);
  return res;
}