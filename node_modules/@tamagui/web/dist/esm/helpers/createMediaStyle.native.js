import { getSetting } from "../config.native.js";
import { mediaObjectToString } from "./mediaObjectToString.native.js";
import { getGroupPropParts } from "./getGroupPropParts.native.js";
var MEDIA_SEP = "_";
var prefixes = null;
var selectors = null;
function resetMediaStyleCache() {
  prefixes = null;
  selectors = null;
}
var groupPseudoToPseudoCSSMap = {
  press: "active",
  focusVisible: "focus-visible",
  focusWithin: "focus-within"
};
var specificities = new Array(12).fill(0).map(function (_, i) {
  return new Array(i).fill(":root").join("");
});
function getThemeOrGroupSelector(name, styleInner, isGroup, groupParts) {
  var isTheme = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false,
    precedenceImportancePrefix = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : "";
  var selectorStart = styleInner.lastIndexOf(":root") + 5;
  var selectorEnd = styleInner.lastIndexOf("{");
  var selector = styleInner.slice(selectorStart, selectorEnd);
  var precedenceSpace = getSetting("addThemeClassName") !== false && isTheme ? "" : " ";
  var pseudoSelectorName = groupParts.pseudo ? groupPseudoToPseudoCSSMap[groupParts.pseudo] || groupParts.pseudo : void 0;
  var pseudoSelector = pseudoSelectorName ? `:${pseudoSelectorName}` : "";
  var presedencePrefix = `:root${precedenceImportancePrefix}${precedenceSpace}`;
  var mediaSelector = `.t_${isGroup ? "group_" : ""}${name}${pseudoSelector}`;
  return [selector, `${presedencePrefix}${mediaSelector} ${selector.replaceAll(":root", "")}`];
}
var createMediaStyle = function (styleObject, mediaKeyIn, mediaQueries, type, negate, priority) {
  var [property,, identifier, pseudoIn, rules] = styleObject;
  var isTheme = type === "theme";
  var isPlatform = type === "platform";
  var isGroup = type === "group";
  var isNonWindowMedia = isTheme || isPlatform || isGroup;
  var negKey = negate ? "0" : "";
  var ogPrefix = identifier.slice(0, identifier.indexOf("-") + 1);
  var id = `${ogPrefix}${MEDIA_SEP}${mediaKeyIn.replace("-", "")}${negKey}${MEDIA_SEP}`;
  var styleRule = "";
  var groupPriority = "";
  var groupMediaKey;
  var containerName;
  var nextIdentifier = identifier.replace(ogPrefix, id);
  var styleInner = rules.map(function (rule) {
    return rule.replaceAll(identifier, nextIdentifier);
  }).join(";");
  var isHover = false;
  if (isNonWindowMedia) {
    var specificity = (priority || 0) + (isGroup || isPlatform ? 1 : 0);
    if (isTheme || isGroup) {
      var groupParts = getGroupPropParts(isTheme ? "theme-" + mediaKeyIn : mediaKeyIn);
      var {
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
      var [selector, nextSelector] = getThemeOrGroupSelector(name, styleInner, isGroup, groupParts, isTheme, specificities[specificity]);
      styleRule = styleInner.replace(selector, nextSelector);
    } else {
      var prefix = specificities[specificity];
      styleRule = prefix && styleInner[0] === "@" ? styleInner.replace("{", `{${prefix}`) : `${prefix}${styleInner}`;
    }
  }
  if (!isNonWindowMedia || groupMediaKey) {
    if (!selectors) {
      var mediaKeys = Object.keys(mediaQueries);
      selectors = Object.fromEntries(mediaKeys.map(function (key) {
        return [key, mediaObjectToString(mediaQueries[key])];
      }));
      prefixes = Object.fromEntries(mediaKeys.map(function (k, index) {
        return [k, new Array(index + 1).fill(":root").join("")];
      }));
    }
    var mediaKey = groupMediaKey || mediaKeyIn;
    var mediaSelector = selectors[mediaKey];
    var screenStr = negate ? "not all and " : "";
    var mediaQuery = `${screenStr}${mediaSelector}`;
    var precedenceImportancePrefix = groupMediaKey ? groupPriority : prefixes[mediaKey];
    var prefix1 = groupMediaKey ? `@container ${containerName}` : "@media";
    if (groupMediaKey) {
      styleInner = styleRule;
    }
    if (styleInner.includes(prefix1)) {
      styleRule = styleInner.replace("{", ` and ${mediaQuery} {`).replace(`and screen and`, `and`);
    } else {
      styleRule = `${prefix1} ${mediaQuery}{${precedenceImportancePrefix}${styleInner}}`;
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
//# sourceMappingURL=createMediaStyle.native.js.map
