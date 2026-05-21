function setElementProps(element) {
  if (element && !element.getBoundingClientRect) {
    element.getBoundingClientRect = function () {
      if (element.unstable_getBoundingClientRect != null) {
        return element.unstable_getBoundingClientRect();
      }
    };
  }
}
export { setElementProps };
//# sourceMappingURL=setElementProps.native.js.map
