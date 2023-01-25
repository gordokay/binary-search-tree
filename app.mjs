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

  find(val, root) {
    if(root === null) return null;
    if(root.data === val) return root;
    if(root.data < val) return this.find(val, root.right);
    if(root.data > val) return this.find(val, root.left);
  }
}
