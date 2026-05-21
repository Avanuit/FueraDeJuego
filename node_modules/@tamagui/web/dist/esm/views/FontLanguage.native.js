import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { ComponentContext } from "../contexts/ComponentContext.native.js";
function FontLanguage(param) {
  var {
    children,
    ...props
  } = param;
  var parentProps = React.useContext(ComponentContext);
  var language = React.useMemo(function () {
    return props;
  }, [JSON.stringify(props)]);
  return /* @__PURE__ */_jsx(ComponentContext.Provider, {
    ...parentProps,
    language,
    children
  });
}
export { FontLanguage };
//# sourceMappingURL=FontLanguage.native.js.map
