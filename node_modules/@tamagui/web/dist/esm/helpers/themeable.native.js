import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Theme } from "../views/Theme.native.js";
import { getDefaultProps } from "./getDefaultProps.native.js";
function themeable(Component, staticConfig) {
  var optimize = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var withThemeComponent = /* @__PURE__ */React.forwardRef(function WithTheme(props, ref) {
    "use no memo";

    var userDefaults = getDefaultProps(staticConfig, props.componentName);
    var defaultTheme = userDefaults === null || userDefaults === void 0 ? void 0 : userDefaults.theme;
    var defaultResetTheme = userDefaults === null || userDefaults === void 0 ? void 0 : userDefaults.themeReset;
    var {
      theme,
      componentName,
      themeReset,
      ...rest
    } = props;
    var overriddenContextProps;
    var context = staticConfig === null || staticConfig === void 0 ? void 0 : staticConfig.context;
    if (context) {
      for (var key in context.props) {
        var val = props[key];
        if (val !== void 0) {
          overriddenContextProps = overriddenContextProps || {};
          overriddenContextProps[key] = val;
        }
      }
    }
    var element =
    // @ts-expect-error its ok
    /* @__PURE__ */
    _jsx(Component, {
      ref,
      ...rest,
      "data-disable-theme": true
    });
    var filteredProps = null;
    var compName = componentName || (staticConfig === null || staticConfig === void 0 ? void 0 : staticConfig.componentName);
    if (compName) {
      filteredProps = filteredProps || {};
      filteredProps.componentName = compName;
    }
    if ("debug" in props) {
      filteredProps = filteredProps || {};
      filteredProps.debug = props.debug;
    }
    if ("theme" in props || defaultTheme) {
      filteredProps = filteredProps || {};
      filteredProps.name = "theme" in props ? props.theme : defaultTheme;
    }
    if ("themeReset" in props || defaultResetTheme) {
      filteredProps = filteredProps || {};
      filteredProps.reset = "themeReset" in props ? themeReset : defaultResetTheme;
    }
    if (optimize && !filteredProps) {
      return element;
    }
    var contents = /* @__PURE__ */_jsx(Theme, {
      "disable-child-theme": true,
      ...filteredProps,
      children: element
    });
    if (context) {
      var Provider = context.Provider;
      var contextValue = React.useContext(context);
      contents = /* @__PURE__ */_jsx(Provider, {
        ...contextValue,
        ...overriddenContextProps,
        children: contents
      });
    }
    return contents;
  });
  var withTheme = withThemeComponent;
  withTheme.displayName = `Themed(${(Component === null || Component === void 0 ? void 0 : Component.displayName) || (Component === null || Component === void 0 ? void 0 : Component.name) || "Anonymous"})`;
  return withTheme;
}
export { themeable };
//# sourceMappingURL=themeable.native.js.map
