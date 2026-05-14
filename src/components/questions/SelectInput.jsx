// src/components/questions/SelectInput.jsx
export default function SelectInput({ question, value, onChange }) {
  return (
    <div className="field">
      <label className="field-label">
        {question.label}
        {question.required && <span className="required">*</span>}
      </label>
      <select
        className="field-input"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
      >
        <option value="" disabled>Select an option...</option>
        {question.options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}
