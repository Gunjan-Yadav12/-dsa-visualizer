export default function PseudocodePanel({ pseudocode, activeLine }) {
  return (
    <div className="pseudocode-panel">
      <div className="pseudocode-header">Pseudocode</div>
      <div className="pseudocode-body">
        {pseudocode.map((line, index) => (
          <div
            key={index}
            className={`pseudocode-line ${activeLine === index ? 'active-line' : ''}`}
          >
            <span className="line-number">{index + 1}</span>
            <span className="line-code">{line.code}</span>
            <span className="line-comment">{line.comment}</span>
          </div>
        ))}
      </div>
    </div>
  )
}