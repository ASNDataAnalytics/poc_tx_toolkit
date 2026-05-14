// =============================================================================
//  src/ppt/buildDeck.js
//
//  Orchestrates the full PowerPoint deck.
//  Add or reorder slides here.
//
//  To add a new slide:
//    1. Create src/ppt/slides/mySlide.js
//    2. Import it here
//    3. Call it in buildDeck() below
// =============================================================================

import pptxgen from 'pptxgenjs'

import { addTitleSlide }     from './slides/titleSlide.js'
import { addRespondentSlide } from './slides/respondentSlide.js'
import { addRatingsSlide }   from './slides/ratingsSlide.js'
import { addNpsSlide }       from './slides/npsSlide.js'
import { addStrengthsSlide } from './slides/strengthsSlide.js'
import { addFeedbackSlide }  from './slides/feedbackSlide.js'

/**
 * Build and download a .pptx deck from survey responses.
 * @param {object} responses  - { questionId: answer } map from App state
 */
export function buildDeck(responses) {
  const prs = new pptxgen()

  // ── Presentation metadata ──
  prs.title    = 'Survey Report'
  prs.subject  = 'Patient Experience Survey'
  prs.author   = responses.name || 'Survey App'
  prs.company  = responses.org  || ''

  // ── Layout: standard widescreen 16:9 ──
  prs.layout = 'LAYOUT_WIDE'   // 13.33" × 7.5"

  // ── Slides — add/remove/reorder here ──
  addTitleSlide(prs, responses)
  addRespondentSlide(prs, responses)
  addRatingsSlide(prs, responses)
  addNpsSlide(prs, responses)
  addStrengthsSlide(prs, responses)   // skipped automatically if no strengths selected
  addFeedbackSlide(prs, responses)    // skipped automatically if no open feedback

  // ── Download ──
  const name = (responses.name || 'respondent').toLowerCase().replace(/\s+/g, '-')
  const date = new Date().toISOString().slice(0, 10)
  prs.writeFile({ fileName: `survey-report-${name}-${date}.pptx` })
}
