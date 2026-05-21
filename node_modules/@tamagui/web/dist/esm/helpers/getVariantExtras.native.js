import { getSetting } from "../config.native.js";
import { getVariableValue } from "../createVariable.native.js";
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
      return getVariableValue(styleState.fontFamily || styleState.props.fontFamily) || props.fontFamily || getVariableValue(getSetting("defaultFont"));
    },
    get font() {
      return fonts[this.fontFamily] || (!props.fontFamily || props.fontFamily[0] === "$" ? fonts[getSetting("defaultFont") || ""] : void 0);
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
export { getFontsForLanguage, getVariantExtras };
//# sourceMappingURL=getVariantExtras.native.js.map
