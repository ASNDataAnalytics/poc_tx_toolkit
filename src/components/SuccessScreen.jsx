export default function SuccessScreen({ onDownloadPdf, onDownloadPpt, onReset }) {
  return (
    <div className="success-screen">
      <div className="success-icon-wrap">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h2 className="success-title">Survey complete</h2>
      <p className="success-desc">Choose a format to download your report. Nothing has been transmitted — all data stays in this browser.</p>

      <div className="download-options">
        <button className="download-card" onClick={onDownloadPdf}>
          <div className="download-card-icon pdf">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/><line x1="9" y1="11" x2="15" y2="11"/></svg>
          </div>
          <div className="download-card-body">
            <div className="download-card-title">Download PDF report</div>
            <div className="download-card-desc">Formatted for sharing or printing</div>
          </div>
          <div className="download-card-right">
            <span className="download-ext pdf">.pdf</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </div>
        </button>

        <button className="download-card" onClick={onDownloadPpt}>
          <div className="download-card-icon ppt">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div className="download-card-body">
            <div className="download-card-title">Download PowerPoint deck</div>
            <div className="download-card-desc">Editable slides for presentations</div>
          </div>
          <div className="download-card-right">
            <span className="download-ext ppt">.pptx</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </div>
        </button>
      </div>

      <button className="btn btn-ghost" onClick={onReset}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '5px', verticalAlign: '-1px'}}><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
        Start a new survey
      </button>
    </div>
  )
}