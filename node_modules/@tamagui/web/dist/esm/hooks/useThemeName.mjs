import { useThemeState } from "./useThemeState.mjs";
const forceUpdateState = {
  forceClassName: true,
  deopt: true,
  needsUpdate: () => true
};
const forceKeys = {
  current: /* @__PURE__ */new Set([""])
};
function useThemeName() {
  return useThemeState(forceUpdateState, false, forceKeys)?.name || "";
}
export { useThemeName };
//# sourceMappingURL=useThemeName.mjs.map
