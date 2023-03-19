document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 8;
  const squares = [];
  const candyColors = [
    "url(Images/alternative-red.png)",
    "url(Images/alternative-yellow.png)",
    "url(Images/alternative-blue.png)",
    "url(Images/alternative-green.png)",
    "url(Images/alternative-orange.png)",
    "url(Images/alternative-purple.png)",
  ];
  const scoreDisplay = document.querySelector("#score");
  let score = 0;
  let moves = 10;
  const moveCounter = document.querySelector("#moves");
  // const sound = new Audio('path/to/sound.mp3'); Replicate for each sound

  ///BOARD///
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true); //Wil make each square to be draggable
      square.setAttribute("id", i);
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundImage = candyColors[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createBoard();
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    if (moves > 0) {
      colorBeingDragged = this.style.backgroundImage;
      squareIdBeingDragged = parseInt(this.id);
    } else if (moves == 0) {
      moveCounter.innerHTML = "Game Over"; //// this changes to GAME OVER after 0. you have to drag one more in order for the gfame over to appear
    } else {
      e.preventDefault();
    }
  }

  // Reviewing this function
  // function updateMovesCounter() {
  //   const moveCounter = document.getElementById("moves-counter");
  //   console.log(moveCounter);
  //   if (moves === 0) {
  //     moveCounter.innerHTML = "Game Over"; // set counter to "Game Over"
  //   } else {
  //     moveCounter.innerHTML = moves; // update counter with remaining moves
  //   }
  // }
  function dragEnd() {
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];
    let validMove = validMoves.includes(squareIdBeingReplaced);
    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    } else {
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }
  }
  function dragOver(e) {
    e.preventDefault();
  }
  function dragEnter(e) {
    e.preventDefault();
  }
  function dragLeave() {
    this.style.backgroundImage = "";
  }
  function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    if (moves > 0) {
      moves--;
    } else {
      moves = 0;
    }
    moveCounter.innerHTML = moves;
  }
  function checkRowOfThree() {
    for (let i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) continue;
      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        //   const sound = new Audio('path/to/sound.mp3');  CHECK IF THIS WORKS and replicate with others
        // sound.play();
        // sound.volume = 0.5;
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkRowOfThree();
  ///For the columns
  function checkColumnOfThree() {
    for (let i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      if (
        columnOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkColumnOfThree();

  //Making candies rain after being cleared
  function moveDown() {
    for (let i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === "") {
        squares[i + width].style.backgroundImage =
          squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = "";
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && squares[i].style.backgroundImage === "") {
          let randomColor = Math.floor(Math.random() * candyColors.length);
          squares[i].style.backgroundImage = candyColors[randomColor];
        }
      }
    }
  }

  // Check for matches
  //Rows of four
  function checkRowOfFour() {
    for (let i = 0; i < 61; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      const notValid = [
        5, 6, 7, 14, 15, 21, 22, 23, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55,
      ];
      if (notValid.includes(i)) continue;
      if (
        rowOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkRowOfFour();
  ///For the columns
  function checkColumnOfFour() {
    for (let i = 0; i < 47; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 4];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundColor === "";
      if (
        columnOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        columnOfFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkColumnOfFour();

  window.setInterval(function () {
    moveDown();
    checkRowOfFour();
    checkColumnOfFour();
    checkRowOfThree();
    checkColumnOfThree();
  }, 100);
});
