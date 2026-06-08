export const BINARY_SEARCH_PSEUDOCODE = [
  { code: 'arr = sort(arr)',                        comment: '// binary search requires sorted array' },
  { code: 'left = 0, right = n-1',                 comment: '// search space is entire array' },
  { code: 'while left <= right',                   comment: '// keep searching while space exists' },
  { code: '  mid = (left + right) / 2',            comment: '// check middle of current search space' },
  { code: '  if arr[mid] == target',               comment: '// found it?' },
  { code: '    return mid',                         comment: '// yes → return index' },
  { code: '  if arr[mid] < target',                comment: '// target is in right half?' },
  { code: '    left = mid + 1',                    comment: '// eliminate left half' },
  { code: '  else right = mid - 1',               comment: '// eliminate right half' },
  { code: 'return -1',                             comment: '// target not found' },
]

export function generateBinarySearchSteps(array, target) {
  const steps = []
  const arr = [...array].sort((a, b) => a - b)
  const searchFor = (target !== undefined && target !== '')
    ? Number(target)
    : arr[Math.floor(arr.length / 2)]

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    activeLine: 0,
    description: `Array sorted. Searching for ${searchFor}`
  })

  let left = 0
  let right = arr.length - 1
  let found = false

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    left, right,
    activeLine: 1,
    description: `Search space: [0..${right}]`
  })

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    steps.push({
      array: [...arr],
      comparing: [mid],
      swapping: [],
      sorted: [],
      left, right, mid,
      activeLine: 3,
      description: `mid = ${mid}, arr[mid] = ${arr[mid]}, target = ${searchFor}`
    })

    if (arr[mid] === searchFor) {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [mid],
        left, right, mid,
        activeLine: 5,
        description: `✅ Found ${searchFor} at index ${mid}!`
      })
      found = true
      break
    } else if (arr[mid] < searchFor) {
      steps.push({
        array: [...arr],
        comparing: [mid],
        swapping: [],
        sorted: [],
        left, right, mid,
        activeLine: 7,
        description: `${arr[mid]} < ${searchFor} → eliminate left half`
      })
      left = mid + 1
    } else {
      steps.push({
        array: [...arr],
        comparing: [mid],
        swapping: [],
        sorted: [],
        left, right, mid,
        activeLine: 8,
        description: `${arr[mid]} > ${searchFor} → eliminate right half`
      })
      right = mid - 1
    }
  }

  if (!found) {
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      activeLine: 9,
      description: `❌ ${searchFor} not found in array`
    })
  }

  return steps
}