/* jshint undef: true, unused: false, evil: true, esnext: true, expr: true */
/* globals document, window, setInterval, clearInterval, */


let p1 = "X";
let p2 = "O";
let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let turnsPlayed = 0;
let currentPlayer = p1;
let multiplayer = false;
let fc = 0;

//simple selector function.
function $(elem) {
    if (elem.substr(0, 1) === "#") {
        return document.getElementById(elem.substr(1, (elem.length - 1)));
    } else {
        return document.getElementsByTagName(elem);
    }
}

console.log($("td"));


function winning(board, player) {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    ) {
        return true;
    } else {
        return false;
    }
}

function whoWins() {
    if (turnsPlayed < 9 && winning(board, p1)) {
        alert(p1 + " has WON");
    } else if (turnsPlayed < 9 && winning(board, p2)) {
        alert(p2 + " has WON");
    } else if (turnsPlayed === 9) {
        alert("It's a TIE");
    }
}

// returns the available spots on the board
function getEmptySpots(board){
  return  board.filter(s => s != "O" && s != "X");
}

function playerTurn() {
    let cells = $("td");
    //Array.from converts HTMLcollection or Array like objects to actual Arrays.
    Array.from(cells).forEach((cell) => cell.onclick = () => {
        cell.innerHTML = p1;
        board[cell.id] = p1;
        turnsPlayed++;
        cell.onclick = null;
        whoWins();
        (multiplayer === true) ? player2Turn(): aiTurn();
    });
}

function player2Turn() {
    let cells = $("td");
    //Array.from converts HTMLcollection or Array like objects to actual Arrays.
    Array.from(cells).forEach((cell) => cell.onclick = () => {
        cell.innerHTML = p2;
        board[cell.id] = p2;
        turnsPlayed++;
        cell.onclick = null;
        whoWins();
        playerTurn();

    });
}

function aiTurn() {
    let bestSpot = minimax(board, p2);
    console.log(fc);
    let cells = $("td");
    cells[bestSpot.index].innerHTML = p2;
    board[bestSpot.index] = p2;
    turnsPlayed++;
    cells[bestSpot.index].onclick = null;
    whoWins();
    playerTurn();
}



// the main minimax function
function minimax(newBoard, player){
fc++;

  //available spots
  let availSpots = getEmptySpots(newBoard);

  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (winning(newBoard, p1)){
     return {score:-1};
  }
	else if (winning(newBoard, p2)){
    return {score:1};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }

// an array to collect all the objects
  let moves = [];

  // loop through available spots
    availSpots.forEach((spot)=> {
       //create an object for each and store the index of that spot that was stored as a number in the object's index key
    let move = {},result;
  	move.index = newBoard[spot];

    // set the empty spot to the current player
    newBoard[spot] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player === p2){
      result = minimax(newBoard, p1);
      move.score = result.score;
    }
    else{
      result = minimax(newBoard, p2);
      move.score = result.score;
    }

    //reset the spot to empty4
    newBoard[spot] = move.index;

    // push the object to the array
    moves.push(move);

    });

// if it is the computer's turn loop over the moves and choose the move with the highest score
  let bestMove;
  if(player === p2){
    let bestScore = -10;
    moves.forEach((move, i)=>{
        if(move.score > bestScore){
        bestScore = move.score;
        bestMove = i;
      }
    });
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10;
      moves.forEach((move, i)=>{
        if(move.score < bestScore){
        bestScore = move.score;
        bestMove = i;
      }
    });
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}








(currentPlayer === p1) ? playerTurn(): aiTurn();
