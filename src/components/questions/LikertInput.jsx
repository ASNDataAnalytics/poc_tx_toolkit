// src/components/questions/LikertInput.jsx
export default function LikertInput({ question, value, onChange }) {
  const { min = 1, max = 5, minLabel, maxLabel } = question
  const points = Array.from({ length: max - min + 1 }, (_, i) => i + min)

  return (
    <div className="field">
      <label className="field-label">
        {question.label}
        {question.required && <span className="required">*</span>}
      </label>

      {(minLabel || maxLabel) && (
        <div className="likert-endpoint-labels">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}

      <div className="likert-options">
        {points.map(n => (
          <label
            key={n}
            className={`likert-option ${value === n ? 'selected' : ''}`}
            onClick={() => onChange(n)}
          >
            <input type="radio" readOnly checked={value === n} />
            {n}
          </label>
        ))}
      </div>
    </div>
  )
}
