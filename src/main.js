const BinarySearchTree = require("./BinarySearchTree");

binarySearchTree = new BinarySearchTree(5, 2);

// insert
binarySearchTree.insert(2, 1);  // not a BST if .insert(2, 7) in this case
binarySearchTree.insert(19, 4);
binarySearchTree.insert(15, 3);
// binarySearchTree.insert(28);
// binarySearchTree.insert(30);
// binarySearchTree.insert(10);
// binarySearchTree.insert(18);

console.log(binarySearchTree.left.key);
console.log(binarySearchTree.right.key);

// find
binarySearchTree.find(2)

const preOrderValues = binarySearchTree.dfsPreOrder();
const inOrderValues = binarySearchTree.dfsInOrder();
const postOrderValues = binarySearchTree.dfsPostOrder();

console.log(preOrderValues);
console.log(inOrderValues);
console.log(postOrderValues);

console.log(binarySearchTree.isBST());

// remove
binarySearchTree.remove(19);
// console.log(binarySearchTree);