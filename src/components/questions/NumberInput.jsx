// src/components/questions/NumberInput.jsx
export default function NumberInput({ question, value, onChange }) {
  return (
    <div className="field">
      <label className="field-label">
        {question.label}
        {question.required && <span className="required">*</span>}
      </label>
      <input
        type="number"
        className="field-input"
        value={value ?? ''}
        min={question.min}
        max={question.max}
        placeholder={question.placeholder || ''}
        onChange={e => onChange(e.target.value === '' ? '' : Number(e.target.value))}
      />
    </div>
  )
}
