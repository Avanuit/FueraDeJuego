var outlineStyles = /* @__PURE__ */new Set(["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset", "none", "hidden"]);
function parseOutlineShorthand(value) {
  if (value === "none" || value === "0") {
    return [["outlineWidth", 0], ["outlineStyle", "none"]];
  }
  var parts = value.trim().split(/\s+/);
  var outlineWidth;
  var outlineStyle;
  var outlineColor;
  var _iteratorNormalCompletion = true,
    _didIteratorError = false,
    _iteratorError = void 0;
  try {
    for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var part = _step.value;
      if (outlineStyles.has(part)) {
        outlineStyle = part;
      } else if (/^[\d.]+(?:px|em|rem|%|pt|vw|vh)?$/.test(part)) {
        var num = parseFloat(part);
        outlineWidth = part.endsWith("px") || !part.match(/[a-z%]/i) ? num : part;
      } else {
        outlineColor = part;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  var result = [];
  if (outlineWidth !== void 0) {
    result.push(["outlineWidth", outlineWidth]);
  }
  if (outlineStyle !== void 0) {
    result.push(["outlineStyle", outlineStyle]);
  }
  if (outlineColor !== void 0) {
    result.push(["outlineColor", outlineColor]);
  }
  return result.length > 0 ? result : void 0;
}
export { parseOutlineShorthand };
//# sourceMappingURL=parseOutlineShorthand.native.js.map
