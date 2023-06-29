/*
Problem Statement :-

 Given an array of integers and a target value, you must determine which two integers' sum
equals the target and return a 2D array. Then merge the array into a single array with sorting (
ascending ) order, in the next step double the target value and find again the combination of
digits (can be multiple digits ) that are equal to the double targeted value and returned into a 2D
array.

Sample Input : [1, 3, 2, 2, -4, -6, -2, 8];
Target Value = 4,

Output: First Combination For “4” : [ [1,3],[2,2],[-4,8],[-6,2] ];
Merge Into a single Array : [-6,-4,1,2,2,2,3,8];
Second Combination For “8” : [ [ 1,3,2,2], [8,-4,2,2],....,[n,n,n,n] ]


*/

// ---------------------------------------------------------------------------------------------------------------------------------
//                                        SOLUTION
// ---------------------------------------------------------------------------------------------------------------------------------

function findTwoIntegers(arr, k) {
  // Array to store pairs of numbers that add up to the target value
  let ans = [];
  // Iterate through the array to find pairs
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      // Check if the absolute sum of the pair is equal to the target value
      if (Math.abs(arr[i] + arr[j]) === k) {
        // Create a pair array
        const pair = [arr[i], arr[j]];
        // Check if the pair already exists in the ans array
        if (!ans.some(([a, b]) => a === pair[0] && b === pair[1])) {
          // Add the pair to the ans array
          ans.push(pair);
        }
      }
    }
  }

  return ans;
}

function mergeCombination(arr) {
  let new_arr = [];
  // Iterate through the pairs array
  for (let i = 0; i < arr.length; i++) {
    // Iterate through each pair
    for (let j = 0; j < arr[i].length; j++) {
      // Push each number to the new_arr array
      new_arr.push(arr[i][j]);
    }
  }
  return new_arr;
}

function sortInAscendingOrder(arr) {
  // Sort the array in ascending order
  arr.sort((a, b) => a - b);
  return arr;
}

function findCombinations(arr, target) {
  // MultipleCombination function to find combinations recursively
  function findMultipleCombination(start, currComb, currSum, result) {
    if (currSum === target) {
      // Add the current combination to the result array
      result.push(currComb.slice());
      return;
    }

    for (let i = start; i < arr.length; i++) {
      const num = arr[i];

      // Skip duplicates to avoid duplicate combinations
      if (i > start && num === arr[i - 1]) {
        continue;
      }
      // Stop if the current sum exceeds the target
      if (currSum + num > target) {
        break;
      }
      // Add the current number to the combination
      currComb.push(num);
      // Recurse with the next index and updated sum
      findMultipleCombination(i + 1, currComb, currSum + num, result);
      // Remove the current number from the combination
      currComb.pop();
    }
  }

  const combinations = [];
  // Call the helper function to find
  findMultipleCombination(0, [], 0, combinations);

  return combinations;
}

let array = [1, 3, 2, 2, -4, -6, -2, 8];
let target_value = 4;

// created a function findTwointegers and passed the array and target value as  a parameter  and  stored the function into variables
let result = findTwoIntegers(array, target_value);
console.log("First Combination For ", target_value, " is : ", result);

// created a function for merge 2d array into a single array and  stored the function into variables
let mergedArr = mergeCombination(result);
console.log("Merge Into a single Array: ", mergedArr);

// created a function for Sort the array in ascending order and  stored the function into variables
let sortArr = sortInAscendingOrder(mergedArr);
console.log("Sorted  array in ascending order :", sortArr);


//created a function for  find multiple  Combination digits (can be multiple digits ) that are equal to the double targeted value 
let combinations = findCombinations(sortArr, target_value * 2);
console.log(
  "Multiple Combination For ",
  target_value * 2,
  " is : ",
  combinations
);
