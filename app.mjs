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
    if(!this.root) {
      arr = removeDuplicates(mergeSort(arr));
      this.root = new Node(arr[Math.floor(arr.length / 2)]);
    }
    
    if(arr.length === 0) return null;

    const root = new Node(arr[Math.floor(arr.length / 2)]);
    root.left = this.buildTree(arr.slice(0, arr.length / 2));
    root.right = this.buildTree(arr.slice(arr.length / 2 + 1));

    return root;
  }
}