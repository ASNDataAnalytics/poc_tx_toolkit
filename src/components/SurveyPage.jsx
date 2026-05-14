// src/components/SurveyPage.jsx
import QuestionRenderer from './QuestionRenderer.jsx'

export default function SurveyPage({ page, responses, onAnswer }) {
  return (
    <div className="survey-page">
      <div className="page-header">
        <h2 className="page-title">{page.title}</h2>
        {page.description && (
          <p className="page-description">{page.description}</p>
        )}
      </div>

      <div className="questions">
        {page.questions.map(question => (
          <QuestionRenderer
            key={question.id}
            question={question}
            value={responses[question.id]}
            onChange={val => onAnswer(question.id, val)}
            responses={responses}
          />
        ))}
      </div>
    </div>
  )
}
