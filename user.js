const winPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

const a = document.querySelector(".boxes");
const welcome = document.querySelector(".welcome");
const reset = document.querySelector('.reset');
const winner = document.querySelector(".winner");
const para = document.querySelector(".para");
const optionButtons = document.querySelector(".optionButtons");

let turn0 = true; // Set initial turn to 'O' (user 1)

reset.addEventListener('click', resetGame);
tracking();

function tracking() {
    for (let i = 0; i < 9; i++) {
        a.children[i].addEventListener('click', () => {
            const marker = turn0 ? 'O' : 'X';
            const color = turn0 ? 'blue' : 'red';
            a.children[i].innerText = marker;
            a.children[i].style.color = color;
            turn0 = !turn0; // Switch turns
            a.children[i].disabled = true;
            checkWinner();
        });
    }
}

function checkWinner() {
    for (let pattern of winPattern) {
        let [pos1, pos2, pos3] = pattern.map(index => a.children[index].innerText);
        if (pos1 && pos1 === pos2 && pos2 === pos3) {
            displayLines(pattern);
            disableRemaining();
            displayWinner(pos1);
            break;
        }
    }
}

function displayWinner(marker) {
    welcome.setAttribute('hidden', 'true');
    reset.setAttribute("hidden", "true");
    winner.removeAttribute('hidden');
    para.removeAttribute('hidden');
    optionButtons.removeAttribute('hidden');
    document.querySelector('.declare').innerText = `Winner is User-${marker === 'O' ? 1 : 2}`;
    optionButtons.querySelector('.yes').addEventListener('click', resetGame);
    optionButtons.querySelector('.no').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

function resetGame() {
    welcome.removeAttribute('hidden');
    reset.removeAttribute('hidden');
    winner.setAttribute('hidden', 'true');
    para.setAttribute('hidden', 'true');
    optionButtons.setAttribute('hidden', 'true');
    clearBoard();
    turn0 = true; // Reset turn to 'O' (user 1)
}

function displayLines(pattern) {
    const lines = [
        ["bt0 b", "bt1 b", document.querySelector(".hcross1")],
        ["bt3 b", "bt4 b", document.querySelector(".hcross2")],
        ["bt6 b", "bt7 b", document.querySelector(".hcross3")],
        ["bt0 b", "bt3 b", document.querySelector(".vcross1")],
        ["bt1 b", "bt4 b", document.querySelector(".vcross2")],
        ["bt2 b", "bt5 b", document.querySelector(".vcross3")],
        ["bt0 b", "bt4 b", document.querySelector(".dcross1")],
        ["bt2 b", "bt4 b", document.querySelector(".dcross2")]
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

function clearBoard() {
    for (let i = 0; i < 9; i++) {
        a.children[i].innerText = '';
        a.children[i].disabled = false;
    }
    [document.querySelector(".hcross1"), document.querySelector(".hcross2"), document.querySelector(".hcross3"),
     document.querySelector(".vcross1"), document.querySelector(".vcross2"), document.querySelector(".vcross3"),
     document.querySelector(".dcross1"), document.querySelector(".dcross2")
    ].forEach(line => line.setAttribute("hidden", "true"));
}
