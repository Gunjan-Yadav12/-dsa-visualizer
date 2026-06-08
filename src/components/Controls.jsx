export default function Controls({
  isPlaying, hasSteps, currentStepIndex, totalSteps,
  speed, algorithm, searchTarget,
  onStart, onPause, onReset, onNext, onPrev,
  onSpeedChange, onGenerateArray, onSearchTargetChange
}) {
  function handlePlayPause() {
    isPlaying ? onPause() : onStart()
  }

  return (
    <div className="controls">
      <button onClick={onGenerateArray}>🔀 New Array</button>

      <button onClick={handlePlayPause}>
        {isPlaying ? '⏸ Pause' : hasSteps ? '▶ Resume' : '▶ Play'}
      </button>

      <button onClick={onReset} disabled={!hasSteps}>⏹ Reset</button>

      <button onClick={onPrev} disabled={currentStepIndex === 0}>◀ Prev</button>

      <button
        onClick={onNext}
        disabled={totalSteps === 0 || currentStepIndex >= totalSteps - 1}
      >
        Next ▶
      </button>

      <div className="speed-control">
        <label>Speed</label>
        <input
          type="range"
          min="50"
          max="1000"
          value={speed}
          onChange={e => onSpeedChange(Number(e.target.value))}
        />
        <span>{speed}ms</span>
      </div>

      {algorithm === 'binary' && (
        <input
          type="number"
          className="search-input"
          placeholder="Search target..."
          value={searchTarget}
          onChange={e => onSearchTargetChange(e.target.value)}
        />
      )}

      <span className="step-counter">
        {totalSteps > 0 ? `Step ${currentStepIndex + 1} / ${totalSteps}` : ''}
      </span>
    </div>
  )
}