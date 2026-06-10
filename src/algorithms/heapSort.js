export const HEAP_SORT_PSEUDOCODE = [
  { code: 'buildMaxHeap(arr)',                     comment: '// rearrange array into a max heap' },
  { code: '  for i = n/2-1 down to 0',            comment: '// heapify all non-leaf nodes' },
  { code: '    heapify(arr, n, i)',                comment: '// ensure subtree rooted at i is a heap' },
  { code: 'for i = n-1 down to 1',                comment: '// extract elements one by one' },
  { code: '  swap(arr[0], arr[i])',                comment: '// move current max to end' },
  { code: '  heapify(arr, i, 0)',                  comment: '// restore heap property for reduced heap' },
  { code: '    if largest != root',               comment: '// root is not the largest?' },
  { code: '      swap(arr[root], arr[largest])',   comment: '// swap root with largest' },
  { code: '      heapify(subtree)',                comment: '// recursively fix the affected subtree' },
  { code: 'return arr',                            comment: '// array is fully sorted' },
]

export function generateHeapSortSteps(array) {
  const steps = []
  const arr = [...array]
  const n = arr.length

  function heapify(arr, n, i) {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    steps.push({
      array: [...arr],
      comparing: [i, left < n ? left : i, right < n ? right : i].slice(0, left < n ? 3 : 1),
      swapping: [],
      sorted: [],
      activeLine: 6,
      description: `Heapify: checking node ${i} (value ${arr[i]}) against children`
    })

    if (left < n && arr[left] > arr[largest]) largest = left
    if (right < n && arr[right] > arr[largest]) largest = right

    if (largest !== i) {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, largest],
        sorted: [],
        activeLine: 7,
        description: `${arr[largest]} > ${arr[i]} → swapping to maintain heap property`
      })

      ;[arr[i], arr[largest]] = [arr[largest], arr[i]]

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, largest],
        sorted: [],
        activeLine: 8,
        description: `Swapped → recursively fixing subtree at index ${largest}`
      })

      heapify(arr, n, largest)
    }
  }

  // Build max heap
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    activeLine: 0,
    description: `Building max heap from array`
  })

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [],
      activeLine: 1,
      description: `Heapifying subtree rooted at index ${i}`
    })
    heapify(arr, n, i)
  }

  // Extract elements
  const sorted = []
  for (let i = n - 1; i > 0; i--) {
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [0, i],
      sorted: [...sorted],
      activeLine: 4,
      description: `Moving max element ${arr[0]} to position ${i}`
    })

    ;[arr[0], arr[i]] = [arr[i], arr[0]]
    sorted.push(i)

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      activeLine: 5,
      description: `${arr[i]} placed at final position ${i}. Restoring heap.`
    })

    heapify(arr, i, 0)
  }

  sorted.push(0)
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    activeLine: 9,
    description: '✅ Array is fully sorted!'
  })

  return steps
}