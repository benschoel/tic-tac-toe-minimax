import State from "./state";
import AI from "./ai";
import check_win from "./check_win";

const choices = {
    X: 0, //player
    O: 1, //computer
};
let state = State({
    board: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    isPlayerTurn: Math.random() < 0.5,
    // isPlayerTurn: true,
    winner: -1,
});
let computer = AI();

state.addListener(({ board, isPlayerTurn, winner }) => {
    for (let i = 0; i < board.length; i++) {
        [...document.querySelector("#board").children].map((child, index) => {
            if (board[index] === -1) return;

            if (board[index] === choices.X) child.classList.add("is-x");
            if (board[index] === choices.O) child.classList.add("is-o");

            child.innerHTML = board[index] ? "O" : "X";

            return;
        });
    }

    if (winner !== -1) {
        if (winner === -2) {
            document.querySelector("#status").innerHTML = "It's A Draw!";
        } else {
            document.querySelector("#status").innerHTML =
                (winner === 0 ? "X" : "O") + "'s Win!";
        }
    } else {
        document.querySelector("#status").innerHTML = isPlayerTurn
            ? "It's Your Turn!"
            : "I'm Thinking...";
    }

    if (!isPlayerTurn && winner === -1) {
        setTimeout(() => {
            let ci = computer.make_move(state.get().board);
            const pseudo = [...state.get().board];
            pseudo[ci] = choices.O;

            state.set({
                ...state.get(),
                board: pseudo,
                isPlayerTurn: true,
                winner: check_win(pseudo),
            });
        }, 1000);
    }
});

const onSlotClick = (e) => {
    if (!state.get().isPlayerTurn) return;
    if (state.get().winner !== -1) return;

    let index = [...e.target.parentNode.children].findIndex(
        (child) => child === e.target
    );

    const board = [...state.get().board];

    if (Object.values(choices).includes(board[index])) {
        return console.error("already set");
    } else {
        const pseudo = board;
        pseudo[index] = state.get().isPlayerTurn ? choices.X : choices.O;
        state.set({
            ...state.get(),
            board: pseudo,
            isPlayerTurn: false,
            winner: check_win(pseudo),
        });
    }
};

document.querySelectorAll(".board-slot").forEach((slot) => {
    slot.addEventListener("click", onSlotClick);
});
