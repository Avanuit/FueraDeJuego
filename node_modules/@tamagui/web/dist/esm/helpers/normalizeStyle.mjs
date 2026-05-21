import { expandStyle } from "./expandStyle.mjs";
import { fixStyles } from "./expandStyles.mjs";
import { isObj } from "./isObj.mjs";
import { normalizeValueWithProperty } from "./normalizeValueWithProperty.mjs";
import { pseudoDescriptors } from "./pseudoDescriptors.mjs";
function normalizeStyle(style, disableNormalize = false) {
  const res = {};
  for (let key in style) {
    const prop = style[key];
    if (prop == null) continue;
    if (key in pseudoDescriptors ||
    // this should capture all parent-based styles like media, group, etc
    key[0] === "$" && isObj(prop)) {
      res[key] = normalizeStyle(prop, disableNormalize);
      continue;
    }
    const value = disableNormalize ? prop : normalizeValueWithProperty(prop, key);
    const out = expandStyle(key, value);
    if (out) {
      Object.assign(res, Object.fromEntries(out));
    } else {
      res[key] = value;
    }
  }
  fixStyles(res);
  return res;
}
export { normalizeStyle };
//# sourceMappingURL=normalizeStyle.mjs.map
