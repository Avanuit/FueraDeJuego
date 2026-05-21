import React from "react";
import { Theme } from "../views/Theme.mjs";
import { getDefaultProps } from "./getDefaultProps.mjs";
import { jsx } from "react/jsx-runtime";
function themeable(Component, staticConfig, optimize = false) {
  const withThemeComponent = React.forwardRef(function WithTheme(props, ref) {
    "use no memo";

    const userDefaults = getDefaultProps(staticConfig, props.componentName);
    const defaultTheme = userDefaults?.theme;
    const defaultResetTheme = userDefaults?.themeReset;
    const {
      theme,
      componentName,
      themeReset,
      ...rest
    } = props;
    let overriddenContextProps;
    const context = staticConfig?.context;
    if (context) {
      for (const key in context.props) {
        const val = props[key];
        if (val !== void 0) {
          overriddenContextProps = overriddenContextProps || {};
          overriddenContextProps[key] = val;
        }
      }
    }
    const element =
    // @ts-expect-error its ok
    /* @__PURE__ */
    jsx(Component, {
      ref,
      ...rest,
      "data-disable-theme": true
    });
    let filteredProps = null;
    const compName = componentName || staticConfig?.componentName;
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
    let contents = /* @__PURE__ */jsx(Theme, {
      "disable-child-theme": true,
      ...filteredProps,
      children: element
    });
    if (context) {
      const Provider = context.Provider;
      const contextValue = React.useContext(context);
      contents = /* @__PURE__ */jsx(Provider, {
        ...contextValue,
        ...overriddenContextProps,
        children: contents
      });
    }
    return contents;
  });
  const withTheme = withThemeComponent;
  withTheme.displayName = `Themed(${Component?.displayName || Component?.name || "Anonymous"})`;
  return withTheme;
}
export { themeable };
//# sourceMappingURL=themeable.mjs.map
