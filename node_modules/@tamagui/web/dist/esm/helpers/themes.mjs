import { createVariable, isVariable } from "../createVariable.mjs";
function ensureThemeVariable(theme, key) {
  const val = theme[key];
  if (!isVariable(val)) {
    theme[key] = createVariable({
      key,
      name: key,
      val
    });
  } else {
    if (val.name !== key) {
      theme[key] = createVariable({
        key: val.name,
        name: key,
        val: val.val
      });
    }
  }
}
export { ensureThemeVariable };
//# sourceMappingURL=themes.mjs.map
