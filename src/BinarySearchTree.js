class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  bfs(tree, values = []) {
    const queue = new Queue();
    queue.enqueue(tree); // Start the traversal at the tree and add the tree node to the queue to kick off the BFS

    let node = queue.dequeue(); // Remove from the queue

    while (node) {
      values.push(node.value); // Add that value from the queue to an array

      if (node.left) {
        queue.enqueue(node.left); // Add the left child to the queue
      }

      if (node.right) {
        queue.enqueue(node.right); // Add the right child to the queue
      }
      
      node = queue.dequeue();
    }

    return values;
  }
  
  dfsInOrder(values = []) {
    // First, process the left node recursively
    if (this.left) {
      values = this.left.dfsInOrder(values);
    }

    // Next, process the current node
    values.push(this.value);

    if (this.right) {
      values = this.right.dfsInOrder(values);
    }

    return values;
  }

  dfsPreOrder(values=[]) {
    // First, process the current node
    values.push(this.value);

    // Next, process theh left node recursively
    if (this.left) {
      values = this.left.dfsPreOrder(values);
    }

    // Finally, process the right node recursively
    if (this.right) {
      values = this.right.dfsPreOrder(values);
    }

    return values;
  }

  dfsPostOrder(values = []) {
    // First, process the left node recursively
    if (this.left) {
      values = this.left.dfsPostOrder(values);
    }

    // Next, process the right node recursively
    if (this.right) {
      values = this.right.dfsPostOrder(values);
    }

    // Finally, process the current node
    values.push(this.value);

    return values;
  }

  find(key) {
    // If the item is found at the root, then return that value.
    if (this.key == key) {
      return this.value;
    }
    /* If the item that you are looking for is less than the root,
           then follow the left child.
           If there is an existing left child,
           then recursively check its left and/or right child
           until you find the item. */
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    /* If the item that you are looking for is greater than the root,
           then follow the right child.
           If there is an existing right child,
           then recursively check its left and/or right child
           until you find the item. */
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    // You have searched the tree, and the item isn't in the item isn't in the tree.
    else {
      throw new Error('Key Not Found');
    }
  }

  insert(key, value) {
    // If the tree is emoty then this key being inserted is the root node of the tree.
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }

    /* If the tree already exists, then start at the root,
           and compare it to the key that you want to insert.
           If the new key is less than the node's key,
           then the new node needs to live in the left-hand branch. */
    else if (key < this.key) {
      /* If the existing node does not have a left child,
               meaning that the `left` pointer is empty,
               then you can just instantiate and insert the new node
               as the left child of that node, passing `this` as the parent. */
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      /* If the node has an existing left child,
        then you recursively call the `insert()` method
        so that the node is added further down the tree. */
      else {
        this.left.insert(key, value);
      }
    }
    /* Similarly, if the new key is greater than the node's key,
      then you do the same thing, but on the right-hand side. */
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      /* If the node only has a left chile,
        then you replace the node with its left child. */
      else if (this.left) {
        this._replaceWith(this.left);
      }
      /* An similarily, if the node onlay has a right child,
        then you replace it with its right child. */
      else if (this.right) {
        this._replaceWith(this.right);
      }
      /* If the node has no children, then
        simply remove it and any references to it
        by calling `this._replaceWith(null)`. */
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    } 
    else if (key > this.key && this.right) {
      this.right.remove(key);
    } 
    else {
      throw new Error('Key Not Found');
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  // Extra methods

  findKthLargestValue(k) {
    // Use the existing dfsInOrder() method to traverse the tree
    const values = this.dfsInOrder();
    const kthIndex = values.length - k;

    // Ensure that the index is within the bounds of the array.
    if (kthIndex >= 0) {
      return values[kthIndex];
    } else {
      console.error("k value exceeds the size of the BST.");
    }
  }

  getHeight(currentHeight = 0) {
    // BASE CASE:
    // If the current node doesn't have a left or right child,
    // then the base case is reached, and the function can return the height.
    if (!this.left && !this.right) return currentHeight;

    // RECURSIVE CASE 
    // Otherwise, compute the new height.
    const newHeight = currentHeight + 1;

    // If there's no left child, recurse down the right subtree only,
    // passing down the height of the current node.
    if (!this.left) return this.right.getHeight(newHeight);

    // If there's no right child, recurse down the left subtree only,
    // passing down the height of the current node.
    if (!this.right) return this.left.getHeight(newHeight);

    // If both children exist, recurse down both subtrees,
    // passing down the height of the current node.
    const leftHeight = this.left.getHeight(newHeight);
    const rightHeight = this.right.getHeight(newHeight);

    // Return the greaer of the left or right subtree heights.
    return Math.max(leftHeight, rightHeight);
  }

  isBST() {
    // Use the existing dfsInOrder() method to traverse the tree.
    const values = this.dfsInOrder();

    // Check if the array returned by the in-order DFS is a sorted array.
    for (let i = 1; i < values.length; i++) {
      // Compare the current and previous values.
      if (value[i] < values[i-1]) {
        return false;
      }
    }
    return true;
  }

}
