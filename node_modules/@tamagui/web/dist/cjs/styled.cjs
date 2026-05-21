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
var import_createComponent = require("./createComponent.cjs");
var import_mergeVariants = require("./helpers/mergeVariants.cjs");
var import_setupReactNative = require("./setupReactNative.cjs");
const textLikeElements = /* @__PURE__ */new Set(["a", "abbr", "b", "bdi", "bdo", "cite", "code", "data", "del", "dfn", "em", "i", "ins", "kbd", "label", "mark", "q", "s", "samp", "small", "span", "strong", "sub", "sup", "time", "u", "var"]);
function styledHtml(tag, options) {
  const isText = textLikeElements.has(tag);
  const {
    variants,
    name,
    defaultVariants,
    context,
    ...defaultProps
  } = options || {};
  const conf = {
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
  const component = (0, import_createComponent.createComponent)(conf);
  return component;
}
function styled(ComponentIn, options, config) {
  if (process.env.NODE_ENV !== "production") {
    if (!ComponentIn) {
      throw new Error(`No component given to styled()`);
    }
  }
  const parentStaticConfig = ComponentIn["staticConfig"];
  const isPlainStyledComponent = !!parentStaticConfig && !(parentStaticConfig.isReactNative || parentStaticConfig.isHOC);
  const isNonStyledHOC = parentStaticConfig?.isHOC && !parentStaticConfig?.isStyledHOC;
  let Component = isNonStyledHOC || isPlainStyledComponent ? ComponentIn : parentStaticConfig?.Component || ComponentIn;
  const reactNativeConfig = !parentStaticConfig ? (0, import_setupReactNative.getReactNativeConfig)(Component) : void 0;
  const isReactNative = Boolean(reactNativeConfig || config?.isReactNative || parentStaticConfig?.isReactNative);
  const staticConfigProps = (() => {
    let {
      variants,
      name,
      defaultVariants,
      context,
      ...defaultProps
    } = options || {};
    let parentDefaultVariants;
    let parentDefaultProps;
    if (parentStaticConfig) {
      const avoid = parentStaticConfig.isHOC && !parentStaticConfig.isStyledHOC;
      if (!avoid) {
        const pdp = parentStaticConfig.defaultProps;
        for (const key in pdp) {
          const val = pdp[key];
          if (parentStaticConfig.defaultVariants) {
            if (key in parentStaticConfig.defaultVariants) {
              if (!defaultVariants || !(key in defaultVariants)) {
                parentDefaultVariants ||= {};
                parentDefaultVariants[key] = val;
              }
            }
          }
          if (!(key in defaultProps) && (!defaultVariants || !(key in defaultVariants))) {
            parentDefaultProps ||= {};
            parentDefaultProps[key] = pdp[key];
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
    if (parentStaticConfig?.isHOC) {
      if (name) {
        defaultProps.componentName = name;
      }
    }
    const isText = Boolean(config?.isText || parentStaticConfig?.isText);
    const acceptsClassName = config?.acceptsClassName ?? (isPlainStyledComponent || isReactNative || parentStaticConfig?.isHOC && parentStaticConfig?.acceptsClassName);
    const conf = {
      ...parentStaticConfig,
      ...config,
      ...(!isPlainStyledComponent && {
        Component
      }),
      // @ts-expect-error
      variants,
      defaultProps,
      defaultVariants,
      componentName: name || parentStaticConfig?.componentName,
      isReactNative,
      isText,
      acceptsClassName,
      context,
      ...reactNativeConfig,
      isStyledHOC: Boolean(parentStaticConfig?.isHOC),
      parentStaticConfig
    };
    if (defaultProps["children"] || !acceptsClassName || context) {
      conf.neverFlatten = true;
    }
    return conf;
  })();
  const component = (0, import_createComponent.createComponent)(staticConfigProps || {});
  for (const key in ComponentIn) {
    if (key === "propTypes") continue;
    if (key in component) continue;
    component[key] = ComponentIn[key];
  }
  return component;
}
const styledExport = new Proxy(styled, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    return options => styledHtml(prop, options);
  }
});