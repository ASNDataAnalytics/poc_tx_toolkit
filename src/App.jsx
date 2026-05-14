// src/App.jsx
//
// Holds all survey state. Coordinates navigation, branching, and PDF download.
// This is the only place that connects the survey config, the UI components,
// and the PDF builder.

import { useState, useCallback } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
// import pdfFonts from 'pdfmake/build/vfs_fonts'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

import { SURVEY, SURVEY_TITLE, SURVEY_SUBTITLE } from './config/survey.js'
import { visiblePages }  from './utils/evaluateCondition.js'
import { buildReport }   from './pdf/buildReport.js'
import { buildDeck }     from './ppt/buildDeck.js'

import ProgressBar   from './components/ProgressBar.jsx'
import SurveyPage    from './components/SurveyPage.jsx'
import SuccessScreen from './components/SuccessScreen.jsx'

// pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.vfs = pdfFonts?.pdfMake?.vfs ?? pdfFonts

export default function App() {
  const [responses, setResponses]   = useState({})
  const [pageIndex, setPageIndex]   = useState(0)   // index into visiblePages array
  const [submitted, setSubmitted]   = useState(false)

  // Recompute visible pages every render (branching logic)
  const pages      = visiblePages(SURVEY, responses)
  const totalPages = pages.length
  const currentPage = pages[pageIndex]

  // Update a single answer
  const handleAnswer = useCallback((questionId, value) => {
    setResponses(prev => ({ ...prev, [questionId]: value }))
  }, [])

  // Move to next visible page
  const handleNext = () => {
    if (pageIndex < totalPages - 1) {
      setPageIndex(i => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setSubmitted(true)
    }
  }

  // Move to previous visible page
  const handleBack = () => {
    if (pageIndex > 0) {
      setPageIndex(i => i - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Download the PDF
  const handleDownloadPdf = () => {
    const docDef  = buildReport(responses)
    const name    = (responses['name'] || 'respondent').toLowerCase().replace(/\s+/g, '-')
    const date    = new Date().toISOString().slice(0, 10)
    pdfMake.createPdf(docDef).download(`survey-report-${name}-${date}.pdf`)
  }

  const handleDownloadPpt = () => {
    buildDeck(responses)
  }

  // Reset to start
  const handleReset = () => {
    setResponses({})
    setPageIndex(0)
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      {/* ── Site header ── */}
      <header className="site-header">
        <div className="header-diamond" />
        <div>
          <h1 className="header-title">{SURVEY_TITLE}</h1>
          <p className="header-sub">{SURVEY_SUBTITLE}</p>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="main-wrap">
        {submitted ? (
          <SuccessScreen
            onDownloadPdf={handleDownloadPdf}
            onDownloadPpt={handleDownloadPpt}
            onReset={handleReset} 
          />
        ) : (
          <>
            <ProgressBar
              current={pageIndex + 1}
              total={totalPages}
              title={currentPage?.title}
            />

            {currentPage && (
              <SurveyPage
                page={currentPage}
                responses={responses}
                onAnswer={handleAnswer}
              />
            )}

            {/* ── Navigation ── */}
            <div className="nav-row">
              <div>
                {pageIndex > 0 && (
                  <button className="btn btn-outline" onClick={handleBack}>
                    ← Back
                  </button>
                )}
              </div>
              <button className="btn btn-primary" onClick={handleNext}>
                {pageIndex < totalPages - 1 ? 'Next →' : 'Generate Report ↓'}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
