import { platformResolveValue } from "./platformResolveValue.native.js";
var compoundKeys = {
  boxShadow: true,
  textShadow: true,
  filter: true,
  backgroundImage: true,
  border: true,
  outline: true
};
function resolveCompoundTokens(key, value, styleProps, styleState) {
  if (!value.includes("$")) return value;
  if (!compoundKeys[key]) return value;
  return platformResolveValue(key, value, styleProps, styleState);
}
export { resolveCompoundTokens };
//# sourceMappingURL=resolveCompoundTokens.native.js.map
