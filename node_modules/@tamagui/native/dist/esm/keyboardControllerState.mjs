import { createGlobalState } from "./globalState.mjs";
const state = createGlobalState(`keyboard_controller`, {
  enabled: false,
  KeyboardProvider: null,
  KeyboardAwareScrollView: null,
  useKeyboardHandler: null,
  useReanimatedKeyboardAnimation: null,
  KeyboardController: null,
  KeyboardEvents: null,
  KeyboardStickyView: null
});
function isKeyboardControllerEnabled() {
  return state.get().enabled;
}
function getKeyboardControllerState() {
  return state.get();
}
function setKeyboardControllerState(updates) {
  Object.assign(state.get(), updates);
}
export { getKeyboardControllerState, isKeyboardControllerEnabled, setKeyboardControllerState };
//# sourceMappingURL=keyboardControllerState.mjs.map
