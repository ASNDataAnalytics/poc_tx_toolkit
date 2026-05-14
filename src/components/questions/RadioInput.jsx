// src/components/questions/RadioInput.jsx
export default function RadioInput({ question, value, onChange }) {
  return (
    <div className="field">
      <label className="field-label">
        {question.label}
        {question.required && <span className="required">*</span>}
      </label>
      <div className="radio-group">
        {question.options.map(opt => (
          <label
            key={opt}
            className={`radio-option ${value === opt ? 'selected' : ''}`}
            onClick={() => onChange(opt)}
          >
            <span className={`radio-dot ${value === opt ? 'filled' : ''}`} />
            {opt}
          </label>
        ))}
      </div>
    </div>
  )
}
