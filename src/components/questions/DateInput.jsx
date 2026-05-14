// src/components/questions/DateInput.jsx
export default function DateInput({ question, value, onChange }) {
  return (
    <div className="field">
      <label className="field-label">
        {question.label}
        {question.required && <span className="required">*</span>}
      </label>
      <input
        type="date"
        className="field-input"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
