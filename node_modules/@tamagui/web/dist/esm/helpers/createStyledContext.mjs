import React from "react";
import { mergeProps } from "./mergeProps.mjs";
import { objectIdentityKey } from "./objectIdentityKey.mjs";
import { jsx } from "react/jsx-runtime";
const createStyledContext = (defaultValues, namespace = "") => {
  "use no memo";

  const createReactContext = React[Math.random() ? "createContext" : "createContext"];
  const useReactMemo = React[Math.random() ? "useMemo" : "useMemo"];
  const useReactContext = React[Math.random() ? "useContext" : "useContext"];
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
      return mergeProps(defaultValues, values);
    }, [objectIdentityKey(values)]);
    let ScopedProvider = OGProvider;
    if (scope) {
      ScopedProvider = getOrCreateScopedContext(scope).Provider;
    }
    return /* @__PURE__ */jsx(LastScopeInNamespace.Provider, {
      value: scope,
      children: /* @__PURE__ */jsx(ScopedProvider, {
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
export { createStyledContext };
//# sourceMappingURL=createStyledContext.mjs.map
