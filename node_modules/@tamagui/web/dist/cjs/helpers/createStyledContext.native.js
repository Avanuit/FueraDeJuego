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
var createStyledContext_exports = {};
__export(createStyledContext_exports, {
  createStyledContext: () => createStyledContext
});
module.exports = __toCommonJS(createStyledContext_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = __toESM(require("react"), 1);
var import_mergeProps = require("./mergeProps.native.js");
var import_objectIdentityKey = require("./objectIdentityKey.native.js");
var createStyledContext = function (defaultValues) {
  "use no memo";

  var namespace = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var createReactContext = import_react.default[Math.random() ? "createContext" : "createContext"];
  var useReactMemo = import_react.default[Math.random() ? "useMemo" : "useMemo"];
  var useReactContext = import_react.default[Math.random() ? "useContext" : "useContext"];
  var OGContext = createReactContext(defaultValues);
  var OGProvider = OGContext.Provider;
  var Context = OGContext;
  var scopedContexts = /* @__PURE__ */new Map();
  var LastScopeInNamespace = createReactContext(namespace);
  function getOrCreateScopedContext(scope) {
    var ScopedContext = scopedContexts.get(scope);
    if (!ScopedContext) {
      ScopedContext = createReactContext(defaultValues);
      scopedContexts.set(scope, ScopedContext);
    }
    return ScopedContext;
  }
  var getNamespacedScope = function (scope) {
    return namespace ? `${namespace}--${scope}` : scope;
  };
  var Provider = function (param) {
    var {
      children,
      scope: scopeIn,
      // performance: avoid creating objects
      __disableMergeDefaultValues,
      ...values
    } = param;
    var scope = getNamespacedScope(scopeIn);
    var next = useReactMemo(function () {
      if (__disableMergeDefaultValues) {
        return values;
      }
      return (0, import_mergeProps.mergeProps)(defaultValues, values);
    }, [(0, import_objectIdentityKey.objectIdentityKey)(values)]);
    var ScopedProvider = OGProvider;
    if (scope) {
      ScopedProvider = getOrCreateScopedContext(scope).Provider;
    }
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(LastScopeInNamespace.Provider, {
      value: scope,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(ScopedProvider, {
        value: next,
        children
      })
    });
  };
  var useStyledContext = function () {
    var scopeIn = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var lastScopeInNamespace = useReactContext(LastScopeInNamespace);
    var scope = namespace ? scopeIn ? getNamespacedScope(scopeIn) : lastScopeInNamespace : scopeIn;
    var context = scope ? getOrCreateScopedContext(scope) : OGContext;
    var value = useReactContext(context);
    return value;
  };
  Context.Provider = Provider;
  Context.props = defaultValues;
  Context.context = OGContext;
  Context.useStyledContext = useStyledContext;
  return Context;
};
//# sourceMappingURL=createStyledContext.native.js.map
