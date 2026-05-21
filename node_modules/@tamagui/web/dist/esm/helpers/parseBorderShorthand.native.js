var borderStyles = /* @__PURE__ */new Set(["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset", "none", "hidden"]);
function parseBorderShorthand(value) {
  if (value === "none" || value === "0") {
    return [["borderTopWidth", 0], ["borderRightWidth", 0], ["borderBottomWidth", 0], ["borderLeftWidth", 0], ["borderStyle", "solid"]];
  }
  var parts = value.trim().split(/\s+/);
  var borderWidth;
  var borderStyle;
  var borderColor;
  var _iteratorNormalCompletion = true,
    _didIteratorError = false,
    _iteratorError = void 0;
  try {
    for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var part = _step.value;
      if (borderStyles.has(part)) {
        borderStyle = part;
      } else if (/^[\d.]+(?:px|em|rem|%|pt|vw|vh)?$/.test(part)) {
        var num = parseFloat(part);
        borderWidth = part.endsWith("px") || !part.match(/[a-z%]/i) ? num : part;
      } else {
        borderColor = part;
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
  if (borderWidth !== void 0) {
    result.push(["borderTopWidth", borderWidth]);
    result.push(["borderRightWidth", borderWidth]);
    result.push(["borderBottomWidth", borderWidth]);
    result.push(["borderLeftWidth", borderWidth]);
  }
  if (borderStyle !== void 0) {
    result.push(["borderStyle", borderStyle]);
  }
  if (borderColor !== void 0) {
    result.push(["borderTopColor", borderColor]);
    result.push(["borderRightColor", borderColor]);
    result.push(["borderBottomColor", borderColor]);
    result.push(["borderLeftColor", borderColor]);
  }
  return result.length > 0 ? result : void 0;
}
export { parseBorderShorthand };
//# sourceMappingURL=parseBorderShorthand.native.js.map
