class TreeNode {
  constructor(key) {
      this.key = key;
      this.left = null;
      this.right = null;
      this.height = 1;
  }
}

class AVLTree {
  constructor() {
      this.root = null;
      this.totalSum = 0;
      this.totalNodes = 0;
  }

  inOrder(node) {
      if (node !== null) {
          this.inOrder(node.left);
          const balance = this.getBalance(node);
          const violation = Math.abs(balance) > 1 ? " (AVL violation!)" : "";
          console.log(`bal(${node.key}) = ${balance}${violation}`);
          this.totalSum += node.key;
          this.totalNodes++;
          this.inOrder(node.right);
      }
  }

  findMin(node) {
      if (!node) return Infinity;
      let minLeft = this.findMin(node.left);
      let minRight = this.findMin(node.right);
      return Math.min(node.key, minLeft, minRight);
  }

  findMax(node) {
      if (!node) return -Infinity;
      let maxLeft = this.findMax(node.left);
      let maxRight = this.findMax(node.right);
      return Math.max(node.key, maxLeft, maxRight);
  }

  calculateAverage() {
      return this.totalNodes > 0
          ? (this.totalSum / this.totalNodes).toFixed(1)
          : 0;
  }

  checkAVL(node) {
      if (!node) return true;
      let leftAVL = this.checkAVL(node.left);
      let rightAVL = this.checkAVL(node.right);
      let isBalanced = Math.abs(this.getBalance(node)) <= 1;
      return leftAVL && rightAVL && isBalanced;
  }

  getHeight(node) {
      if (!node) return 0;
      return node.height;
  }

  getBalance(node) {
      if (!node) return 0;
      return this.getHeight(node.right) - this.getHeight(node.left);
  }

  rotateRight(y) {
      let x = y.left;
      if (!x) return y; // Sicherstellen, dass x nicht null ist

      let T2 = x.right;

      x.right = y;
      y.left = T2;

      y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
      x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

      return x;
  }

  rotateLeft(x) {
      let y = x.right;
      if (!y) return x; // Sicherstellen, dass y nicht null ist

      let T2 = y.left;

      y.left = x;
      x.right = T2;

      x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
      y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

      return y;
  }

  insert(node, key) {
      if (!node) {
          return new TreeNode(key);
      }

      if (key < node.key) {
          node.left = this.insert(node.left, key);
      } else if (key > node.key) {
          node.right = this.insert(node.right, key);
      } else {
          return node; // Vermeidung von Duplikaten
      }

      // Aktualisiere die Höhe des aktuellen Knotens
      node.height =
          1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

      // Balance-Faktor berechnen
      //let balance = this.getBalance(node);

      // Rotationen durchführen, falls nötig
      /*if (balance > 1 && key < node.right.key) {
          return this.rotateLeft(node);
      }
      if (balance < -1 && key > node.left.key) {
          return this.rotateRight(node);
      }
      if (balance > 1 && key > node.right.key) {
          node.right = this.rotateRight(node.right);
          return this.rotateLeft(node);
      }
      if (balance < -1 && key < node.left.key) {
          node.left = this.rotateLeft(node.left);
          return this.rotateRight(node);
      }*/

      return node;
  }

  rotateTree(node, key) {
      let balance = this.getBalance(node);

      // Rotationen durchführen, falls nötig
      if (balance > 1 && key < node.right.key) {
          return this.rotateLeft(node);
      }
      if (balance < -1 && key > node.left.key) {
          return this.rotateRight(node);
      }
      if (balance > 1 && key > node.right.key) {
          node.right = this.rotateRight(node.right);
          return this.rotateLeft(node);
      }
      if (balance < -1 && key < node.left.key) {
          node.left = this.rotateLeft(node.left);
          return this.rotateRight(node);
      }

      return node;
  }

  printFinalBalances(node) {
      if (node !== null) {
          this.printFinalBalances(node.left);
          const balance = this.getBalance(node);
          const violation = Math.abs(balance) > 1 ? " (AVL violation!)" : "";
          console.log(`bal(${node.key}) = ${balance}${violation}`);
          this.totalSum += node.key;
          this.totalNodes++;
          this.printFinalBalances(node.right);
      }
  }

  startSearch(node, key) {
      if (key < node.key) {
          if (node.left === null) {
              console.log(`${key} ist nicht in der Liste`);
              return;
          }
          else {
              node = node.left;
              this.startSearch(node, key);
          }
      } else if (key > node.key) {
          if (node.right === null) {
              console.log(`${key} ist nicht in der Liste`);
              return;
          }
          else {
              node = node.right;
              this.startSearch(node, key);
          }
      } else if (key == node.key) {
          console.log(`${key} ist in liste`);
          return;
      }
  }
}

module.exports = AVLTree;
