/* jshint undef: true, unused: false, evil: true, esnext: true, expr: true */
/* globals document, window, setInterval, clearInterval, */


let p1 = "X";
let p2 = "O";
let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let turnsPlayed = 0;
let currentPlayer = p1;
let multiplayer = true;

//simple selector function.
function $(elem) {
    if (elem.substr(0, 1) === "#") {
        return document.getElementById(elem.substr(1, (elem.length - 1)));
    } else {
        return document.getElementsByTagName(elem);
    }
}


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
        alert(p1 + " WON");
    } else if (turnsPlayed < 9 && winning(board, p2)) {
        alert(p2 + " WON");
    } else if (turnsPlayed === 9) {
        alert("It's a TIE");
    }
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

(currentPlayer === p1) ? playerTurn(): aiTurn();
