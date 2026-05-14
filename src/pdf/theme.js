// src/pdf/theme.js

// ── With # — for pdfmake and CSS ─────────────────────────────────────────────
export const THEME = {
  ink:    '#1a1a2e',
  paper:  '#f7f4ef',
  accent: '#c8533a',
  gold:   '#d4a843',
  muted:  '#7a7068',
  border: '#e2ddd6',
  white:  '#ffffff',
  success: '#4a9e6a',
  warning: '#d4a843',
  danger:  '#c8533a',

  fontBody:    'Roboto',
  fontDisplay: 'Roboto',
  pageMargins: [40, 50, 40, 60],

  npsPromoter: 9,
  npsPassive:  7,
}

// ── Without # — for PptxGenJS ─────────────────────────────────────────────────
export const PPT = {
  ink:    '1a1a2e',
  paper:  'f7f4ef',
  accent: 'c8533a',
  gold:   'd4a843',
  muted:  '7a7068',
  border: 'e2ddd6',
  white:  'ffffff',
  success: '4a9e6a',
  warning: 'd4a843',
  danger:  'c8533a',

  slideW: 13.33,
  slideH: 7.5,

  titleSize:   36,
  headingSize: 24,
  bodySize:    14,
  labelSize:   11,
  captionSize:  9,
}

// ── Shared helpers ────────────────────────────────────────────────────────────

export function npsColor(score, withHash = true) {
  const c = score >= THEME.npsPromoter ? '4a9e6a'
          : score >= THEME.npsPassive  ? 'd4a843'
          : 'c8533a'
  return withHash ? `#${c}` : c
}

export function npsLabel(score) {
  if (score >= THEME.npsPromoter) return 'Promoter'
  if (score >= THEME.npsPassive)  return 'Passive'
  return 'Detractor'
}

export function scoreColor(score, withHash = true) {
  const c = score >= 4 ? 'c8533a'
          : score >= 3 ? 'd4a843'
          : '7a7068'
  return withHash ? `#${c}` : c
}