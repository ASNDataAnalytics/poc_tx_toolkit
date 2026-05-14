// src/components/ProgressBar.jsx
export default function ProgressBar({ current, total, title }) {
  const pct = Math.round(((current - 1) / total) * 100)

  return (
    <div className="progress-wrap">
      <div className="progress-meta">
        <span className="progress-step">Page {current} of {total}</span>
        <span className="progress-title">{title}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
