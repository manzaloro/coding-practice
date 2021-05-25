/* Given a linked list, swap every two adjacent nodes and return its head. You
must solve the problem without modifying the values in the list's nodes (i.e.,
only nodes themselves may be changed.)

Example 1:

Input: head = [1,2,3,4] Output: [2,1,4,3] Example 2:

Input: head = [] Output: [] Example 3:

Input: head = [1] Output: [1]

Constraints:

The number of nodes in the list is in the range [0, 100].  0 <= Node.val <= 100
*/

const swapPairs = (head) => {
  if (!head || !head.next) return head;

  const firstNode = head;
  const secondNode = head.next;

  // Eventually the firstNode next will be null when you reach the end of the
  // list. Remaining nodes are passed to the recursive call.
  firstNode.next = swapPairs(secondNode.next);
  secondNode.next = firstNode;

  // Return secondNode because eventually it's going to be the head
  return secondNode;
};
