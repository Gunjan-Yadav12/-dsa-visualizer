import { useState, useEffect, useRef } from 'react'
import Visualizer from './components/Visualizer'
import Controls from './components/Controls'
import AlgorithmPicker from './components/AlgorithmPicker'
import StatsPanel from './components/StatsPanel'
import PseudocodePanel from './components/PseudocodePanel'
import { generateBubbleSortSteps, BUBBLE_SORT_PSEUDOCODE } from './algorithms/bubbleSort'
import { generateSelectionSortSteps, SELECTION_SORT_PSEUDOCODE } from './algorithms/selectionSort'
import { generateMergeSortSteps, MERGE_SORT_PSEUDOCODE } from './algorithms/mergeSort'
import { generateQuickSortSteps, QUICK_SORT_PSEUDOCODE } from './algorithms/quickSort'
import { generateBinarySearchSteps, BINARY_SEARCH_PSEUDOCODE } from './algorithms/binarySearch'
import { generateInsertionSortSteps, INSERTION_SORT_PSEUDOCODE } from './algorithms/insertionSort'
import { generateHeapSortSteps, HEAP_SORT_PSEUDOCODE } from './algorithms/heapSort'
import './App.css'

const ALGORITHMS = {
  bubble:    generateBubbleSortSteps,
  selection: generateSelectionSortSteps,
  merge:     generateMergeSortSteps,
  quick:     generateQuickSortSteps,
  binary:    (arr, target) => generateBinarySearchSteps(arr, target),
  insertion: generateInsertionSortSteps,
  heap: generateHeapSortSteps,
}

const PSEUDOCODES = {
  bubble:    BUBBLE_SORT_PSEUDOCODE,
  selection: SELECTION_SORT_PSEUDOCODE,
  merge:     MERGE_SORT_PSEUDOCODE,
  quick:     QUICK_SORT_PSEUDOCODE,
  binary:    BINARY_SEARCH_PSEUDOCODE,
  insertion: INSERTION_SORT_PSEUDOCODE,
  heap: HEAP_SORT_PSEUDOCODE,
}
const COMPLEXITY = {
  bubble:    { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  selection: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  merge:     { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
  quick:     { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
  binary:    { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
  insertion: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  heap: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)' },
}

function generateRandomArray(size = 20) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10)
}

const EMPTY_STEP = {
  array:      [],
  comparing:  [],
  swapping:   [],
  sorted:     [],
  activeLine: -1,
  description: 'Press Play to start'
}

export default function App() {
  const [array, setArray]                       = useState(generateRandomArray())
  const [algorithm, setAlgorithm]               = useState('bubble')
  const [steps, setSteps]                       = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying]               = useState(false)
  const [speed, setSpeed]                       = useState(300)
  const [stats, setStats]                       = useState({ comparisons: 0, swaps: 0 })
  const [searchTarget, setSearchTarget]         = useState('')
  const intervalRef = useRef(null)

  const currentStep = steps[currentStepIndex] || { ...EMPTY_STEP, array }

  function handleGenerateArray() {
    const newArray = generateRandomArray()
    setArray(newArray)
    setSteps([])
    setCurrentStepIndex(0)
    setIsPlaying(false)
    setStats({ comparisons: 0, swaps: 0 })
  }

  function handleAlgorithmChange(algo) {
    setAlgorithm(algo)
    setSteps([])
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  function handleStart() {
    let generatedSteps = steps

    if (steps.length === 0) {
      const fn = ALGORITHMS[algorithm]
      generatedSteps = algorithm === 'binary'
        ? fn([...array], searchTarget)
        : fn([...array])

      let comparisons = 0, swaps = 0
      generatedSteps.forEach(s => {
        if (s.comparing?.length >= 1) comparisons++
        if (s.swapping?.length === 2) swaps++
      })

      setSteps(generatedSteps)
      setStats({ comparisons, swaps })
      setCurrentStepIndex(0)
    }

    setIsPlaying(true)
  }

  function handlePause()  { setIsPlaying(false) }
  function handleReset()  { setIsPlaying(false); setCurrentStepIndex(0) }
  function handleNext()   { setCurrentStepIndex(p => Math.min(p + 1, steps.length - 1)) }
  function handlePrev()   { setCurrentStepIndex(p => Math.max(p - 1, 0)) }

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, speed)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPlaying, speed, steps.length])

  return (
  <div className="app">
    <h1> DSA Visualizer</h1>

    <AlgorithmPicker algorithm={algorithm} onChange={handleAlgorithmChange} />

    <div className="complexity-bar">
      <span>Best: <strong>{COMPLEXITY[algorithm].best}</strong></span>
      <span>Average: <strong>{COMPLEXITY[algorithm].average}</strong></span>
      <span>Worst: <strong>{COMPLEXITY[algorithm].worst}</strong></span>
      <span>Space: <strong>{COMPLEXITY[algorithm].space}</strong></span>
    </div>

    <Controls
      isPlaying={isPlaying}
      hasSteps={steps.length > 0}
      currentStepIndex={currentStepIndex}
      totalSteps={steps.length}
      speed={speed}
      algorithm={algorithm}
      searchTarget={searchTarget}
      onStart={handleStart}
      onPause={handlePause}
      onReset={handleReset}
      onNext={handleNext}
      onPrev={handlePrev}
      onSpeedChange={setSpeed}
      onGenerateArray={handleGenerateArray}
      onSearchTargetChange={setSearchTarget}
    />

    <div className="visualizer-row">
      <Visualizer step={currentStep} />
      <PseudocodePanel
        pseudocode={PSEUDOCODES[algorithm]}
        activeLine={currentStep.activeLine ?? -1}
      />
    </div>

    <StatsPanel
      stats={stats}
      currentStepIndex={currentStepIndex}
      totalSteps={steps.length}
    />
  </div>
)
}