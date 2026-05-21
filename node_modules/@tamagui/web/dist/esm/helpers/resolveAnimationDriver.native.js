function resolveAnimationDriver(driver) {
  var _driver_default;
  if (!driver) return null;
  if (typeof driver.useAnimations === "function") {
    return driver;
  }
  if ("default" in driver && typeof ((_driver_default = driver.default) === null || _driver_default === void 0 ? void 0 : _driver_default.useAnimations) === "function") {
    return driver.default;
  }
  return null;
}
export { resolveAnimationDriver };
//# sourceMappingURL=resolveAnimationDriver.native.js.map
