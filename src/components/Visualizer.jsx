export default function Visualizer({ step }) {
  const { array, comparing, swapping, sorted, pivot } = step
  const maxVal = Math.max(...array)

  return (
    <div>
      <div className="visualizer">
        {array.map((value, index) => {
          let barClass = 'bar'
          if (sorted.includes(index))    barClass += ' sorted'
          else if (pivot === index)       barClass += ' pivot'
          else if (swapping.includes(index))  barClass += ' swapping'
          else if (comparing.includes(index)) barClass += ' comparing'

          return (
            <div
              key={index}
              className={barClass}
              style={{ height: `${(value / maxVal) * 100}%` }}
            >
              <span className="bar-label">{value}</span>
            </div>
          )
        })}
      </div>
      <p className="step-description">{step.description}</p>
    </div>
  )
}