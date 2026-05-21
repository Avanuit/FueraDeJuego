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
var normalizeShadow_native_exports = {};
__export(normalizeShadow_native_exports, {
  normalizeShadow: () => normalizeShadow
});
module.exports = __toCommonJS(normalizeShadow_native_exports);
var import_defaultOffset = require("./defaultOffset.native.js");
var import_normalizeColor = require("./normalizeColor.native.js");
function normalizeShadow(param) {
  var {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius
  } = param;
  var _getRgba;
  var {
    height,
    width
  } = shadowOffset || import_defaultOffset.defaultOffset;
  return {
    shadowOffset: {
      width: width || 0,
      height: height || 0
    },
    shadowRadius: shadowRadius || 0,
    shadowColor: (0, import_normalizeColor.normalizeColor)(shadowColor, 1),
    shadowOpacity: shadowOpacity !== null && shadowOpacity !== void 0 ? shadowOpacity : shadowColor ? (_getRgba = (0, import_normalizeColor.getRgba)(shadowColor)) === null || _getRgba === void 0 ? void 0 : _getRgba.a : 1
  };
}
//# sourceMappingURL=normalizeShadow.native.js.map
