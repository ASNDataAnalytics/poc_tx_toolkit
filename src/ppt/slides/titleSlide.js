// src/ppt/slides/titleSlide.js
import { PPT } from '../../pdf/theme.js'

export function addTitleSlide(prs, responses) {
  const slide = prs.addSlide()
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  // Full dark background
  slide.addShape(prs.ShapeType.rect, {
    x: 0, y: 0, w: PPT.slideW, h: PPT.slideH,
    fill: { color: PPT.ink },
    line: { color: PPT.ink },
  })

  // Accent diamond shape (top-left)
  slide.addShape(prs.ShapeType.diamond, {
    x: 0.5, y: 0.45, w: 0.55, h: 0.55,
    fill: { color: PPT.accent },
    line: { color: PPT.accent },
  })

  // Accent horizontal rule
  slide.addShape(prs.ShapeType.rect, {
    x: 0.5, y: 3.4, w: 5.5, h: 0.04,
    fill: { color: PPT.accent },
    line: { color: PPT.accent },
  })

  // Main title
  slide.addText('Survey Report', {
    x: 0.5, y: 1.2, w: 8, h: 1.4,
    fontSize: 52,
    bold: true,
    color: PPT.white,
    fontFace: 'Calibri',
  })

  // Subtitle
  slide.addText('Patient Experience Survey', {
    x: 0.5, y: 2.7, w: 8, h: 0.6,
    fontSize: 20,
    color: PPT.accent,
    fontFace: 'Calibri',
  })

  // Respondent info block (bottom-left)
  const infoLines = [
    { text: responses.name  || '—', options: { fontSize: 13, bold: true, color: PPT.white } },
    { text: '\n' },
    { text: (responses.role === 'Other' ? responses.role_other : responses.role) || '—',
      options: { fontSize: 11, color: 'aaaaaa' } },
    { text: '\n' },
    { text: responses.org || '—', options: { fontSize: 11, color: 'aaaaaa' } },
  ]

  slide.addText(infoLines, {
    x: 0.5, y: 5.0, w: 6, h: 1.8,
    valign: 'top',
  })

  // Date badge (bottom-right)
  slide.addShape(prs.ShapeType.rect, {
    x: 10.5, y: 6.6, w: 2.5, h: 0.65,
    fill: { color: PPT.accent },
    line: { color: PPT.accent },
  })

  slide.addText(today, {
    x: 10.5, y: 6.6, w: 2.5, h: 0.65,
    fontSize: 9,
    color: PPT.white,
    align: 'center',
    valign: 'middle',
    bold: true,
  })

  // Confidentiality note
  slide.addText('CONFIDENTIAL — FOR INTERNAL USE ONLY', {
    x: 0.5, y: 7.1, w: 9, h: 0.3,
    fontSize: 7,
    color: '555566',
    align: 'left',
  })
}
