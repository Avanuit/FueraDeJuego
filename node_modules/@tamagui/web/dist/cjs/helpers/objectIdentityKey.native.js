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
var objectIdentityKey_exports = {};
__export(objectIdentityKey_exports, {
  objectIdentityKey: () => objectIdentityKey
});
module.exports = __toCommonJS(objectIdentityKey_exports);
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function objectIdentityKey(obj) {
  var k = "";
  for (var key in obj) {
    k += key;
    var arg = obj[key];
    var type = typeof arg === "undefined" ? "undefined" : _type_of(arg);
    if (!arg || type !== "object" && type !== "function") {
      k += type + arg;
    } else if (cache.has(arg)) {
      k += cache.get(arg);
    } else {
      var v = Math.random();
      cache.set(arg, v);
      k += v;
    }
  }
  return k;
}
var cache = /* @__PURE__ */new WeakMap();
//# sourceMappingURL=objectIdentityKey.native.js.map
