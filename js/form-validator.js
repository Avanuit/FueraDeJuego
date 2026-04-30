export function createValidator(rules) {
  const showError = (id, msg) => {
    const el = document.getElementById(id)
    if (el) el.textContent = msg
  }

  const clearErrors = () => {
    for (const rule of rules) showError(rule.errorId, '')
  }

  return {
    validate(data) {
      let valid = true
      clearErrors()
      for (const rule of rules) {
        const error = rule.validate(data[rule.field])
        if (error) {
          showError(rule.errorId, error)
          valid = false
        }
      }
      return valid
    },
  }
}
