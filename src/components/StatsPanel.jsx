export default function StatsPanel({ stats, currentStepIndex, totalSteps }) {
  const progress = totalSteps > 0
    ? Math.round((currentStepIndex / (totalSteps - 1)) * 100)
    : 0

  return (
    <div className="stats-panel">
      <div className="stat">
        <span className="stat-label">Comparisons</span>
        <span className="stat-value">{stats.comparisons}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Swaps</span>
        <span className="stat-value">{stats.swaps}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Progress</span>
        <span className="stat-value">{progress}%</span>
      </div>
      <div className="stat">
        <span className="stat-label">Total Steps</span>
        <span className="stat-value">{totalSteps}</span>
      </div>
    </div>
  )
}