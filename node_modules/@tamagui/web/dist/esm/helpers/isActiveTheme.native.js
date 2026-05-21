function isActiveTheme(key, activeThemeName) {
  if (!key.startsWith("$theme-")) return;
  return key.slice(7).startsWith(activeThemeName);
}
export { isActiveTheme };
//# sourceMappingURL=isActiveTheme.native.js.map
