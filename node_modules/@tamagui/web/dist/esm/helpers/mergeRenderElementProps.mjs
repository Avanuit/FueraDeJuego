import { mergeSlotStyleProps } from "./mergeSlotStyleProps.mjs";
function mergeRenderElementProps(elementProps, viewProps, children) {
  const merged = mergeSlotStyleProps({
    ...elementProps
  }, viewProps);
  merged.children = children;
  return merged;
}
export { mergeRenderElementProps };
//# sourceMappingURL=mergeRenderElementProps.mjs.map
