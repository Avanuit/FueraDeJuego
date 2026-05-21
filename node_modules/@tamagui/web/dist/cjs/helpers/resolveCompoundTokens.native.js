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
var resolveCompoundTokens_exports = {};
__export(resolveCompoundTokens_exports, {
  resolveCompoundTokens: () => resolveCompoundTokens
});
module.exports = __toCommonJS(resolveCompoundTokens_exports);
var import_platformResolveValue = require("./platformResolveValue.native.js");
var compoundKeys = {
  boxShadow: true,
  textShadow: true,
  filter: true,
  backgroundImage: true,
  border: true,
  outline: true
};
function resolveCompoundTokens(key, value, styleProps, styleState) {
  if (!value.includes("$")) return value;
  if (!compoundKeys[key]) return value;
  return (0, import_platformResolveValue.platformResolveValue)(key, value, styleProps, styleState);
}
//# sourceMappingURL=resolveCompoundTokens.native.js.map
