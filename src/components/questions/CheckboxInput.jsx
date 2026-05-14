// src/components/questions/CheckboxInput.jsx
export default function CheckboxInput({ question, value = [], onChange }) {
  const toggle = (opt) => {
    const current = Array.isArray(value) ? value : []
    const next = current.includes(opt)
      ? current.filter(v => v !== opt)
      : [...current, opt]
    onChange(next)
  }

  return (
    <div className="field">
      <label className="field-label">
        {question.label}
        {question.required && <span className="required">*</span>}
      </label>
      <div className="checkbox-grid">
        {question.options.map(opt => {
          const checked = Array.isArray(value) && value.includes(opt)
          return (
            <label
              key={opt}
              className={`checkbox-option ${checked ? 'selected' : ''}`}
              onClick={() => toggle(opt)}
            >
              <span className={`checkbox-box ${checked ? 'checked' : ''}`}>
                {checked && '✓'}
              </span>
              {opt}
            </label>
          )
        })}
      </div>
    </div>
  )
}
