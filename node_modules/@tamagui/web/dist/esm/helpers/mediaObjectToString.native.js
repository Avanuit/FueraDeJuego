function camelToHyphen(str) {
  return str.replace(/[A-Z]/g, function (m) {
    return `-${m.toLowerCase()}`;
  }).toLowerCase();
}
var cache = /* @__PURE__ */new WeakMap();
function mediaObjectToString(query) {
  if (typeof query === "string") {
    return query;
  }
  if (cache.has(query)) {
    return cache.get(query);
  }
  var res = Object.entries(query).map(function (param) {
    var [feature, value] = param;
    feature = camelToHyphen(feature);
    if (typeof value === "string") {
      return `(${feature}: ${value})`;
    }
    if (typeof value === "number" && /[height|width]$/.test(feature)) {
      value = `${value}px`;
    }
    return `(${feature}: ${value})`;
  }).join(" and ");
  cache.set(query, res);
  return res;
}
export { mediaObjectToString };
//# sourceMappingURL=mediaObjectToString.native.js.map
