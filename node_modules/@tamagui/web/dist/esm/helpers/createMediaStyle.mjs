import { getSetting } from "../config.mjs";
import { mediaObjectToString } from "./mediaObjectToString.mjs";
import { getGroupPropParts } from "./getGroupPropParts.mjs";
const MEDIA_SEP = "_";
let prefixes = null;
let selectors = null;
function resetMediaStyleCache() {
  prefixes = null;
  selectors = null;
}
const groupPseudoToPseudoCSSMap = {
  press: "active",
  focusVisible: "focus-visible",
  focusWithin: "focus-within"
};
const specificities = new Array(12).fill(0).map((_, i) => new Array(i).fill(":root").join(""));
function getThemeOrGroupSelector(name, styleInner, isGroup, groupParts, isTheme = false, precedenceImportancePrefix = "") {
  const selectorStart = styleInner.lastIndexOf(":root") + 5;
  const selectorEnd = styleInner.lastIndexOf("{");
  const selector = styleInner.slice(selectorStart, selectorEnd);
  const precedenceSpace = getSetting("addThemeClassName") !== false && isTheme ? "" : " ";
  const pseudoSelectorName = groupParts.pseudo ? groupPseudoToPseudoCSSMap[groupParts.pseudo] || groupParts.pseudo : void 0;
  const pseudoSelector = pseudoSelectorName ? `:${pseudoSelectorName}` : "";
  const presedencePrefix = `:root${precedenceImportancePrefix}${precedenceSpace}`;
  const mediaSelector = `.t_${isGroup ? "group_" : ""}${name}${pseudoSelector}`;
  return [selector, `${presedencePrefix}${mediaSelector} ${selector.replaceAll(":root", "")}`];
}
const createMediaStyle = (styleObject, mediaKeyIn, mediaQueries, type, negate, priority) => {
  const [property,, identifier, pseudoIn, rules] = styleObject;
  const isTheme = type === "theme";
  const isPlatform = type === "platform";
  const isGroup = type === "group";
  const isNonWindowMedia = isTheme || isPlatform || isGroup;
  const negKey = negate ? "0" : "";
  const ogPrefix = identifier.slice(0, identifier.indexOf("-") + 1);
  const id = `${ogPrefix}${MEDIA_SEP}${mediaKeyIn.replace("-", "")}${negKey}${MEDIA_SEP}`;
  let styleRule = "";
  let groupPriority = "";
  let groupMediaKey;
  let containerName;
  let nextIdentifier = identifier.replace(ogPrefix, id);
  let styleInner = rules.map(rule => rule.replaceAll(identifier, nextIdentifier)).join(";");
  let isHover = false;
  if (isNonWindowMedia) {
    let specificity = (priority || 0) + (isGroup || isPlatform ? 1 : 0);
    if (isTheme || isGroup) {
      const groupParts = getGroupPropParts(isTheme ? "theme-" + mediaKeyIn : mediaKeyIn);
      const {
        name,
        media,
        pseudo
      } = groupParts;
      groupMediaKey = media;
      if (isGroup) {
        containerName = name;
      }
      if (pseudo === "press" || pseudoIn === "active") {
        specificity += 2;
      }
      if (pseudo === "hover") {
        isHover = true;
      }
      const [selector, nextSelector] = getThemeOrGroupSelector(name, styleInner, isGroup, groupParts, isTheme, specificities[specificity]);
      styleRule = styleInner.replace(selector, nextSelector);
    } else {
      const prefix = specificities[specificity];
      styleRule = prefix && styleInner[0] === "@" ? styleInner.replace("{", `{${prefix}`) : `${prefix}${styleInner}`;
    }
  }
  if (!isNonWindowMedia || groupMediaKey) {
    if (!selectors) {
      const mediaKeys = Object.keys(mediaQueries);
      selectors = Object.fromEntries(mediaKeys.map(key => [key, mediaObjectToString(mediaQueries[key])]));
      prefixes = Object.fromEntries(mediaKeys.map((k, index) => [k, new Array(index + 1).fill(":root").join("")]));
    }
    const mediaKey = groupMediaKey || mediaKeyIn;
    const mediaSelector = selectors[mediaKey];
    const screenStr = negate ? "not all and " : "";
    const mediaQuery = `${screenStr}${mediaSelector}`;
    const precedenceImportancePrefix = groupMediaKey ? groupPriority : prefixes[mediaKey];
    const prefix = groupMediaKey ? `@container ${containerName}` : "@media";
    if (groupMediaKey) {
      styleInner = styleRule;
    }
    if (styleInner.includes(prefix)) {
      styleRule = styleInner.replace("{", ` and ${mediaQuery} {`).replace(`and screen and`, `and`);
    } else {
      styleRule = `${prefix} ${mediaQuery}{${precedenceImportancePrefix}${styleInner}}`;
    }
    if (groupMediaKey) {
      styleRule = `@supports (contain: ${getSetting("webContainerType") || "inline-size"}) {${styleRule}}`;
    }
  }
  if (isHover) {
    styleRule = `@media (hover:hover){${styleRule}}`;
  }
  return [property, void 0, nextIdentifier, void 0, [styleRule]];
};
export { MEDIA_SEP, createMediaStyle, resetMediaStyleCache };
//# sourceMappingURL=createMediaStyle.mjs.map
