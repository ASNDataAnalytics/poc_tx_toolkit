// src/components/QuestionRenderer.jsx
//
// Picks the right input component based on question.type.
// To add a new question type:
//   1. Create src/components/questions/MyNewInput.jsx
//   2. Import it here
//   3. Add a case below

import TextInput     from './questions/TextInput.jsx'
import TextAreaInput from './questions/TextAreaInput.jsx'
import LikertInput   from './questions/LikertInput.jsx'
import SliderInput   from './questions/SliderInput.jsx'
import RadioInput    from './questions/RadioInput.jsx'
import CheckboxInput from './questions/CheckboxInput.jsx'
import SelectInput   from './questions/SelectInput.jsx'
import NumberInput   from './questions/NumberInput.jsx'
import DateInput     from './questions/DateInput.jsx'
import { isVisible } from '../utils/evaluateCondition.js'

const COMPONENTS = {
  text:     TextInput,
  textarea: TextAreaInput,
  likert:   LikertInput,
  slider:   SliderInput,
  radio:    RadioInput,
  checkbox: CheckboxInput,
  select:   SelectInput,
  number:   NumberInput,
  date:     DateInput,
}

export default function QuestionRenderer({ question, value, onChange, responses }) {
  // Evaluate showIf — if the condition is false, render nothing
  if (!isVisible(question.showIf, responses)) return null

  const Component = COMPONENTS[question.type]

  if (!Component) {
    console.warn(`QuestionRenderer: unknown question type "${question.type}"`)
    return null
  }

  return (
    <Component
      question={question}
      value={value}
      onChange={onChange}
      responses={responses}
    />
  )
}
