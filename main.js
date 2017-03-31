/* jshint undef: true, unused: false, evil: true, esnext: true, expr: true */
/* globals document, window, setInterval, clearInterval, */


let aiPlayer = "X";
let huPlayer = "O";
let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let currentPlayer = huPlayer;

//simple selector function.
function $(elem) {
    if (elem.substr(0, 1) === "#"){
        return document.getElementById(elem.substr(1, (elem.length-1)));
    } else {
        return document.getElementsByTagName(elem);
    }
}

function huTurn() {
    let cells = $("td");
    //Array.from converts HTMLcollection or Array like objects to actual Arrays.
    Array.from(cells).forEach((cell) => cell.onclick = () => {
        cell.innerHTML = huPlayer;
        board[cell.id] = huPlayer;
        cell.onclick = null;
        aiTurn();
    });
}

function aiTurn() {
    let cells = $("td");
    //Array.from converts HTMLcollection or Array like objects to actual Arrays.
    Array.from(cells).forEach((cell) => cell.onclick = () => {
        cell.innerHTML = aiPlayer;
        board[cell.id] = aiPlayer;
        cell.onclick = null;
        huTurn();

    });
}

(currentPlayer === huPlayer) ? huTurn() : aiTurn();

