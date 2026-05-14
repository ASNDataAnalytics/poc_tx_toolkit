// =============================================================================
//  src/pdf/buildReport.js
//
//  Assembles the pdfmake document definition from survey responses.
//  This file knows about pdfmake DSL and brand theme — it knows nothing
//  about React or Shiny.
//
//  To change PDF layout/branding: edit this file and theme.js only.
//  To add new question types to the PDF: add a case to formatAnswer().
// =============================================================================

import { THEME, npsColor, npsLabel, scoreColor } from './theme.js'
import { SURVEY }                                 from '../config/survey.js'
import { isVisible, visiblePages, visibleQuestions } from '../utils/evaluateCondition.js'

// ── Helpers ───────────────────────────────────────────────────────────────────

const today = () =>
  new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

/** Format any answer value into a readable string for the PDF */
function formatAnswer(value) {
  if (value === undefined || value === null || value === '') return '—'
  if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : '—'
  return String(value)
}

/** Horizontal rule line */
const rule = (color = THEME.accent) => ({
  canvas: [{
    type: 'line', x1: 0, y1: 0, x2: 515, y2: 0,
    lineWidth: 0.5, lineColor: color,
  }],
  margin: [0, 0, 0, 10],
})

/** Section heading */
const sectionHead = (text) => ([
  { text: text.toUpperCase(), fontSize: 8, bold: true, color: THEME.accent, letterSpacing: 1, margin: [0, 18, 0, 4] },
  rule(),
])

/** Two-column info cell */
const infoCell = (key, val) => ({
  stack: [
    { text: key.toUpperCase(), fontSize: 7, color: THEME.muted, letterSpacing: 0.8 },
    { text: val || '—', fontSize: 10, bold: true, margin: [0, 2, 0, 0] },
  ],
  margin: 8,
})

/** Feedback block with left accent bar */
const feedbackBlock = (text) => ({
  table: {
    widths: [3, '*'],
    body: [[
      { text: '', fillColor: THEME.accent, border: [false, false, false, false] },
      { text: text || 'No response provided.', fontSize: 9, lineHeight: 1.6,
        margin: [10, 8, 8, 8], border: [false, false, false, false] },
    ]],
  },
  layout: 'noBorders',
  fillColor: THEME.paper,
  margin: [0, 0, 0, 10],
})

// ── Likert summary section ────────────────────────────────────────────────────

function buildLikertSection(responses) {
  // Collect all likert questions across all pages that were visible
  const likertQs = []
  visiblePages(SURVEY, responses).forEach(page => {
    visibleQuestions(page.questions, responses).forEach(q => {
      if (q.type === 'likert') likertQs.push(q)
    })
  })

  if (likertQs.length === 0) return []

  const scores = likertQs.map(q => Number(responses[q.id])).filter(n => !isNaN(n))
  const avg    = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 'N/A'

  const tableRows = likertQs.map((q, i) => {
    const score = responses[q.id]
    return [
      {
        text: q.label, fontSize: 9,
        fillColor: i % 2 === 0 ? '#fafaf8' : THEME.white,
        margin: [6, 6, 6, 6],
      },
      {
        text: score ? String(score) : '—',
        fontSize: 9, bold: true,
        color: score ? scoreColor(score) : THEME.muted,
        alignment: 'center',
        fillColor: i % 2 === 0 ? '#fafaf8' : THEME.white,
        margin: [6, 6, 6, 6],
      },
    ]
  })

  return [
    ...sectionHead('Satisfaction Ratings'),

    // Average badge
    {
      table: { body: [[{
        text: `Average Score: ${avg} / 5`,
        fontSize: 9, color: THEME.white, bold: true,
        margin: [10, 5, 10, 5],
      }]] },
      layout: 'noBorders',
      fillColor: THEME.ink,
      margin: [0, 0, 0, 10],
    },

    // Ratings table
    {
      table: {
        widths: ['*', 60],
        headerRows: 1,
        body: [
          [
            { text: 'Question', fontSize: 8, bold: true, color: THEME.white,
              fillColor: THEME.ink, margin: [6, 6, 6, 6] },
            { text: 'Score', fontSize: 8, bold: true, color: THEME.white,
              fillColor: THEME.ink, alignment: 'center', margin: [6, 6, 6, 6] },
          ],
          ...tableRows,
        ],
      },
      layout: {
        hLineColor: () => THEME.border,
        vLineColor: () => THEME.border,
        hLineWidth: () => 0.5,
        vLineWidth: () => 0.5,
      },
      margin: [0, 0, 0, 4],
    },
  ]
}

// ── NPS section ───────────────────────────────────────────────────────────────

function buildNpsSection(nps) {
  if (nps === undefined || nps === null) return []
  const score = Number(nps)
  const color = npsColor(score)
  const label = npsLabel(score)
  const barW  = (score / 10) * 515

  return [
    ...sectionHead('Recommendation Score (NPS)'),
    {
      canvas: [
        { type: 'rect', x: 0, y: 0, w: 515, h: 14, r: 2, color: THEME.border },
        { type: 'rect', x: 0, y: 0, w: barW, h: 14, r: 2, color },
      ],
      margin: [0, 0, 0, 8],
    },
    {
      columns: [
        { text: `Score: ${score} / 10`, fontSize: 9, color: THEME.ink },
        { text: `Category: ${label}`, fontSize: 9, bold: true, color, alignment: 'right' },
      ],
      margin: [0, 0, 0, 4],
    },
  ]
}

