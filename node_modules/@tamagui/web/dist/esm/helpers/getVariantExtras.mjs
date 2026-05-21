import { getSetting } from "../config.mjs";
import { getVariableValue } from "../createVariable.mjs";
const cache = /* @__PURE__ */new WeakMap();
const getVariantExtras = styleState => {
  if (cache.has(styleState)) {
    return cache.get(styleState);
  }
  const {
    props,
    conf,
    context,
    theme,
    styleProps
  } = styleState;
  const styledContext = styleProps.styledContext;
  let fonts = conf.fontsParsed;
  if (context?.language) {
    fonts = getFontsForLanguage(conf.fontsParsed, context.language);
  }
  const next = {
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
const fontLanguageCache = /* @__PURE__ */new WeakMap();
function getFontsForLanguage(fonts, language) {
  if (fontLanguageCache.has(language)) {
    return fontLanguageCache.get(language);
  }
  const next = {
    ...fonts,
    ...Object.fromEntries(Object.entries(language).flatMap(([name, lang]) => {
      if (lang === "default") {
        return [];
      }
      const langKey = `$${name}_${lang}`;
      return [[`$${name}`, fonts[langKey]]];
    }))
  };
  fontLanguageCache.set(language, next);
  return next;
}
export { getFontsForLanguage, getVariantExtras };
//# sourceMappingURL=getVariantExtras.mjs.map
