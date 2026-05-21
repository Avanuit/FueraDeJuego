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
var getVariantExtras_exports = {};
__export(getVariantExtras_exports, {
  getFontsForLanguage: () => getFontsForLanguage,
  getVariantExtras: () => getVariantExtras
});
module.exports = __toCommonJS(getVariantExtras_exports);
var import_config = require("../config.native.js");
var import_createVariable = require("../createVariable.native.js");
var cache = /* @__PURE__ */new WeakMap();
var getVariantExtras = function (styleState) {
  if (cache.has(styleState)) {
    return cache.get(styleState);
  }
  var {
    props,
    conf,
    context,
    theme,
    styleProps
  } = styleState;
  var styledContext = styleProps.styledContext;
  var fonts = conf.fontsParsed;
  if (context === null || context === void 0 ? void 0 : context.language) {
    fonts = getFontsForLanguage(conf.fontsParsed, context.language);
  }
  var next = {
    fonts,
    tokens: conf.tokensParsed,
    theme,
    context: styledContext,
    get fontFamily() {
      return (0, import_createVariable.getVariableValue)(styleState.fontFamily || styleState.props.fontFamily) || props.fontFamily || (0, import_createVariable.getVariableValue)((0, import_config.getSetting)("defaultFont"));
    },
    get font() {
      return fonts[this.fontFamily] || (!props.fontFamily || props.fontFamily[0] === "$" ? fonts[(0, import_config.getSetting)("defaultFont") || ""] : void 0);
    },
    props
  };
  cache.set(styleState, next);
  return next;
};
var fontLanguageCache = /* @__PURE__ */new WeakMap();
function getFontsForLanguage(fonts, language) {
  if (fontLanguageCache.has(language)) {
    return fontLanguageCache.get(language);
  }
  var next = {
    ...fonts,
    ...Object.fromEntries(Object.entries(language).flatMap(function (param) {
      var [name, lang] = param;
      if (lang === "default") {
        return [];
      }
      var langKey = `$${name}_${lang}`;
      return [[`$${name}`, fonts[langKey]]];
    }))
  };
  fontLanguageCache.set(language, next);
  return next;
}
//# sourceMappingURL=getVariantExtras.native.js.map
