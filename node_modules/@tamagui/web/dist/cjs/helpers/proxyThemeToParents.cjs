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
var proxyThemeToParents_exports = {};
__export(proxyThemeToParents_exports, {
  proxyThemeToParents: () => proxyThemeToParents,
  proxyThemesToParents: () => proxyThemesToParents
});
module.exports = __toCommonJS(proxyThemeToParents_exports);
const themesRaw = {};
function proxyThemesToParents(dedupedThemes) {
  for (const {
    names,
    theme
  } of dedupedThemes) {
    for (const name of names) {
      themesRaw[name] = theme;
    }
  }
  const themes = {};
  for (const {
    names,
    theme
  } of dedupedThemes) {
    for (const themeName of names) {
      const proxiedTheme = proxyThemeToParents(themeName, theme);
      themes[themeName] = proxiedTheme;
    }
  }
  return themes;
}
function proxyThemeToParents(themeName, theme) {
  const out = {};
  const cur = [];
  const parents = themeName.split("_").slice(0, -1).map(part => {
    cur.push(part);
    return cur.join("_");
  });
  for (const parent of parents) {
    Object.assign(out, themesRaw[parent]);
  }
  Object.assign(out, theme);
  return out;
}