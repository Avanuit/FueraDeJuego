import { useThemeState } from "./useThemeState.native.js";
var forceUpdateState = {
  forceClassName: true,
  deopt: true,
  needsUpdate: function () {
    return true;
  }
};
var forceKeys = {
  current: /* @__PURE__ */new Set([""])
};
function useThemeName() {
  var _useThemeState;
  return ((_useThemeState = useThemeState(forceUpdateState, false, forceKeys)) === null || _useThemeState === void 0 ? void 0 : _useThemeState.name) || "";
}
export { useThemeName };
//# sourceMappingURL=useThemeName.native.js.map
