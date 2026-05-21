function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var isObj = function (x) {
  return x && !Array.isArray(x) && (typeof x === "undefined" ? "undefined" : _type_of(x)) === "object";
};
export { isObj };
//# sourceMappingURL=isObj.native.js.map
