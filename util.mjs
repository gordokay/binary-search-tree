function mergeSort(arr) {
  if(arr.length === 1) return arr;
  const left = mergeSort(arr.slice(0, arr.length / 2));
  const right = mergeSort(arr.slice(arr.length / 2));
  let mergedArr = [];
  let leftPointer = 0;
  let rightPointer = 0;
  while(leftPointer < left.length && rightPointer < right.length) {
    if(left[leftPointer] < right[rightPointer]) {
      mergedArr.push(left[leftPointer]);
      leftPointer++;
    } else {
      mergedArr.push(right[rightPointer]);
      rightPointer++;
    }
  }
  if(leftPointer < left.length) {
    mergedArr = mergedArr.concat(left.slice(leftPointer));
  } else if (rightPointer < right.length) {
    mergedArr = mergedArr.concat(right.slice(rightPointer));
  }
  return mergedArr;
}

function removeDuplicates(arr) {
  const newArr = arr.slice();
  let pointer = 0;
  while(pointer < newArr.length - 1) {
    if(newArr[pointer] === newArr[pointer + 1]) {
      newArr.splice(pointer + 1, 1);
      continue;
    }
    pointer++;
  }
  return newArr;
}

export {mergeSort, removeDuplicates};