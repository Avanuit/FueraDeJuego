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
var platformResolveValue_native_exports = {};
__export(platformResolveValue_native_exports, {
  platformResolveValue: () => platformResolveValue
});
module.exports = __toCommonJS(platformResolveValue_native_exports);
var import_getTokenForKey = require("./getTokenForKey.native.js");
var import_parseNativeStyle = require("./parseNativeStyle.native.js");
var tokenPattern = /(\$[\w.-]+)/g;
var nativeParseKeys = {
  backgroundImage: true,
  boxShadow: true,
  textShadow: true
};
function replaceTokens(value, styleProps, styleState) {
  return value.replace(tokenPattern, function (t) {
    var r = (0, import_getTokenForKey.getTokenForKey)("size", t, styleProps, styleState);
    if (r == null) {
      r = (0, import_getTokenForKey.getTokenForKey)("color", t, styleProps, styleState);
    }
    return r != null ? String(r) : t;
  });
}
function platformResolveValue(key, value, styleProps, styleState) {
  if (!nativeParseKeys[key]) {
    return replaceTokens(value, styleProps, styleState);
  }
  var effectiveStyleProps = key === "backgroundImage" ? {
    ...styleProps,
    resolveValues: "web"
  } : styleProps;
  var tokenMap = /* @__PURE__ */new Map();
  var placeholderIdx = 0;
  var withPlaceholders = value.replace(tokenPattern, function (t) {
    var r = (0, import_getTokenForKey.getTokenForKey)("size", t, effectiveStyleProps, styleState);
    if (r == null) {
      r = (0, import_getTokenForKey.getTokenForKey)("color", t, effectiveStyleProps, styleState);
    }
    if (r == null) return t;
    if (typeof r !== "string" && typeof r !== "number") {
      var placeholder = `__tk${placeholderIdx++}__`;
      tokenMap.set(placeholder, r);
      return placeholder;
    }
    return String(r);
  });
  var parsed = (0, import_parseNativeStyle.parseNativeStyle)(key, withPlaceholders, tokenMap);
  if (parsed) return parsed;
  return replaceTokens(value, styleProps, styleState);
}
//# sourceMappingURL=platformResolveValue.native.js.map
