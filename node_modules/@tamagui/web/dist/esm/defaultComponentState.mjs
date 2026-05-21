const defaultComponentState = {
  hover: false,
  press: false,
  pressIn: false,
  focus: false,
  focusVisible: false,
  focusWithin: false,
  unmounted: true,
  disabled: false
};
const defaultComponentStateMounted = {
  ...defaultComponentState,
  unmounted: false
};
const defaultComponentStateShouldEnter = {
  ...defaultComponentState,
  unmounted: "should-enter"
};
export { defaultComponentState, defaultComponentStateMounted, defaultComponentStateShouldEnter };
//# sourceMappingURL=defaultComponentState.mjs.map
