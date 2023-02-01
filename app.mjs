import { mergeSort, removeDuplicates } from "./util.mjs";

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  buildTree(arr) {
    if(!this.root) arr = removeDuplicates(mergeSort(arr));
    if(arr.length === 0) return null;
    const root = new Node(arr[Math.floor(arr.length / 2)]);
    if(!this.root) this.root = root;
    root.left = this.buildTree(arr.slice(0, Math.floor(arr.length / 2)));
    root.right = this.buildTree(arr.slice(Math.floor(arr.length / 2) + 1));
    return root;
  }

  find(val, root = this.root) {
    if(root === null) return null;
    if(root.data === val) return root;
    if(root.data < val) return this.find(val, root.right);
    if(root.data > val) return this.find(val, root.left);
  }

  insert(val, root = this.root) {
    if(root.data === val) return;
    if(root.data < val) {
      if(!root.right) {
        root.right = new Node(val);
        return;
      }
      this.insert(val, root.right);
    } else {
      if(!root.left) {
        root.left = new Node(val);
        return;
      }
      this.insert(val, root.left);
    }
  }

  delete(root, val) {
    if(!root) return root;
    if(root.data < val) root.right = this.delete(root.right, val);
    else if (root.data > val) root.left = this.delete(root.left, val);
    else {
      if(!root.left && !root.right) {
        root = null;
      } else if ((root.left && !root.right) || (root.right && !root.left)) {
        root = root.left || root.right;
      } else {
        root.data = this.minimum(root.right).data;
        root.right = this.delete(root.right, root.data);
      }
    }
    return root;
  }

  minimum(root) {
    if(!root.left) return root;
    return this.minimum(root.left);
  }

  levelOrder(root, cb) {
    const queue = [];
    const processedNodes = [];
    queue.push(root);
    while(queue.length) {
      const processedNode = queue.shift();
      if(cb) cb(processedNode);
      processedNodes.push(processedNode.data);
      if(processedNode.left) queue.push(processedNode.left);
      if(processedNode.right) queue.push(processedNode.right);
    }
    return processedNodes;
  }

  inorder(root, cb) {
    if(!root) return [];
    let processedNodes = [];
    processedNodes = processedNodes.concat(this.inorder(root.left));
    if(cb) cb(root);
    processedNodes.push(root.data);
    processedNodes = processedNodes.concat(this.inorder(root.right));
    return processedNodes;
  }

  preorder(root, cb) {
    if(!root) return [];
    let processedNodes = [];
    if(cb) cb(root);
    processedNodes.push(root.data);
    processedNodes = processedNodes.concat(this.preorder(root.left));
    processedNodes = processedNodes.concat(this.preorder(root.right));
    return processedNodes;
  }

  postorder(root, cb) {
    if(!root) return [];
    let processedNodes = [];
    processedNodes = processedNodes.concat(this.postorder(root.left));
    processedNodes = processedNodes.concat(this.postorder(root.right));
    if(cb) cb(root);
    processedNodes.push(root.data);
    return processedNodes;
  }

  height(root) {
    if(!root) return -1;
    if(!root.left && !root.right) return 0;
    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(root) {
    let edges = 0;
    let current = this.root;
    while(current) {
      if(current === root) break;
      if(current.data > root.data) current = current.left;
      else current = current.right;
      edges++;
    }
    return edges;
  }

  isBalanced(root) {
    if(!root || !root.left || !root.right) return true;
    if(Math.abs(this.height(root.left) - this.height(root.right)) > 1) return false;
    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  rebalance() {
    const inorderArray = this.inorder(this.root);
    this.root = null;
    this.buildTree(inorderArray);
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const test = () => {
  const t = new Tree();
  const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  t.buildTree(arr);
  prettyPrint(t.root);
  console.log(t.isBalanced(t.root));
  t.insert(101);
  t.insert(200);
  t.insert(300);
  t.insert(400);
  t.insert(500);
  prettyPrint(t.root);
  console.log(t.isBalanced(t.root));
  t.rebalance();
  prettyPrint(t.root);
  console.log(t.isBalanced(t.root));
  console.log(t.inorder(t.root));
} 

test();
