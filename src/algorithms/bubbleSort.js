export const BUBBLE_SORT_PSEUDOCODE = [
  { code: 'for i = 0 to n-2',                    comment: '// outer loop: each pass bubbles one element' },
  { code: '  for j = 0 to n-i-2',                comment: '// inner loop: compare adjacent pairs' },
  { code: '    if arr[j] > arr[j+1]',             comment: '// is left element bigger than right?' },
  { code: '      swap(arr[j], arr[j+1])',          comment: '// yes → swap them' },
  { code: '      swappedThisPass = true',          comment: '// mark that a swap happened this pass' },
  { code: '  if !swappedThisPass → break',        comment: '// no swaps = already sorted, stop early' },
  { code: 'return arr',                            comment: '// array is fully sorted' },
]

export function generateBubbleSortSteps(array) {
  const steps = []
  const arr = [...array]
  const n = arr.length
  const sorted = []

  for (let i = 0; i < n - 1; i++) {
    let swappedThisPass = false

    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        activeLine: 2,
        description: `Pass ${i + 1}: Comparing ${arr[j]} and ${arr[j + 1]}`
      })

      if (arr[j] > arr[j + 1]) {
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          activeLine: 3,
          description: `${arr[j]} > ${arr[j + 1]} → swapping`
        })

        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        swappedThisPass = true

        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          activeLine: 4,
          description: `Swapped → array is now [${arr}]`
        })
      }
    }

    sorted.push(n - 1 - i)

    if (!swappedThisPass) {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [...sorted],
        activeLine: 5,
        description: 'No swaps this pass → array is sorted early'
      })
      break
    }
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    activeLine: 6,
    description: '✅ Array is fully sorted!'
  })

  return steps
}