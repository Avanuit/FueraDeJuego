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
export { resolveAnimationDriver };
//# sourceMappingURL=resolveAnimationDriver.mjs.map
