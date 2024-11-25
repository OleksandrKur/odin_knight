class Node {
  constructor(currentPosition, parent = null) {
    this.parent = parent;
    this.position = currentPosition;
    this.x = currentPosition[0];
    this.y = currentPosition[1];
    this.moves = [];
  }
  getMoves() {
    const potentialMoves = [
      [this.x + 2, this.y + 1],
      [this.x + 2, this.y - 1],
      [this.x - 2, this.y + 1],
      [this.x - 2, this.y - 1],
      [this.x + 1, this.y + 2],
      [this.x + 1, this.y - 2],
      [this.x - 1, this.y + 2],
      [this.x - 1, this.y - 2],
    ];

    for (let [x, y] of potentialMoves) {
      // Check if the move is within bounds
      if (x >= 0 && x < 8 && y >= 0 && y < 8) {
        this.moves.push(new Node([x, y], this));
      }
    }
    return this.moves;
  }
}

function knightMoves(currentPosition, destinationPosition) {
  let start = new Node(currentPosition);
  const [targetX, targetY] = destinationPosition;

  // Check if start is the destination
  if (start.x === targetX && start.y === targetY) {
    printPath([currentPosition]);
    printBoard([currentPosition]);
    return;
  }

  // Initialize the visited set and queue for BFS
  let visited = new Set();
  visited.add(currentPosition.toString());
  let queue = [start];

  while (queue.length > 0) {
    let currentNode = queue.shift();

    // Generate possible moves
    let children = currentNode.getMoves();
    for (let child of children) {
      let positionString = child.position.toString();

      // If the position is the destination, trace back the path
      if (child.x === targetX && child.y === targetY) {
        let path = [];
        let trace = child;
        while (trace) {
          path.unshift(trace.position);
          trace = trace.parent;
        }
        printPath(path);
        printBoard(path);
        return;
      }

      // Add to queue if not visited
      if (!visited.has(positionString)) {
        visited.add(positionString);
        queue.push(child);
      }
    }
  }
}

function printPath(path) {
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((pos) => console.log(`[${pos[0]},${pos[1]}]`));
}

knightMoves([0, 0], [7, 7]);

function printBoard(path) {
  let board = [
    //0 1  2  3  4  5  6  7
    [0, 0, 0, 0, 0, 0, 0, 0], // 0
    [0, 0, 0, 0, 0, 0, 0, 0], // 1
    [0, 0, 0, 0, 0, 0, 0, 0], // 2
    [0, 0, 0, 0, 0, 0, 0, 0], // 3
    [0, 0, 0, 0, 0, 0, 0, 0], // 4
    [0, 0, 0, 0, 0, 0, 0, 0], // 5
    [0, 0, 0, 0, 0, 0, 0, 0], // 6
    [0, 0, 0, 0, 0, 0, 0, 0], // 7
  ];
  if (path.length === 1) {
    let [x, y] = path[0];
    board[x][y] = "k";
  } else {
    let [x, y] = path[path.length - 1];
    board[x][y] = "k";
    for (let i = 0; i < path.length - 1; i++) {
      let [x, y] = path[i];
      board[x][y] = i + 1;
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "k") {
        process.stdout.write("|♞|");
      } else if (board[i][j] === 0) {
        process.stdout.write("|_|");
      } else {
        process.stdout.write(`|${board[i][j]}|`);
      }
    }
    console.log("");
  }
}
