// src/ppt/slides/npsSlide.js
import { PPT, npsColor, npsLabel } from '../../pdf/theme.js'
import { addSlideHeader, addSlideFooter } from '../slideHelpers.js'

export function addNpsSlide(prs, responses) {
  const nps   = Number(responses.nps ?? 7)
  const color = npsColor(nps, false)
  const label = npsLabel(nps)

  const slide = prs.addSlide()
  addSlideHeader(slide, prs, 'Recommendation Score (NPS)')
  addSlideFooter(slide, prs)

  // ── Large NPS number (center) ──
  slide.addText(String(nps), {
    x: 0, y: 1.6, w: PPT.slideW, h: 2.4,
    fontSize: 120,
    bold: true,
    color,
    align: 'center',
    valign: 'middle',
  })

  // "out of 10" label
  slide.addText('out of 10', {
    x: 0, y: 3.9, w: PPT.slideW, h: 0.5,
    fontSize: 16,
    color: PPT.muted,
    align: 'center',
  })

  // ── Category badge ──
  const badgeW = 2.8
  const badgeX = (PPT.slideW - badgeW) / 2

  slide.addShape(prs.ShapeType.rect, {
    x: badgeX, y: 4.55, w: badgeW, h: 0.65,
    fill: { color },
    line: { color },
  })

  slide.addText(label.toUpperCase(), {
    x: badgeX, y: 4.55, w: badgeW, h: 0.65,
    fontSize: 16,
    bold: true,
    color: PPT.white,
    align: 'center',
    valign: 'middle',
    charSpacing: 3,
  })

  // ── NPS scale bar ──
  const barX = 1.2
  const barY = 5.5
  const barW = PPT.slideW - barX * 2
  const barH = 0.3

  // Background track
  slide.addShape(prs.ShapeType.rect, {
    x: barX, y: barY, w: barW, h: barH,
    fill: { color: PPT.border },
    line: { color: PPT.border },
  })

  // Filled portion
  const fillW = (nps / 10) * barW
  if (fillW > 0) {
    slide.addShape(prs.ShapeType.rect, {
      x: barX, y: barY, w: fillW, h: barH,
      fill: { color },
      line: { color },
    })
  }

  // Scale labels
  slide.addText('0\nNot at all likely', {
    x: barX - 0.1, y: barY + barH + 0.05, w: 1.2, h: 0.5,
    fontSize: 7, color: PPT.muted, align: 'left',
  })
  slide.addText('10\nExtremely likely', {
    x: barX + barW - 1.1, y: barY + barH + 0.05, w: 1.2, h: 0.5,
    fontSize: 7, color: PPT.muted, align: 'right',
  })

  // ── Zone labels under bar ──
  const zones = [
    { label: 'Detractors',  range: '0–6',  color: PPT.danger,  x: barX,             w: barW * 0.7  },
    { label: 'Passives',    range: '7–8',  color: PPT.warning, x: barX + barW * 0.7, w: barW * 0.2  },
    { label: 'Promoters',   range: '9–10', color: PPT.success, x: barX + barW * 0.9, w: barW * 0.1  },
  ]

  zones.forEach(zone => {
    slide.addText(`${zone.label} (${zone.range})`, {
      x: zone.x, y: barY - 0.35, w: zone.w, h: 0.28,
      fontSize: 7, color: zone.color, align: 'center', bold: true,
    })
  })
}
