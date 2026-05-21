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
var import_react = __toESM(require("react"), 1);
var import_mergeProps = require("./mergeProps.cjs");
var import_objectIdentityKey = require("./objectIdentityKey.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
const createStyledContext = (defaultValues, namespace = "") => {
  "use no memo";

  const createReactContext = import_react.default[Math.random() ? "createContext" : "createContext"];
  const useReactMemo = import_react.default[Math.random() ? "useMemo" : "useMemo"];
  const useReactContext = import_react.default[Math.random() ? "useContext" : "useContext"];
  const OGContext = createReactContext(defaultValues);
  const OGProvider = OGContext.Provider;
  const Context = OGContext;
  const scopedContexts = /* @__PURE__ */new Map();
  const LastScopeInNamespace = createReactContext(namespace);
  function getOrCreateScopedContext(scope) {
    let ScopedContext = scopedContexts.get(scope);
    if (!ScopedContext) {
      ScopedContext = createReactContext(defaultValues);
      scopedContexts.set(scope, ScopedContext);
    }
    return ScopedContext;
  }
  const getNamespacedScope = scope => namespace ? `${namespace}--${scope}` : scope;
  const Provider = ({
    children,
    scope: scopeIn,
    // performance: avoid creating objects
    __disableMergeDefaultValues,
    ...values
  }) => {
    const scope = getNamespacedScope(scopeIn);
    const next = useReactMemo(() => {
      if (__disableMergeDefaultValues) {
        return values;
      }
      return (0, import_mergeProps.mergeProps)(defaultValues, values);
    }, [(0, import_objectIdentityKey.objectIdentityKey)(values)]);
    let ScopedProvider = OGProvider;
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
  const useStyledContext = (scopeIn = "") => {
    const lastScopeInNamespace = useReactContext(LastScopeInNamespace);
    const scope = namespace ? scopeIn ? getNamespacedScope(scopeIn) : lastScopeInNamespace : scopeIn;
    const context = scope ? getOrCreateScopedContext(scope) : OGContext;
    const value = useReactContext(context);
    return value;
  };
  Context.Provider = Provider;
  Context.props = defaultValues;
  Context.context = OGContext;
  Context.useStyledContext = useStyledContext;
  return Context;
};