/* You are given a sorted unique integer array nums.

Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.

Each range [a,b] in the list should be output as:

"a->b" if a != b
"a" if a == b


Example 1:

Input: nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]
Explanation: The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"
Example 2:

Input: nums = [0,2,3,4,6,8,9]
Output: ["0","2->4","6","8->9"]
Explanation: The ranges are:
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"
Example 3:

Input: nums = []
Output: []
Example 4:

Input: nums = [-1]
Output: ["-1"]
Example 5:

Input: nums = [0]
Output: ["0"]


Constraints:

0 <= nums.length <= 20
-231 <= nums[i] <= 231 - 1
All the values of nums are unique. */

const summaryRanges = (nums, [beginning, end] = [nums[0]]) => {
  // const result = [];
  // let [beginning, end] = [nums[0], nums[0]];
  // for (let i = 0; i < nums.length; i += 1) {
  //   const num = nums[i];
  //   // if next num is sequential and exists
  //   if ((nums[i + 1] === (num + 1))) {
  //     // end = next num
  //     end = nums[i + 1];
  //   } else {
  //     // if end === beginning
  //     if (end === beginning) {
  //       // push string(end) to result
  //       result.push(`${end}`);
  //     } else {
  //       // push beg->end string to result
  //       result.push(`${beginning}->${end}`);
  //     }
  //     [end, beginning] = [nums[i + 1], nums[i + 1]];
  //   }
  // }
  // return result;

  return nums.reduce((result, curr, i) => {
    const next = nums[i + 1];
    if (curr + 1 !== (next)) {
      result.push(end === beginning ? `${end}` : `${beginning}->${end}`);
      beginning = next;
    }
    end = next;
    return result;
  }, []);
}

console.log(summaryRanges([0, 1, 2, 4, 5, 7]));