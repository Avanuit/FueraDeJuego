"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod);
var mediaObjectToString_exports = {};
__export(mediaObjectToString_exports, {
  mediaObjectToString: () => mediaObjectToString
});
module.exports = __toCommonJS(mediaObjectToString_exports);
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
//# sourceMappingURL=mediaObjectToString.native.js.map
