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
var accessibilityDirectMap_native_exports = {};
__export(accessibilityDirectMap_native_exports, {
  accessibilityDirectMap: () => accessibilityDirectMap,
  accessibilityWebRoleToNativeRole: () => accessibilityWebRoleToNativeRole,
  nativeAccessibilityState: () => nativeAccessibilityState,
  nativeAccessibilityValue: () => nativeAccessibilityValue,
  webToNativeAccessibilityDirectMap: () => webToNativeAccessibilityDirectMap
});
module.exports = __toCommonJS(accessibilityDirectMap_native_exports);
var accessibilityDirectMap = {};
var webToNativeAccessibilityDirectMap = {};
var nativeAccessibilityValue = {};
var nativeAccessibilityState = {};
var accessibilityWebRoleToNativeRole = {};
//# sourceMappingURL=accessibilityDirectMap.native.js.map
