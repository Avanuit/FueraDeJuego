"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod);
var styled_exports = {};
__export(styled_exports, {
  styled: () => styledExport,
  styledHtml: () => styledHtml
});
module.exports = __toCommonJS(styled_exports);
var import_createComponent = require("./createComponent.native.js");
var import_mergeVariants = require("./helpers/mergeVariants.native.js");
var import_setupReactNative = require("./setupReactNative.native.js");
var textLikeElements = /* @__PURE__ */new Set(["a", "abbr", "b", "bdi", "bdo", "cite", "code", "data", "del", "dfn", "em", "i", "ins", "kbd", "label", "mark", "q", "s", "samp", "small", "span", "strong", "sub", "sup", "time", "u", "var"]);
function styledHtml(tag, options) {
  var isText = textLikeElements.has(tag);
  var {
    variants,
    name,
    defaultVariants,
    context,
    ...defaultProps
  } = options || {};
  var conf = {
    Component: tag,
    variants,
    defaultProps,
    defaultVariants,
    componentName: name,
    isReactNative: false,
    isText,
    acceptsClassName: true,
    context
  };
  if (defaultProps["children"] || context) {
    conf.neverFlatten = true;
  }
  var component = (0, import_createComponent.createComponent)(conf);
  return component;
}
function styled(ComponentIn, options, config) {
  if (process.env.NODE_ENV !== "production") {
    if (!ComponentIn) {
      throw new Error(`No component given to styled()`);
    }
  }
  var parentStaticConfig = ComponentIn["staticConfig"];
  var isPlainStyledComponent = !!parentStaticConfig && !(parentStaticConfig.isReactNative || parentStaticConfig.isHOC);
  var isNonStyledHOC = (parentStaticConfig === null || parentStaticConfig === void 0 ? void 0 : parentStaticConfig.isHOC) && !(parentStaticConfig === null || parentStaticConfig === void 0 ? void 0 : parentStaticConfig.isStyledHOC);
  var Component = isNonStyledHOC || isPlainStyledComponent ? ComponentIn : (parentStaticConfig === null || parentStaticConfig === void 0 ? void 0 : parentStaticConfig.Component) || ComponentIn;
  var reactNativeConfig = !parentStaticConfig ? (0, import_setupReactNative.getReactNativeConfig)(Component) : void 0;
  var isReactNative = Boolean(reactNativeConfig || (config === null || config === void 0 ? void 0 : config.isReactNative) || (parentStaticConfig === null || parentStaticConfig === void 0 ? void 0 : parentStaticConfig.isReactNative));
  var staticConfigProps = function () {
    var {
      variants,
      name,
      defaultVariants,
      context,
      ...defaultProps
    } = options || {};
    var parentDefaultVariants;
    var parentDefaultProps;
    if (parentStaticConfig) {
      var avoid = parentStaticConfig.isHOC && !parentStaticConfig.isStyledHOC;
      if (!avoid) {
        var pdp = parentStaticConfig.defaultProps;
        for (var key2 in pdp) {
          var val = pdp[key2];
          if (parentStaticConfig.defaultVariants) {
            if (key2 in parentStaticConfig.defaultVariants) {
              if (!defaultVariants || !(key2 in defaultVariants)) {
                parentDefaultVariants || (parentDefaultVariants = {});
                parentDefaultVariants[key2] = val;
              }
            }
          }
          if (!(key2 in defaultProps) && (!defaultVariants || !(key2 in defaultVariants))) {
            parentDefaultProps || (parentDefaultProps = {});
            parentDefaultProps[key2] = pdp[key2];
          }
        }
        if (parentStaticConfig.variants) {
          variants = (0, import_mergeVariants.mergeVariants)(parentStaticConfig.variants, variants);
        }
      }
    }
    if (parentDefaultProps || defaultVariants || parentDefaultVariants) {
      defaultProps = {
        ...parentDefaultProps,
        ...parentDefaultVariants,
        ...defaultProps,
        ...defaultVariants
      };
    }
    if (parentStaticConfig === null || parentStaticConfig === void 0 ? void 0 : parentStaticConfig.isHOC) {
      if (name) {
        defaultProps.componentName = name;
      }
    }
    var isText = Boolean((config === null || config === void 0 ? void 0 : config.isText) || (parentStaticConfig === null || parentStaticConfig === void 0 ? void 0 : parentStaticConfig.isText));
    var _config_acceptsClassName;
    var acceptsClassName = (_config_acceptsClassName = config === null || config === void 0 ? void 0 : config.acceptsClassName) !== null && _config_acceptsClassName !== void 0 ? _config_acceptsClassName : isPlainStyledComponent || isReactNative || (parentStaticConfig === null || parentStaticConfig === void 0 ? void 0 : parentStaticConfig.isHOC) && (parentStaticConfig === null || parentStaticConfig === void 0 ? void 0 : parentStaticConfig.acceptsClassName);
    var conf = {
      ...parentStaticConfig,
      ...config,
      ...(!isPlainStyledComponent && {
        Component
      }),
      // @ts-expect-error
      variants,
      defaultProps,
      defaultVariants,
      componentName: name || (parentStaticConfig === null || parentStaticConfig === void 0 ? void 0 : parentStaticConfig.componentName),
      isReactNative,
      isText,
      acceptsClassName,
      context,
      ...reactNativeConfig,
      isStyledHOC: Boolean(parentStaticConfig === null || parentStaticConfig === void 0 ? void 0 : parentStaticConfig.isHOC),
      parentStaticConfig
    };
    if (defaultProps["children"] || !acceptsClassName || context) {
      conf.neverFlatten = true;
    }
    return conf;
  }();
  var component = (0, import_createComponent.createComponent)(staticConfigProps || {});
  for (var key in ComponentIn) {
    if (key === "propTypes") continue;
    if (key in component) continue;
    component[key] = ComponentIn[key];
  }
  return component;
}
var styledExport = new Proxy(styled, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    return function (options) {
      return styledHtml(prop, options);
    };
  }
});
//# sourceMappingURL=styled.native.js.map
