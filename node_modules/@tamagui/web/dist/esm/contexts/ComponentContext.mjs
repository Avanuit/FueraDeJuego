import { useContext } from "react";
import { createStyledContext } from "../helpers/createStyledContext.mjs";
const ComponentContext = createStyledContext({
  disableSSR: void 0,
  inText: false,
  language: null,
  animationDriver: null,
  setParentFocusState: null,
  insets: null
});
const useConfiguration = () => {
  return useContext(ComponentContext);
};
export { ComponentContext, useConfiguration };
//# sourceMappingURL=ComponentContext.mjs.map
