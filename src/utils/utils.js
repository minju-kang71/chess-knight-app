const createBoard = (rowCnt, colCnt) => {
  let board = [];
  for (var row = 1; row <= rowCnt; row++) {
    for (var col = 1; col <= colCnt; col++) {
      board.push("" + row + col);
    }
  }
  return board;
};

const getTileColor = (tileNumber) => {
  const sum = Number(tileNumber.charAt(0)) + Number(tileNumber.charAt(1));
  return sum % 2 === 0 ? "light" : "dark";
};

const getStartPos = (board) => {
  const boardCopy = board.slice();
  const shuffled = boardCopy.sort(() => 0.5 - Math.random());
  const pos = shuffled.slice(0, 2);

  return pos;
};

const getPossibleMoves = (knightPos) => {
  const x = Number(knightPos.charAt(0));
  const y = Number(knightPos.charAt(1));

  const moves = [
    "" + (x - 2) + (y - 1),
    "" + (x - 2) + (y + 1),
    "" + (x - 1) + (y - 2),
    "" + (x - 1) + (y + 2),
    "" + (x + 1) + (y - 2),
    "" + (x + 1) + (y + 2),
    "" + (x + 2) + (y - 1),
    "" + (x + 2) + (y + 1),
  ];

  return moves.filter(
    (move) => !move.includes("-") && !move.includes("0") && !move.includes("9")
  );
};

// generic tree implementation reference javascript-cs-fundamentals by HaysS : https://www.youtube.com/watch?v=K7VnBuOlCI8
// finding a path to parent in tree https://programmerall.com/article/78712065541/

// I have used a tree data structure to find the best moves for knight

function Node(data) {
  this.data = data;
  this.children = [];
}

export class Tree {
  constructor() {
    this.root = null;
  }

  add(data, toNodeData) {
    const node = new Node(data);
    // If the toNodeData arg is passed, find it. Otherwise, store null.
    const parent = toNodeData ? this.findBFS(toNodeData) : null;

    // Push new node to parent whose value matches toNodeData
    if (parent) {
      parent.children.push(node);
    } else {
      // If there's no parent, make this the root node
      if (!this.root) this.root = node;
      else return "Tried to store node as root when root already exists.";
    }
  }

  findBFS(data) {
    const queue = [this.root];
    let _node = null;

    // Go thru every node in BFS
    this.traverseBFS((node) => {
      // Return match if found
      if (node.data === data) {
        _node = node;
      }
    });

    return _node;
  }

  traverseBFS(cb) {
    const queue = [this.root];

    if (cb)
      while (queue.length) {
        // Store current node & remove it from queue
        const node = queue.shift();

        cb(node);

        // Push children of current node to end of queue
        for (const child of node.children) {
          queue.push(child);
        }
      }
  }

  findPathToParent(value, valueName = "data", childrenName = "children") {
    const tree = [this.root];
    if (!value || !Array.isArray(tree)) return [];
    const result = [];
    let valid = false;
    const seek = (tree, value) => {
      let parentValue = "";
      const up = (tree, value, lastValue) => {
        tree.forEach((v) => {
          const val = v[valueName];
          const child = v[childrenName];
          if (val === value) {
            valid = true;
            parentValue = lastValue;
            return;
          }
          if (child && child.length) up(child, value, val);
        });
      };
      up(tree, value);
      if (parentValue) {
        result.unshift(parentValue);
        seek(tree, parentValue);
      }
    };
    seek(tree, value);
    return valid ? [...result, value] : [];
  }
}

const findMinimumMoves = (knightPos, targetPos) => {
  let minMoves = [];
  let knightXy = [Number(knightPos.charAt(0)), Number(knightPos.charAt(1))];
  const targetXy = [Number(targetPos.charAt(0)), Number(targetPos.charAt(1))];

  // use a map to keep track of the visted or not
  const visited = new Map();

  let queue = [knightXy]; // parent node
  let tree = new Tree();
  tree.add(knightPos);

  while (true) {
    queue.push(null);

    let head;
    while ((head = queue.shift())) {
      minMoves.push(head);

      const key = `${head[0]}_${head[1]}`;
      if (visited.has(key)) continue;

      visited.set(key, true);

      if (head[0] === targetXy[0] && head[1] === targetXy[1]) {
        return tree.findPathToParent(targetPos);
      }

      const possibleMoves = getPossibleMoves("" + head[0] + head[1]);
      for (let move of possibleMoves) {
        if (!visited.has(`${move.charAt(0)}_${move.charAt(1)}`)) {
          queue.push([Number(move.charAt(0)), Number(move.charAt(1))]);
          tree.add(move, "" + head[0] + head[1]);
        }
      }
    }
  }
};

export {
  createBoard,
  getTileColor,
  getStartPos,
  getPossibleMoves,
  findMinimumMoves,
};
