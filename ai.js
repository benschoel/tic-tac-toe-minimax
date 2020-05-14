import check_win from "./check_win";

const choices = {
    X: 0, //player
    O: 1, //computer
};

const allValidMoves = (board, player) => {
    const arr = [];

    for (let i = 0; i < board.length; i++) {
        if (board[i] === -1) {
            const pseudo = [...board];
            pseudo[i] = player;
            arr.push(pseudo);
        }
    }

    return arr;
};

const minimax = (board, isMaximizing) => {
    const winid = check_win(board);
    if (winid > 0) {
        return winid;
    } else if (winid === -2) {
        return -2;
    }

    if (isMaximizing) {
        let score = -Infinity;
        let nextBoardStates = allValidMoves(board, choices.X);
        for (const state of nextBoardStates) {
            score = Math.max(score, minimax(state, !isMaximizing));
        }
        return score;
    } else {
        let score = Infinity;
        let nextBoardStates = allValidMoves(board, choices.O);
        for (const state of nextBoardStates) {
            score = Math.min(score, minimax(state, !isMaximizing));
        }
        return score;
    }
};

const AI = () => {
    return {
        make_move: (board) => {
            let graph = {};
            console.log(allValidMoves(board, choices.O));
            // const nextBoardStates = allValidMoves(board, choices.O);
            for (let i = 0; i < board.length; i++) {
                if (board[i] !== -1) continue;
                const pseudo = [...board];
                pseudo[i] = choices.O;
                graph[i] = minimax(pseudo, true);
            }

            const wins = Object.entries(graph).filter(
                (entry) => entry[1] === choices.O || entry[1] === -Infinity
            );
            const losses = Object.entries(graph).filter(
                (entry) => entry[1] === choices.X || entry[1] == Infinity
            );
            const draws = Object.entries(graph).filter(
                (entry) => entry[1] === 0 || entry[1] === -2
            );

            if (wins.length > 0) {
                return wins[Math.floor(Math.random() * wins.length)][0];
            } else if (draws.length > 0) {
                return draws[Math.floor(Math.random() * draws.length)][0];
            } else {
                return losses[Math.floor(Math.random() * losses.length)][0];
            }
        },
    };
};

export default AI;
