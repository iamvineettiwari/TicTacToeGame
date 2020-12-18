import players from "./players.js";
import { gen_O, gen_X } from "./tokens.js";

export default class Game {

    constructor(board, currentPlayer, depth = -1, handleWinner, handleDraw, handleEach) {
        this.state = new Array(9).fill(null);
        this.board = board;
        this.currentPlayer = currentPlayer;
        this.depth = (depth == -1) ? Infinity : depth;
        this.handleDraw = handleDraw;
        this.handleWinner = handleWinner;
        this.handleEach = handleEach;
    }

    resetGame() {
        this.state = new Array(9).fill(null);
        this.board = null;
        this.currentPlayer = null;
        this.depth = null;
        this.handleDraw = null;
        this.handleWinner = null;
        this.handleEach = null;
    }

    nextMove(index) {
        if (this.currentPlayer === players.computer) {
            const pos = this.computersMove();

            this.state[pos] = players.computer;
            this.board[pos].innerHTML = gen_X(pos);

            this.currentPlayer = players.player;
            this.handleEach(this.currentPlayer);

            const winner = this.findWinner();

            if (winner) {
                this.handleWinner(winner, 'X');
                return;
            }
            if (!this.moveAvailable()) {
                this.handleDraw();
                return;
            }
        } else {
            this.state[index] = players.player;
            this.board[index].innerHTML = gen_O(index);

            this.currentPlayer = players.computer;
            this.handleEach(this.currentPlayer);

            const winner = this.findWinner();

            if (winner) {
                this.handleWinner(winner, 'O');
                return;
            }
            if (!this.moveAvailable()) {
                this.handleDraw();
                return;
            }
            this.nextMove(null);
        }

    }

    findWinner() {
        const conditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let winnerFound = null;

        conditions.forEach((condition) => {
            let [a, b, c] = condition;

            if (this.state[a] && (this.state[a] === this.state[b] && this.state[b] === this.state[c])) {
                winnerFound = condition;
            }
        });

        return winnerFound;
    }

    positionAvailable(index) {
        return this.state[index] === null;
    }

    computersMove() {
        let weight = -Infinity;
        let bestPosition;
        for (let i = 0; i < this.state.length; i++) {
            if (!this.state[i]) {
                this.state[i] = players.computer;
                let score = this.minmax(this.state, 0, false);
                this.state[i] = null;

                if (score > weight) {
                    weight = score;
                    bestPosition = i;
                }
            }
        }
        return bestPosition;
    }

    moveAvailable() {
        for (let mov of this.state) {
            if (mov == null) {
                return true;
            }
        }

        return false;
    }

    minmax(positions, depth, maximizing) {

        if (depth == this.depth) {
            return maximizing ? -10 : 10;
        }

        const winner = this.findWinner();

        if (winner) {
            if (this.state[winner[0]] == players.computer) {
                return 10;
            } else {
                return -10;
            }
        }

        if (!winner && !this.moveAvailable()) {
            return 0;
        }
 
        if (maximizing) {
            let bestPosition = -Infinity;
            for (let i = 0; i < positions.length; i++) {
                if (!positions[i]) {
                    positions[i] = players.computer;
                    let score = this.minmax(positions, depth + 1, false);
                    positions[i] = null;
                    bestPosition = Math.max(score, bestPosition);

                }
            }

            return bestPosition;
        } else {
            let bestPosition = Infinity;
            for (let i = 0; i < positions.length; i++) {
                if (!positions[i]) {
                    positions[i] = players.player;
                    let score = this.minmax(positions, depth + 1, true);
                    positions[i] = null;

                    bestPosition = Math.min(score, bestPosition)
                }
            }
            return bestPosition;
        }
    }
}