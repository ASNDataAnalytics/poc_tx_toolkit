// src/components/questions/TextInput.jsx
export default function TextInput({ question, value, onChange }) {
  return (
    <div className="field">
      <label className="field-label">
        {question.label}
        {question.required && <span className="required">*</span>}
      </label>
      <input
        type="text"
        className="field-input"
        value={value || ''}
        placeholder={question.placeholder || ''}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
