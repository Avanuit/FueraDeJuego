import { expandStyle } from "./expandStyle.native.js";
import { fixStyles } from "./expandStyles.native.js";
import { isObj } from "./isObj.native.js";
import { normalizeValueWithProperty } from "./normalizeValueWithProperty.native.js";
import { pseudoDescriptors } from "./pseudoDescriptors.native.js";
function normalizeStyle(style) {
  var disableNormalize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var res = {};
  for (var key in style) {
    var prop = style[key];
    if (prop == null) continue;
    if (key in pseudoDescriptors ||
    // this should capture all parent-based styles like media, group, etc
    key[0] === "$" && isObj(prop)) {
      res[key] = normalizeStyle(prop, disableNormalize);
      continue;
    }
    var value = disableNormalize ? prop : normalizeValueWithProperty(prop, key);
    var out = expandStyle(key, value);
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
//# sourceMappingURL=normalizeStyle.native.js.map
