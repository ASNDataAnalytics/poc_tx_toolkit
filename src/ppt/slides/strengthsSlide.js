// src/ppt/slides/strengthsSlide.js
import { PPT } from '../../pdf/theme.js'
import { addSlideHeader, addSlideFooter } from '../slideHelpers.js'

// A set of distinct colors for the strengths chart segments
const SEGMENT_COLORS = [
  'c8533a', 'd4a843', '4a9e6a', '3a7fc8', '9b59b6',
  'e67e22', '1abc9c', 'e74c3c', '2ecc71', 'f39c12',
]

export function addStrengthsSlide(prs, responses) {
  const strengths = responses.strengths
  if (!strengths || !Array.isArray(strengths) || strengths.length === 0) return

  const slide = prs.addSlide()
  addSlideHeader(slide, prs, 'Areas of Strength')
  addSlideFooter(slide, prs)

  // ── Donut / pie chart ──
  const chartData = [{
    name:   'Strengths',
    labels: strengths,
    values: strengths.map(() => 1),   // equal weight — just showing presence
  }]

  slide.addChart(prs.ChartType.doughnut, chartData, {
    x: 0.3, y: 1.2, w: 5.8, h: 5.2,
    chartColors:       strengths.map((_, i) => SEGMENT_COLORS[i % SEGMENT_COLORS.length]),
    showLegend:        true,
    legendPos:         'b',
    legendFontSize:    9,
    legendColor:       PPT.ink,
    dataLabelFontSize: 9,
    dataLabelColor:    PPT.white,
    showValue:         false,
    showPercent:       true,
    holeSize:          55,
    chartAreaFillColor: 'f7f4ef',
  })

  // ── Pill tags (right side) ──
  const tagW  = 6.2
  const tagH  = 0.52
  const tagX  = 6.5
  const gap   = 0.16
  const startY = 1.4

  strengths.forEach((s, i) => {
    const tagColor = SEGMENT_COLORS[i % SEGMENT_COLORS.length]
    const y = startY + i * (tagH + gap)

    slide.addShape(prs.ShapeType.rect, {
      x: tagX, y, w: tagW, h: tagH,
      fill: { color: tagColor },
      line: { color: tagColor },
    })

    slide.addText(s, {
      x: tagX + 0.15, y, w: tagW - 0.15, h: tagH,
      fontSize: 12,
      color: PPT.white,
      bold: true,
      valign: 'middle',
    })
  })
}
