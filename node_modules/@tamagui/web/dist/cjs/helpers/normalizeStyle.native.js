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
var normalizeStyle_exports = {};
__export(normalizeStyle_exports, {
  normalizeStyle: () => normalizeStyle
});
module.exports = __toCommonJS(normalizeStyle_exports);
var import_expandStyle = require("./expandStyle.native.js");
var import_expandStyles = require("./expandStyles.native.js");
var import_isObj = require("./isObj.native.js");
var import_normalizeValueWithProperty = require("./normalizeValueWithProperty.native.js");
var import_pseudoDescriptors = require("./pseudoDescriptors.native.js");
function normalizeStyle(style) {
  var disableNormalize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var res = {};
  for (var key in style) {
    var prop = style[key];
    if (prop == null) continue;
    if (key in import_pseudoDescriptors.pseudoDescriptors ||
    // this should capture all parent-based styles like media, group, etc
    key[0] === "$" && (0, import_isObj.isObj)(prop)) {
      res[key] = normalizeStyle(prop, disableNormalize);
      continue;
    }
    var value = disableNormalize ? prop : (0, import_normalizeValueWithProperty.normalizeValueWithProperty)(prop, key);
    var out = (0, import_expandStyle.expandStyle)(key, value);
    if (out) {
      Object.assign(res, Object.fromEntries(out));
    } else {
      res[key] = value;
    }
  }
  (0, import_expandStyles.fixStyles)(res);
  return res;
}
//# sourceMappingURL=normalizeStyle.native.js.map
