import * as normalizeColor from "@react-native/normalize-color";
var norm = normalizeColor.default || normalizeColor;
var normalizeCSSColor = norm;
function rgba(colorInt) {
  var r = Math.round((colorInt & 4278190080) >>> 24);
  var g = Math.round((colorInt & 16711680) >>> 16);
  var b = Math.round((colorInt & 65280) >>> 8);
  var a = ((colorInt & 255) >>> 0) / 255;
  return {
    r,
    g,
    b,
    a
  };
}
var index_default = normalizeCSSColor;
export { index_default as default, normalizeCSSColor, rgba };
//# sourceMappingURL=index.native.js.map
