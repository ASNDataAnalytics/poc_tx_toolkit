// src/ppt/slides/respondentSlide.js
import { PPT } from '../../pdf/theme.js'
import { addSlideHeader, addSlideFooter } from '../slideHelpers.js'

export function addRespondentSlide(prs, responses) {
  const slide = prs.addSlide()
  addSlideHeader(slide, prs, 'Respondent Information')
  addSlideFooter(slide, prs)

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  const role = responses.role === 'Other'
    ? (responses.role_other || 'Other')
    : (responses.role || '—')

  const fields = [
    { label: 'NAME',         value: responses.name      || '—' },
    { label: 'ROLE',         value: role                       },
    { label: 'ORGANIZATION', value: responses.org        || '—' },
    { label: 'DATE',         value: today                      },
    { label: 'VISIT DATE',   value: responses.visit_date || '—' },
  ]

  // Render fields in a 2-column grid of cards
  fields.forEach((field, i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const cardW = 5.8
    const cardH = 1.1
    const gapX  = 0.3
    const gapY  = 0.2
    const startX = 0.5
    const startY = 1.5

    const x = startX + col * (cardW + gapX)
    const y = startY + row * (cardH + gapY)

    // Card background
    slide.addShape(prs.ShapeType.rect, {
      x, y, w: cardW, h: cardH,
      fill: { color: PPT.paper },
      line: { color: PPT.border, pt: 0.5 },
    })

    // Left accent bar
    slide.addShape(prs.ShapeType.rect, {
      x, y, w: 0.06, h: cardH,
      fill: { color: PPT.accent },
      line: { color: PPT.accent },
    })

    // Label
    slide.addText(field.label, {
      x: x + 0.18, y: y + 0.12, w: cardW - 0.25, h: 0.25,
      fontSize: 7,
      color: PPT.muted,
      bold: true,
      charSpacing: 2,
    })

    // Value
    slide.addText(field.value, {
      x: x + 0.18, y: y + 0.42, w: cardW - 0.25, h: 0.5,
      fontSize: 14,
      color: PPT.ink,
      bold: true,
    })
  })
}
