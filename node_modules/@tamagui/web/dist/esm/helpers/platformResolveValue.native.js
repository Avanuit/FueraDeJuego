import { getTokenForKey } from "./getTokenForKey.native.js";
import { parseNativeStyle } from "./parseNativeStyle.native.js";
var tokenPattern = /(\$[\w.-]+)/g;
var nativeParseKeys = {
  backgroundImage: true,
  boxShadow: true,
  textShadow: true
};
function replaceTokens(value, styleProps, styleState) {
  return value.replace(tokenPattern, function (t) {
    var r = getTokenForKey("size", t, styleProps, styleState);
    if (r == null) {
      r = getTokenForKey("color", t, styleProps, styleState);
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
    var r = getTokenForKey("size", t, effectiveStyleProps, styleState);
    if (r == null) {
      r = getTokenForKey("color", t, effectiveStyleProps, styleState);
    }
    if (r == null) return t;
    if (typeof r !== "string" && typeof r !== "number") {
      var placeholder = `__tk${placeholderIdx++}__`;
      tokenMap.set(placeholder, r);
      return placeholder;
    }
    return String(r);
  });
  var parsed = parseNativeStyle(key, withPlaceholders, tokenMap);
  if (parsed) return parsed;
  return replaceTokens(value, styleProps, styleState);
}
export { platformResolveValue };
//# sourceMappingURL=platformResolveValue.native.js.map