// ── Generic "all other visible questions" section ─────────────────────────────
// Renders every visible question that isn't a likert or the NPS slider,
// grouped by page, as a simple two-column label/answer table.

function buildAnswerSection(responses) {
  const rows = []

  visiblePages(SURVEY, responses).forEach(page => {
    const qs = visibleQuestions(page.questions, responses).filter(
      q => q.type !== 'likert' && q.id !== 'nps'
    )
    if (qs.length === 0) return

    qs.forEach((q, i) => {
      const answer = formatAnswer(responses[q.id])
      rows.push([
        {
          text: q.label, fontSize: 9, color: THEME.muted,
          fillColor: i % 2 === 0 ? '#fafaf8' : THEME.white,
          margin: [6, 6, 6, 6],
        },
        {
          text: answer, fontSize: 9, bold: true,
          fillColor: i % 2 === 0 ? '#fafaf8' : THEME.white,
          margin: [6, 6, 6, 6],
        },
      ])
    })
  })

  if (rows.length === 0) return []

  return [
    ...sectionHead('Full Responses'),
    {
      table: {
        widths: ['40%', '60%'],
        headerRows: 1,
        body: [
          [
            { text: 'Question', fontSize: 8, bold: true, color: THEME.white,
              fillColor: THEME.ink, margin: [6, 6, 6, 6] },
            { text: 'Answer', fontSize: 8, bold: true, color: THEME.white,
              fillColor: THEME.ink, margin: [6, 6, 6, 6] },
          ],
          ...rows,
        ],
      },
      layout: {
        hLineColor: () => THEME.border,
        vLineColor: () => THEME.border,
        hLineWidth: () => 0.5,
        vLineWidth: () => 0.5,
      },
    },
  ]
}

// ── Open feedback section ─────────────────────────────────────────────────────

function buildFeedbackSection(responses) {
  const positive = responses['positive']
  const improve  = responses['improve']
  if (!positive && !improve) return []

  return [
    ...sectionHead('Open Feedback'),
    positive && { text: 'WHAT WORKED WELL', fontSize: 7, color: THEME.muted, margin: [0, 0, 0, 4] },
    positive && feedbackBlock(positive),
    improve  && { text: 'AREAS FOR IMPROVEMENT', fontSize: 7, color: THEME.muted, margin: [0, 0, 0, 4] },
    improve  && feedbackBlock(improve),
  ].filter(Boolean)
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Build the full pdfmake document definition.
 * @param {object} responses  - { questionId: answer } map from App state
 * @returns {object}          - pdfmake docDefinition, pass to pdfMake.createPdf()
 */
export function buildReport(responses) {
  const nps      = responses['nps'] ?? 7
  const npsScore = Number(nps)
  const color    = npsColor(npsScore)
  const label    = npsLabel(npsScore)
  const date     = today()

  return {
    pageSize:    'A4',
    pageMargins: THEME.pageMargins,

    // Repeating page header
    header: {
      canvas: [{ type: 'rect', x: 0, y: 0, w: 595, h: 46, color: THEME.ink }],
    },

    // Repeating page footer
    footer: (currentPage, pageCount) => ({
      columns: [
        { text: 'CONFIDENTIAL — FOR INTERNAL USE ONLY',
          color: '#888', fontSize: 7, margin: [40, 10, 0, 0] },
        { text: `Page ${currentPage} of ${pageCount}`,
          alignment: 'right', color: '#888', fontSize: 7, margin: [0, 10, 40, 0] },
      ],
    }),

    content: [
      // Spacer for the fixed header band
      { text: ' ', margin: [0, 0, 0, 8] },

      // Title row (sits inside the dark header band via negative margin)
      {
        columns: [
          {
            stack: [
              { text: 'Survey Report', fontSize: 18, bold: true, color: THEME.white, margin: [0, -40, 0, 2] },
              { text: `GENERATED ${date.toUpperCase()}`, fontSize: 7, color: '#888888', margin: [0, -40, 0, 0] },
            ],
          },
          {
            // NPS badge top-right
            stack: [
              { text: String(npsScore), fontSize: 22, bold: true, color: THEME.white, alignment: 'center' },
              { text: label.toUpperCase(), fontSize: 7, color: THEME.white, alignment: 'center' },
            ],
            fillColor: color,
            margin: [0, -40, 0, 0],
            width: 70,
          },
        ],
        margin: [0, 0, 0, 28],
      },

      // Respondent info block
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              infoCell('Respondent', responses['name']),
              infoCell('Organization', responses['org']),
            ],
            [
              infoCell('Role', responses['role'] === 'Other' ? responses['role_other'] : responses['role']),
              infoCell('Date', date),
            ],
          ],
        },
        layout: {
          hLineColor: () => THEME.border,
          vLineColor: () => THEME.border,
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
        },
        fillColor: THEME.paper,
        margin: [0, 0, 0, 8],
      },

      // Dynamically built sections
      ...buildLikertSection(responses),
      ...buildNpsSection(nps),
      ...buildFeedbackSection(responses),
      ...buildAnswerSection(responses),
    ],

    defaultStyle: {
      font:       THEME.fontBody,
      fontSize:   10,
      color:      THEME.ink,
      lineHeight: 1.4,
    },
  }
}
