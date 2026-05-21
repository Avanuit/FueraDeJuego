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
var themes_exports = {};
__export(themes_exports, {
  ensureThemeVariable: () => ensureThemeVariable
});
module.exports = __toCommonJS(themes_exports);
var import_createVariable = require("../createVariable.cjs");
function ensureThemeVariable(theme, key) {
  const val = theme[key];
  if (!(0, import_createVariable.isVariable)(val)) {
    theme[key] = (0, import_createVariable.createVariable)({
      key,
      name: key,
      val
    });
  } else {
    if (val.name !== key) {
      theme[key] = (0, import_createVariable.createVariable)({
        key: val.name,
        name: key,
        val: val.val
      });
    }
  }
}