// src/components/questions/SliderInput.jsx
export default function SliderInput({ question, value, onChange }) {
  const { min = 0, max = 10, defaultVal = 5 } = question
  const current = value ?? defaultVal

  return (
    <div className="field">
      <label className="field-label">
        {question.label}
        {question.required && <span className="required">*</span>}
      </label>
      <div className="slider-row">
        <input
          type="range"
          min={min}
          max={max}
          value={current}
          onChange={e => onChange(Number(e.target.value))}
        />
        <div className="slider-val">{current}</div>
      </div>
      <div className="slider-labels">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}
