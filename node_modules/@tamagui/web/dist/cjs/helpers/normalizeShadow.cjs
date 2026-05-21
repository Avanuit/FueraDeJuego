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
var normalizeShadow_exports = {};
__export(normalizeShadow_exports, {
  normalizeShadow: () => normalizeShadow
});
module.exports = __toCommonJS(normalizeShadow_exports);
var import_defaultOffset = require("./defaultOffset.cjs");
function normalizeShadow({
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius
}) {
  const {
    height,
    width
  } = shadowOffset || import_defaultOffset.defaultOffset;
  return {
    shadowOffset: {
      width: width || 0,
      height: height || 0
    },
    shadowRadius: shadowRadius || 0,
    // pass color through as-is, opacity applied via color-mix in getCSSStylesAtomic
    shadowColor,
    // default to 1 if not specified (color-mix will handle the opacity)
    shadowOpacity: shadowOpacity ?? 1
  };
}