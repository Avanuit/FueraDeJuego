var defaultComponentState = {
  hover: false,
  press: false,
  pressIn: false,
  focus: false,
  focusVisible: false,
  focusWithin: false,
  unmounted: true,
  disabled: false
};
var defaultComponentStateMounted = {
  ...defaultComponentState,
  unmounted: false
};
var defaultComponentStateShouldEnter = {
  ...defaultComponentState,
  unmounted: "should-enter"
};
export { defaultComponentState, defaultComponentStateMounted, defaultComponentStateShouldEnter };
//# sourceMappingURL=defaultComponentState.native.js.map
