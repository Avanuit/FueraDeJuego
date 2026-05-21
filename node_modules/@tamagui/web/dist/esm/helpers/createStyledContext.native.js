import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { mergeProps } from "./mergeProps.native.js";
import { objectIdentityKey } from "./objectIdentityKey.native.js";
var createStyledContext = function (defaultValues) {
  "use no memo";

  var namespace = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var createReactContext = React[Math.random() ? "createContext" : "createContext"];
  var useReactMemo = React[Math.random() ? "useMemo" : "useMemo"];
  var useReactContext = React[Math.random() ? "useContext" : "useContext"];
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
      return mergeProps(defaultValues, values);
    }, [objectIdentityKey(values)]);
    var ScopedProvider = OGProvider;
    if (scope) {
      ScopedProvider = getOrCreateScopedContext(scope).Provider;
    }
    return /* @__PURE__ */_jsx(LastScopeInNamespace.Provider, {
      value: scope,
      children: /* @__PURE__ */_jsx(ScopedProvider, {
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
export { createStyledContext };
//# sourceMappingURL=createStyledContext.native.js.map
