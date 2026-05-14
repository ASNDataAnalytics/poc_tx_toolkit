// =============================================================================
//  src/utils/evaluateCondition.js
//
//  Evaluates a showIf condition against the current responses object.
//  Used by QuestionRenderer and SurveyPage to show/hide questions and pages.
//
//  Returns true  → show the question/page
//  Returns false → hide it (and skip it in PDF output)
// =============================================================================

/**
 * @param {object|undefined} condition  - the showIf value from survey config
 * @param {object}           responses  - current { questionId: answer } map
 * @returns {boolean}
 */
export function isVisible(condition, responses) {
  // No condition → always visible
  if (!condition) return true

  // Compound: ALL conditions must be true
  if (condition.all) {
    return condition.all.every(c => isVisible(c, responses))
  }

  // Compound: ANY condition must be true
  if (condition.any) {
    return condition.any.some(c => isVisible(c, responses))
  }

  // Simple: evaluate a single condition against one question's answer
  const answer = responses[condition.questionId]

  // Exact match (works for text, radio, select)
  if (condition.value !== undefined) {
    return answer === condition.value
  }

  // Array includes (works for checkbox)
  if (condition.includes !== undefined) {
    return Array.isArray(answer) && answer.includes(condition.includes)
  }

  // Numeric comparisons (works for slider, number, likert)
  if (condition.lessThan !== undefined) {
    return Number(answer) < condition.lessThan
  }

  if (condition.greaterThan !== undefined) {
    return Number(answer) > condition.greaterThan
  }

  if (condition.lessOrEqual !== undefined) {
    return Number(answer) <= condition.lessOrEqual
  }

  if (condition.greaterOrEqual !== undefined) {
    return Number(answer) >= condition.greaterOrEqual
  }

  // Not equal
  if (condition.notValue !== undefined) {
    return answer !== condition.notValue
  }

  // Answered at all (any non-empty value)
  if (condition.answered) {
    return answer !== undefined && answer !== '' && answer !== null
  }

  return true
}

/**
 * Filter a list of pages down to only those visible given current responses.
 * Used by App.jsx to compute navigation and skip hidden pages.
 */
export function visiblePages(pages, responses) {
  return pages.filter(page => isVisible(page.showIf, responses))
}

/**
 * Filter a list of questions down to only those visible.
 * Used by SurveyPage and buildReport.js.
 */
export function visibleQuestions(questions, responses) {
  return questions.filter(q => isVisible(q.showIf, responses))
}
