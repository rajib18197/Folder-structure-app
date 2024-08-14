class Node {
  constructor(name, childrens) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.childrens = childrens || [];
  }
}

export class Tree {
  root = null;
  constructor(data) {
    this.data = data;
    console.log(this.data);
    if (!this.data[0][1]) {
      this.createNode(this.data[0][0]);
      return;
    }

    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].length - 1; j++) {
        this.createNode(this.data[i][j], this.data[i][j + 1]);
      }
    }
  }

  createNode(parentName, childName) {
    // console.log(childName, this.root);

    if (!childName && !this.root) {
      this.root = new Node(parentName);
      // console.log(this.root, 111);

      return;
    }
    const childNode = new Node(childName);
    const node = this.findNode(this.root, parentName);
    const node2 = this.findNode(this.root, childName);

    if (node && node2) return;

    if (!node) {
      this.root = new Node(parentName);
      this.root.childrens.push(childNode);
      return;
    }

    node.childrens.push(childNode);
  }

  findNode(root, nodeName) {
    if (!root) return null;

    if (root.name === nodeName) {
      return root;
    }

    if (root.childrens.length === 0) return null;

    for (let i = 0; i < root.childrens.length; i++) {
      const node = this.findNode(root.childrens[i], nodeName);
      if (node) return node;
    }
    return null;
  }
}

const data = [
  ["DSA", "Linked List", "Doubly LL", "Reverse-A-Doubly-LL.js"],
  ["DSA", "Linked List", "Circular LL", "Detect-and-Remove-a-Loop.js"],
  ["DSA", "Stack", "Design-A-Stack-with-Queue.js"],
];

export const tree = new Tree(data);
console.log(tree.root);

export const root = tree.root;
