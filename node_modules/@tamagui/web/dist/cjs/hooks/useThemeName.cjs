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
var useThemeName_exports = {};
__export(useThemeName_exports, {
  useThemeName: () => useThemeName
});
module.exports = __toCommonJS(useThemeName_exports);
var import_useThemeState = require("./useThemeState.cjs");
const forceUpdateState = {
  forceClassName: true,
  deopt: true,
  needsUpdate: () => true
};
const forceKeys = {
  current: /* @__PURE__ */new Set([""])
};
function useThemeName() {
  return (0, import_useThemeState.useThemeState)(forceUpdateState, false, forceKeys)?.name || "";
}