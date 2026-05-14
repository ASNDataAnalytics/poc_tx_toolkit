// src/ppt/slides/ratingsSlide.js
import { PPT, scoreColor } from '../../pdf/theme.js'
import { addSlideHeader, addSlideFooter } from '../slideHelpers.js'
import { SURVEY } from '../../config/survey.js'
import { visiblePages, visibleQuestions } from '../../utils/evaluateCondition.js'

export function addRatingsSlide(prs, responses) {
  // Collect all visible likert questions
  const likertQs = []
  visiblePages(SURVEY, responses).forEach(page => {
    visibleQuestions(page.questions, responses).forEach(q => {
      if (q.type === 'likert') likertQs.push(q)
    })
  })

  if (likertQs.length === 0) return

  const slide = prs.addSlide()
  addSlideHeader(slide, prs, 'Satisfaction Ratings')
  addSlideFooter(slide, prs)

  const scores     = likertQs.map(q => Number(responses[q.id]) || 0)
  const validScores = scores.filter(s => s > 0)
  const avg = validScores.length
    ? (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(1)
    : 'N/A'

  // ── Average badge (top right) ──
  slide.addShape(prs.ShapeType.rect, {
    x: 10.8, y: 1.1, w: 2.2, h: 0.85,
    fill: { color: PPT.ink },
    line: { color: PPT.ink },
  })
  slide.addText([
    { text: avg, options: { fontSize: 22, bold: true, color: PPT.white } },
    { text: ' / 5', options: { fontSize: 12, color: 'aaaaaa' } },
  ], {
    x: 10.8, y: 1.1, w: 2.2, h: 0.55,
    align: 'center', valign: 'middle',
  })
  slide.addText('AVG SCORE', {
    x: 10.8, y: 1.65, w: 2.2, h: 0.3,
    fontSize: 7, color: PPT.accent,
    align: 'center', bold: true, charSpacing: 1.5,
  })

  // ── Bar chart ──
  // PptxGenJS charts need data in a specific shape:
  // { labels: [...], datasets: [{ label, data: [...] }] }
  const chartLabels = likertQs.map((q, i) => `Q${i + 1}`)
  const chartColors = scores.map(s => scoreColor(s, false))

  // PptxGenJS bar charts take one color per series, not per bar,
  // so we use a workaround: one single-bar series per question,
  // each with its own color.
  const chartData = likertQs.map((q, i) => ({
    name: `Q${i + 1}`,
    labels: chartLabels,
    values: scores.map((s, j) => (j === i ? s : 0)),
  }))

  slide.addChart(prs.ChartType.bar, chartData, {
    x: 0.4, y: 1.1, w: 10.2, h: 4.2,
    barDir:       'col',
    barGrouping:  'stacked',
    chartColors:  chartColors,
    valAxisMinVal: 0,
    valAxisMaxVal: 5,
    valAxisMajorUnit: 1,
    showLegend:   false,
    showValue:    true,
    dataLabelFontSize: 10,
    dataLabelColor: PPT.white,
    catAxisLabelColor: PPT.ink,
    catAxisLabelFontSize: 10,
    valAxisLabelColor: PPT.muted,
    valAxisLabelFontSize: 9,
    plotAreaFillColor: PPT.paper,
    chartAreaFillColor: 'f7f4ef',
  })

  // ── Question legend below chart ──
  likertQs.forEach((q, i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const x   = 0.4 + col * 6.4
    const y   = 5.55 + row * 0.4

    slide.addText([
      { text: `Q${i + 1}  `, options: { bold: true, color: PPT.accent, fontSize: 8 } },
      { text: q.label,        options: { color: PPT.muted,  fontSize: 8 } },
    ], { x, y, w: 6.2, h: 0.35 })
  })
}
