export const SELECTION_SORT_PSEUDOCODE = [
  { code: 'for i = 0 to n-2',                      comment: '// position to fill in this pass' },
  { code: '  minIdx = i',                           comment: '// assume current position is minimum' },
  { code: '  for j = i+1 to n-1',                  comment: '// scan rest of array for smaller element' },
  { code: '    if arr[j] < arr[minIdx]',            comment: '// found a new minimum?' },
  { code: '      minIdx = j',                       comment: '// update minimum index' },
  { code: '  if minIdx != i',                       comment: '// minimum is not already in place?' },
  { code: '    swap(arr[i], arr[minIdx])',           comment: '// place minimum at correct position' },
  { code: 'return arr',                             comment: '// array is fully sorted' },
]

export function generateSelectionSortSteps(array) {
  const steps = []
  const arr = [...array]
  const n = arr.length
  const sorted = []

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i

    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [...sorted],
      activeLine: 1,
      description: `Pass ${i + 1}: assuming position ${i} (value ${arr[i]}) is minimum`
    })

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparing: [minIdx, j],
        swapping: [],
        sorted: [...sorted],
        activeLine: 3,
        description: `Comparing current min ${arr[minIdx]} with ${arr[j]}`
      })

      if (arr[j] < arr[minIdx]) {
        minIdx = j
        steps.push({
          array: [...arr],
          comparing: [minIdx],
          swapping: [],
          sorted: [...sorted],
          activeLine: 4,
          description: `New minimum found: ${arr[minIdx]} at index ${minIdx}`
        })
      }
    }

    if (minIdx !== i) {
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sorted],
        activeLine: 6,
        description: `Placing minimum ${arr[i]} at position ${i}`
      })
    }

    sorted.push(i)
  }

  sorted.push(n - 1)
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    activeLine: 7,
    description: '✅ Array is fully sorted!'
  })

  return steps
}