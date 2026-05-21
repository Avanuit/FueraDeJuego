"use strict";

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
// If the importer is in node compatibility mode or this is not an ESM
// file that has been converted to a CommonJS file using a Babel-
// compatible transform (i.e. "__esModule" has not been set), then set
// "default" to the CommonJS "module.exports" for node compatibility.
isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
  value: mod,
  enumerable: true
}) : target, mod));
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod);
var themeable_exports = {};
__export(themeable_exports, {
  themeable: () => themeable
});
module.exports = __toCommonJS(themeable_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = __toESM(require("react"), 1);
var import_Theme = require("../views/Theme.native.js");
var import_getDefaultProps = require("./getDefaultProps.native.js");
function themeable(Component, staticConfig) {
  var optimize = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var withThemeComponent = /* @__PURE__ */import_react.default.forwardRef(function WithTheme(props, ref) {
    "use no memo";

    var userDefaults = (0, import_getDefaultProps.getDefaultProps)(staticConfig, props.componentName);
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
    (0, import_jsx_runtime.jsx)(Component, {
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
    var contents = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_Theme.Theme, {
      "disable-child-theme": true,
      ...filteredProps,
      children: element
    });
    if (context) {
      var Provider = context.Provider;
      var contextValue = import_react.default.useContext(context);
      contents = /* @__PURE__ */(0, import_jsx_runtime.jsx)(Provider, {
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
//# sourceMappingURL=themeable.native.js.map
