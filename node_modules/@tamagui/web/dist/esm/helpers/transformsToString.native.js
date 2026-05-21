import { normalizeValueWithProperty } from "./normalizeValueWithProperty.native.js";
function transformsToString(transforms) {
  return transforms.map(
  // { scale: 2 } => 'scale(2)'
  // { translateX: 20 } => 'translateX(20px)'
  // { matrix: [1,2,3,4,5,6] } => 'matrix(1,2,3,4,5,6)'
  // { perspective: 1000 } => perspective(1000px)
  function (transform) {
    var type = Object.keys(transform)[0];
    var value = transform[type];
    if (type === "matrix" || type === "matrix3d") {
      return `${type}(${value.join(",")})`;
    }
    return `${type}(${normalizeValueWithProperty(value, type)})`;
  }).join(" ");
}
export { transformsToString };
//# sourceMappingURL=transformsToString.native.js.map
