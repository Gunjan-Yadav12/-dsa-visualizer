export const QUICK_SORT_PSEUDOCODE = [
  { code: 'quickSort(arr, low, high)',              comment: '// sort between low and high indices' },
  { code: '  if low >= high → return',             comment: '// base case: nothing to sort' },
  { code: '  pivot = arr[high]',                   comment: '// choose last element as pivot' },
  { code: '  i = low - 1',                         comment: '// i tracks boundary of smaller elements' },
  { code: '  for j = low to high-1',               comment: '// j scans every element' },
  { code: '    if arr[j] <= pivot',                comment: '// current element belongs left of pivot?' },
  { code: '      i++ and swap(arr[i], arr[j])',    comment: '// expand left region, move element in' },
  { code: '  swap(arr[i+1], arr[high])',           comment: '// place pivot in its final position' },
  { code: '  quickSort(left partition)',           comment: '// recursively sort left of pivot' },
  { code: '  quickSort(right partition)',          comment: '// recursively sort right of pivot' },
  { code: 'return arr',                            comment: '// fully sorted' },
]

export function generateQuickSortSteps(array) {
  const steps = []
  const arr = [...array]

  function partition(arr, low, high) {
    const pivot = arr[high]
    let i = low - 1

    steps.push({
      array: [...arr],
      comparing: [high],
      swapping: [],
      sorted: [],
      pivot: high,
      activeLine: 2,
      description: `Pivot chosen: ${pivot} at index ${high}`
    })

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, high],
        swapping: [],
        sorted: [],
        pivot: high,
        activeLine: 5,
        description: `Comparing ${arr[j]} with pivot ${pivot}`
      })

      if (arr[j] <= pivot) {
        i++
        if (i !== j) {
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          steps.push({
            array: [...arr],
            comparing: [],
            swapping: [i, j],
            sorted: [],
            pivot: high,
            activeLine: 6,
            description: `${arr[i]} <= pivot → swapped ${arr[i]} and ${arr[j]}`
          })
        }
      }
    }

    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [i + 1, high],
      sorted: [i + 1],
      pivot: i + 1,
      activeLine: 7,
      description: `Pivot ${pivot} placed at final position ${i + 1}`
    })

    return i + 1
  }

  function quickSort(arr, low, high) {
    if (low >= high) return
    const pi = partition(arr, low, high)
    quickSort(arr, low, pi - 1)
    quickSort(arr, pi + 1, high)
  }

  quickSort(arr, 0, arr.length - 1)

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    activeLine: 10,
    description: '✅ Array is fully sorted!'
  })

  return steps
}