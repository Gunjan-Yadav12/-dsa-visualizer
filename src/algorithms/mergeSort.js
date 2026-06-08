export const MERGE_SORT_PSEUDOCODE = [
  { code: 'mergeSort(arr, left, right)',            comment: '// entry point: sort between left and right' },
  { code: '  if left >= right → return',           comment: '// base case: single element is sorted' },
  { code: '  mid = (left + right) / 2',            comment: '// find midpoint to split array' },
  { code: '  mergeSort(arr, left, mid)',            comment: '// recursively sort left half' },
  { code: '  mergeSort(arr, mid+1, right)',         comment: '// recursively sort right half' },
  { code: '  merge(left, mid, right)',              comment: '// merge two sorted halves' },
  { code: '    if leftArr[i] <= rightArr[j]',      comment: '// compare heads of both halves' },
  { code: '      place leftArr[i]',                comment: '// left element is smaller, place it' },
  { code: '      place rightArr[j]',               comment: '// right element is smaller, place it' },
  { code: 'return arr',                            comment: '// fully sorted' },
]

export function generateMergeSortSteps(array) {
  const steps = []
  const arr = [...array]

  function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1)
    const rightArr = arr.slice(mid + 1, right + 1)
    let i = 0, j = 0, k = left

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      activeLine: 5,
      description: `Merging halves [${leftArr}] and [${rightArr}]`
    })

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        comparing: [left + i, mid + 1 + j],
        swapping: [],
        sorted: [],
        activeLine: 6,
        description: `Comparing ${leftArr[i]} and ${rightArr[j]}`
      })

      if (leftArr[i] <= rightArr[j]) {
        arr[k++] = leftArr[i++]
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [k - 1, k - 1],
          sorted: [],
          activeLine: 7,
          description: `Placed ${arr[k - 1]} at position ${k - 1}`
        })
      } else {
        arr[k++] = rightArr[j++]
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [k - 1, k - 1],
          sorted: [],
          activeLine: 8,
          description: `Placed ${arr[k - 1]} at position ${k - 1}`
        })
      }
    }

    while (i < leftArr.length) arr[k++] = leftArr[i++]
    while (j < rightArr.length) arr[k++] = rightArr[j++]
  }

  function mergeSort(arr, left, right) {
    if (left >= right) {
      steps.push({
        array: [...arr],
        comparing: [left],
        swapping: [],
        sorted: [],
        activeLine: 1,
        description: `Base case: single element ${arr[left]}, already sorted`
      })
      return
    }

    const mid = Math.floor((left + right) / 2)

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      activeLine: 2,
      description: `Splitting: mid = ${mid}, left=[${left}..${mid}] right=[${mid + 1}..${right}]`
    })

    mergeSort(arr, left, mid)
    mergeSort(arr, mid + 1, right)
    merge(arr, left, mid, right)
  }

  mergeSort(arr, 0, arr.length - 1)

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    activeLine: 9,
    description: '✅ Array is fully sorted!'
  })

  return steps
}