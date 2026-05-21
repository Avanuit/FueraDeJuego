import { useContext } from "react";
import { createStyledContext } from "../helpers/createStyledContext.native.js";
var ComponentContext = createStyledContext({
  disableSSR: void 0,
  inText: false,
  language: null,
  animationDriver: null,
  setParentFocusState: null,
  insets: null
});
var useConfiguration = function () {
  return useContext(ComponentContext);
};
export { ComponentContext, useConfiguration };
//# sourceMappingURL=ComponentContext.native.js.map
