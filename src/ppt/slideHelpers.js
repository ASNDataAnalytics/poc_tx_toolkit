// src/ppt/slideHelpers.js
//
// Shared header and footer applied to every content slide.
// Edit here to change the persistent branding on all slides.

import { PPT } from '../pdf/theme.js'

/**
 * Adds the branded header bar + title to a slide.
 * @param {object} slide   - PptxGenJS slide object
 * @param {object} prs     - PptxGenJS presentation object (for ShapeType)
 * @param {string} title   - Slide section title
 */
export function addSlideHeader(slide, prs, title) {
  // Dark header band
  slide.addShape(prs.ShapeType.rect, {
    x: 0, y: 0, w: PPT.slideW, h: 1.0,
    fill: { color: PPT.ink },
    line: { color: PPT.ink },
  })

  // Diamond logo mark
  slide.addShape(prs.ShapeType.diamond, {
    x: 0.3, y: 0.22, w: 0.5, h: 0.5,
    fill: { color: PPT.accent },
    line: { color: PPT.accent },
  })

  // Slide title
  slide.addText(title, {
    x: 1.0, y: 0.0, w: 11.0, h: 1.0,
    fontSize: 22,
    bold: true,
    color: PPT.white,
    valign: 'middle',
    fontFace: 'Calibri',
  })

  // Accent underline
  slide.addShape(prs.ShapeType.rect, {
    x: 1.0, y: 0.92, w: 11.0, h: 0.055,
    fill: { color: PPT.accent },
    line: { color: PPT.accent },
  })
}

/**
 * Adds a subtle footer to a slide with page label and confidentiality note.
 * @param {object} slide - PptxGenJS slide object
 * @param {object} prs   - PptxGenJS presentation object
 */
export function addSlideFooter(slide, prs) {
  // Footer background
  slide.addShape(prs.ShapeType.rect, {
    x: 0, y: 7.22, w: PPT.slideW, h: 0.28,
    fill: { color: PPT.ink },
    line: { color: PPT.ink },
  })

  slide.addText('CONFIDENTIAL — FOR INTERNAL USE ONLY', {
    x: 0.3, y: 7.22, w: 7, h: 0.28,
    fontSize: 6,
    color: '666677',
    valign: 'middle',
  })

  slide.addText('Survey Report Generator', {
    x: 6.5, y: 7.22, w: 6.5, h: 0.28,
    fontSize: 6,
    color: PPT.accent,
    align: 'right',
    valign: 'middle',
  })
}
