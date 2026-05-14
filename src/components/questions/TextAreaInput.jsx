// src/components/questions/TextAreaInput.jsx
export default function TextAreaInput({ question, value, onChange }) {
  return (
    <div className="field">
      <label className="field-label">
        {question.label}
        {question.required && <span className="required">*</span>}
      </label>
      <textarea
        className="field-input"
        value={value || ''}
        placeholder={question.placeholder || ''}
        rows={question.rows || 3}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
