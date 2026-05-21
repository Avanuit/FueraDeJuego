import { mergeSlotStyleProps } from "./mergeSlotStyleProps.native.js";
function mergeRenderElementProps(elementProps, viewProps, children) {
  var merged = mergeSlotStyleProps({
    ...elementProps
  }, viewProps);
  merged.children = children;
  return merged;
}
export { mergeRenderElementProps };
//# sourceMappingURL=mergeRenderElementProps.native.js.map
