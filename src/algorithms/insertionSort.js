export const INSERTION_SORT_PSEUDOCODE = [
  { code: 'for i = 1 to n-1',                    comment: '// start from second element' },
  { code: '  key = arr[i]',                       comment: '// element to be inserted' },
  { code: '  j = i - 1',                          comment: '// start comparing with left' },
  { code: '  while j >= 0 and arr[j] > key',      comment: '// shift larger elements right' },
  { code: '    arr[j+1] = arr[j]',                comment: '// shift element one position right' },
  { code: '    j = j - 1',                        comment: '// move left' },
  { code: '  arr[j+1] = key',                     comment: '// place key in correct position' },
  { code: 'return arr',                           comment: '// array is sorted' },
]

export function generateInsertionSortSteps(array) {
  const steps = []
  const arr = [...array]
  const n = arr.length
  const sorted = [0]

  for (let i = 1; i < n; i++) {
    const key = arr[i]
    let j = i - 1

    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [...sorted],
      activeLine: 1,
      description: `Picking key = ${key} at index ${i}`
    })

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        activeLine: 3,
        description: `${arr[j]} > ${key} → shifting ${arr[j]} right`
      })

      arr[j + 1] = arr[j]

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [j, j + 1],
        sorted: [...sorted],
        activeLine: 4,
        description: `Shifted ${arr[j + 1]} to position ${j + 1}`
      })

      j = j - 1
    }

    arr[j + 1] = key
    sorted.push(i)

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      activeLine: 6,
      description: `Inserted ${key} at position ${j + 1}`
    })
  }

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