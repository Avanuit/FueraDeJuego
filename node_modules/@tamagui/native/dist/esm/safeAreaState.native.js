import { createGlobalState } from "./globalState.native.js";
var state = createGlobalState(`safe_area`, {
  enabled: false,
  useSafeAreaInsets: null,
  useSafeAreaFrame: null,
  initialMetrics: null
});
var defaultInsets = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
var defaultFrame = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};
function getSafeArea() {
  return {
    get isEnabled() {
      return state.get().enabled;
    },
    get state() {
      return state.get();
    },
    set(updates) {
      Object.assign(state.get(), updates);
    },
    getInsets() {
      var s = state.get();
      if (!s.enabled || !s.initialMetrics) {
        return defaultInsets;
      }
      return s.initialMetrics.insets;
    },
    getFrame() {
      var s = state.get();
      if (!s.enabled || !s.initialMetrics) {
        return defaultFrame;
      }
      return s.initialMetrics.frame;
    }
  };
}
export { getSafeArea };
//# sourceMappingURL=safeAreaState.native.js.map
