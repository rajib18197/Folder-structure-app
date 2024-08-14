class Node {
  constructor(name, childrens) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.childrens = childrens || [];
  }
}

class Tree {
  root = null;
  constructor(data) {
    this.data = data;

    // for (let i = 0; i < this.data.length; i++) {
    //   this.createNode(...this.data[i]);
    // }

    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].length - 1; j++) {
        this.createNode(this.data[i][j], this.data[i][j + 1]);
      }
    }
  }

  createNode(parentName, childName) {
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

// const data = [
//   ["DSA", "Linked List"],
//   ["DSA", "Stack"],
//   ["Stack", "Design A Stack with Queue"],
//   ["Linked List", "Doubly LL"],
//   ["Doubly LL", "Reverse A Doubly LL"],
//   ["Linked List", "Circular LL"],
//   ["Circular LL", "Detect and Remove a Loop"],
// ];

const data = [
  ["DSA", "Linked List", "Doubly LL", "Reverse-A-Doubly-LL.js"],
  ["DSA", "Linked List", "Circular LL", "Detect-and-Remove-a-Loop.js"],
  ["DSA", "Stack", "Design-A-Stack-with-Queue.js"],
];

// const data1 = [
//   [
//     "DSA",
//     {
//       "Linked List": [
//         "Doubly LL",
//         "Reverse A Doubly LL",
//         "Circular LL",
//         "Detect and Remove a Loop",
//       ],
//     },
//   ],
//   ["DSA", "Stack", "Design A Stack with Queue"],
// ];

const tree = new Tree(data);
// tree.createNode("DSA", "Linked List");
// tree.createNode("DSA", "Stack");
// tree.createNode("Stack", "Design A Stack with Queue");
// tree.createNode("Linked List", "Doubly LL");
// tree.createNode("Doubly LL", "Reverse A Doubly LL");
// tree.createNode("Linked List", "Circular LL");
// tree.createNode("Circular LL", "Detect and Remove a Loop");
console.log(tree.root);

export const root = tree.root;
