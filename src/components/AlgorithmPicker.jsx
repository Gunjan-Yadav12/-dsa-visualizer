export default function AlgorithmPicker({ algorithm, onChange }) {
  return (
    <div className="algorithm-picker">
      <select value={algorithm} onChange={e => onChange(e.target.value)}>
        <option value="bubble">Bubble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="quick">Quick Sort</option>
        <option value="binary">Binary Search</option>
        <option value="insertion">Insertion Sort</option>
        <option value="heap">Heap Sort</option>
      </select>
    </div>
  )
}