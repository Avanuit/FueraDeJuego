import * as normalizeColor from "@react-native/normalize-color";
const norm = normalizeColor.default || normalizeColor;
const normalizeCSSColor = norm;
function rgba(colorInt) {
  const r = Math.round((colorInt & 4278190080) >>> 24);
  const g = Math.round((colorInt & 16711680) >>> 16);
  const b = Math.round((colorInt & 65280) >>> 8);
  const a = ((colorInt & 255) >>> 0) / 255;
  return {
    r,
    g,
    b,
    a
  };
}
var index_default = normalizeCSSColor;
export { index_default as default, normalizeCSSColor, rgba };
//# sourceMappingURL=index.mjs.map
