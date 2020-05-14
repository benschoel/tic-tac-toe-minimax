const choices = {
    X: 0, //player
    O: 1, //computer
};

const check_win = (board) => {
    // terribly inefficient. I noticed that winning states increment exactly by multiples of 4. Maybe i can do something with that later

    const win_states = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    const os = [];
    const xs = [];

    for (let i = 0; i < board.length; i++) {
        let state = board[i];
        if (state === choices.O) {
            os.push(i);
        } else if (state === choices.X) {
            xs.push(i);
        }
    }

    for (const condition of win_states) {
        if (
            xs.includes(condition[0]) &&
            xs.includes(condition[1]) &&
            xs.includes(condition[2])
        ) {
            return choices.X;
        }
    }

    for (const condition of win_states) {
        if (
            os.includes(condition[0]) &&
            os.includes(condition[1]) &&
            os.includes(condition[2])
        ) {
            return choices.O;
        }
    }

    return board.findIndex((x) => x === -1) === -1 ? -2 : -1;
};

export default check_win;
