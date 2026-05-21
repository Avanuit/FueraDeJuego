import { defaultOffset } from "./defaultOffset.mjs";
function normalizeShadow({
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius
}) {
  const {
    height,
    width
  } = shadowOffset || defaultOffset;
  return {
    shadowOffset: {
      width: width || 0,
      height: height || 0
    },
    shadowRadius: shadowRadius || 0,
    // pass color through as-is, opacity applied via color-mix in getCSSStylesAtomic
    shadowColor,
    // default to 1 if not specified (color-mix will handle the opacity)
    shadowOpacity: shadowOpacity ?? 1
  };
}
export { normalizeShadow };
//# sourceMappingURL=normalizeShadow.mjs.map
