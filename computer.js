let turn0 = true; // Variable to track the current player's turn
let gameOver = false; // Flag to indicate if the game is over
const winPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];
const a = document.querySelector(".boxes");
const h1 = document.querySelector(".hcross1");
const h2 = document.querySelector(".hcross2");
const h3 = document.querySelector(".hcross3");
const v1 = document.querySelector(".vcross1");
const v2 = document.querySelector(".vcross2");
const v3 = document.querySelector(".vcross3");
const d1 = document.querySelector(".dcross1");
const d2 = document.querySelector(".dcross2");
const welcome = document.querySelector(".welcome");
const container = document.querySelector(".container");
const yesOption = document.querySelector(".yes");
const noOption = document.querySelector(".no");
const winner = document.querySelector(".winner");
const para = document.querySelector(".para");
const optionButtons = document.querySelector(".optionButtons");
const reset = document.querySelector('.reset');

reset.addEventListener('click', enableBtn);
tracking();

function tracking() {
    for (let i = 0; i < 9; i++) {
        a.children[i].addEventListener('click', () => {
            if (!gameOver && a.children[i].innerText === '') { // Check if the game is not over and the box is empty
                const marker = turn0 ? 'O' : 'X'; // Determine marker for the current player
                const color = turn0 ? 'blue' : 'red';
                a.children[i].innerText = marker;
                a.children[i].style.color = color;
                turn0 = !turn0; // Switch turns
                checkWinner();
                if (!turn0 && !gameOver) { // If it's the computer's turn and the game is not over
                    setTimeout(computerMove, 1000); // Delay computer move by 1 seconds
                }
            }
        });
    }
}

function computerMove() {
    if (!gameOver) {
        // Check if computer can win
        if (checkWinningMove('X')) {
            return; // Computer wins, no need to continue
        }
        // Check if computer needs to block player from winning
        if (checkWinningMove('O')) {
            return; // Player's win blocked, no need to continue
        }
        // If no winning moves, make a random move
        let randomIndex = Math.floor(Math.random() * 9);
        while (a.children[randomIndex].innerText !== '') {
            randomIndex = Math.floor(Math.random() * 9); // Ensure the selected box is empty
        }
        const marker = 'X'; // Computer's marker
        const color = 'red';
        a.children[randomIndex].innerText = marker;
        a.children[randomIndex].style.color = color;
        turn0 = !turn0; // Switch turns
        checkWinner();
    }
}

function checkWinningMove(player) {
    for (let pattern of winPattern) {
        let [pos1, pos2, pos3] = pattern.map(index => a.children[index].innerText);
        if (pos1 === player && pos2 === player && pos3 === '') {
            a.children[pattern[2]].innerText = 'X';
            a.children[pattern[2]].style.color = 'red';
            turn0 = !turn0; // Switch turns
            checkWinner();
            return true; // Winning move made
        }
        if (pos1 === player && pos3 === player && pos2 === '') {
            a.children[pattern[1]].innerText = 'X';
            a.children[pattern[1]].style.color = 'red';
            turn0 = !turn0; // Switch turns
            checkWinner();
            return true; // Winning move made
        }
        if (pos2 === player && pos3 === player && pos1 === '') {
            a.children[pattern[0]].innerText = 'X';
            a.children[pattern[0]].style.color = 'red';
            turn0 = !turn0; // Switch turns
            checkWinner();
            return true; // Winning move made
        }
    }
    return false; // No winning move made
}

function checkWinner() {
    for (let pattern of winPattern) {
        let [pos1, pos2, pos3] = pattern.map(index => a.children[index].innerText);
        if (pos1 && pos1 === pos2 && pos2 === pos3) {
            displayLines(pattern);
            disableRemaining();
            disableAllButtons();
            change();
            if (pos1 === 'O') {
                document.querySelector('.declare').innerText = 'You win!';
            } else {
                document.querySelector('.declare').innerText = 'Computer wins!';
            }
           
            gameOver = true; // Set game over flag
        }
    }
}

function change() {
    welcome.setAttribute('hidden', 'true');
    reset.setAttribute("hidden", "true");
    winner.removeAttribute('hidden');
    para.removeAttribute('hidden');
    optionButtons.removeAttribute('hidden');
    yesOption.addEventListener('click', yesOP);
    noOption.addEventListener('click', noOP);
}

function yesOP() {
    enableBtn();
    welcome.removeAttribute('hidden');
    reset.removeAttribute('hidden');
    winner.setAttribute('hidden', 'true');
    para.setAttribute('hidden', 'true');
    optionButtons.setAttribute('hidden', 'true');
}

function noOP() {
    enableBtn();
    document.location.href = 'index.html';
}

function displayLines(pattern) {
    const lines = [
        ["bt0 b", "bt1 b", h1],
        ["bt3 b", "bt4 b", h2],
        ["bt6 b", "bt7 b", h3],
        ["bt0 b", "bt3 b", v1],
        ["bt1 b", "bt4 b", v2],
        ["bt2 b", "bt5 b", v3],
        ["bt0 b", "bt4 b", d1],
        ["bt2 b", "bt4 b", d2]
    ];
    for (let [class1, class2, line] of lines) {
        if (a.children[pattern[0]].className === class1 && a.children[pattern[1]].className === class2) {
            line.removeAttribute('hidden');
            break;
        }
    }
}

function disableRemaining() {
    for (let i = 0; i < 9; i++) {
        if (!a.children[i].disabled) {
            a.children[i].disabled = true;
        }
    }
}

function enableBtn() {
    for (let i = 0; i < 9; i++) {
        a.children[i].innerText = '';
        a.children[i].disabled = false;
    }
    [h1, h2, h3, v1, v2, v3, d1, d2].forEach(line => line.setAttribute("hidden", "true"));
    turn0 = true;
    gameOver = false; // Reset game over flag
}


function disableAllButtons() {
    for (let i = 0; i < 9; i++) {
        a.children[i].disabled = true;
    }
}
