import { createGlobalState } from "./globalState.native.js";
var state = createGlobalState(`linear_gradient`, {
  enabled: false,
  Component: null
});
function getLinearGradient() {
  return {
    get isEnabled() {
      return state.get().enabled;
    },
    get state() {
      return state.get();
    },
    set(newState) {
      state.set(newState);
    }
  };
}
export { getLinearGradient };
//# sourceMappingURL=linearGradientState.native.js.map
