// src/ppt/slides/feedbackSlide.js
import { PPT } from '../../pdf/theme.js'
import { addSlideHeader, addSlideFooter } from '../slideHelpers.js'

export function addFeedbackSlide(prs, responses) {
  const positive = responses.positive
  const improve  = responses.improve
  if (!positive && !improve) return

  const slide = prs.addSlide()
  addSlideHeader(slide, prs, 'Open Feedback')
  addSlideFooter(slide, prs)

  const hasTwo = positive && improve
  const blockH = hasTwo ? 2.4 : 4.8
  const blockW = PPT.slideW - 1.0

  const blocks = [
    positive && { label: 'WHAT WORKED WELL',      text: positive, color: PPT.accent,  y: 1.4 },
    improve  && { label: 'AREAS FOR IMPROVEMENT',  text: improve,  color: PPT.gold,    y: hasTwo ? 4.1 : 1.4 },
  ].filter(Boolean)

  blocks.forEach(block => {
    // Card background
    slide.addShape(prs.ShapeType.rect, {
      x: 0.5, y: block.y, w: blockW, h: blockH,
      fill: { color: PPT.paper },
      line: { color: PPT.border, pt: 0.5 },
    })

    // Left accent bar
    slide.addShape(prs.ShapeType.rect, {
      x: 0.5, y: block.y, w: 0.08, h: blockH,
      fill: { color: block.color },
      line: { color: block.color },
    })

    // Section label
    slide.addText(block.label, {
      x: 0.75, y: block.y + 0.12, w: blockW - 0.4, h: 0.3,
      fontSize: 8,
      color: block.color,
      bold: true,
      charSpacing: 2,
    })

    // Feedback text
    slide.addText(block.text, {
      x: 0.75, y: block.y + 0.5, w: blockW - 0.4, h: blockH - 0.65,
      fontSize: 13,
      color: PPT.ink,
      valign: 'top',
      wrap: true,
      lineSpacingMultiple: 1.3,
    })
  })
}
