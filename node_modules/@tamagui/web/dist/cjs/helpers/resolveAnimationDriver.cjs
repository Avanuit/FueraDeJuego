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
var resolveAnimationDriver_exports = {};
__export(resolveAnimationDriver_exports, {
  resolveAnimationDriver: () => resolveAnimationDriver
});
module.exports = __toCommonJS(resolveAnimationDriver_exports);
function resolveAnimationDriver(driver) {
  if (!driver) return null;
  if (typeof driver.useAnimations === "function") {
    return driver;
  }
  if ("default" in driver && typeof driver.default?.useAnimations === "function") {
    return driver.default;
  }
  return null;
}