import Game from "./game.js";
import players from "./players.js";

const board_tiles = document.getElementsByClassName('board_tile');
const game_status = document.getElementById('game-status');
const button = document.getElementById('button');
const dificultySelector = document.getElementById('difficulty');
const s_player = document.getElementById('player');
let game;


const clearBoard = () => {
    for (let tile of board_tiles) {
        tile.innerHTML = '';
        tile.classList.remove("white");
        tile.classList.add("gray");
        tile.classList.remove("board-tile-win");
    }

}

const handleWinner = (winner, token) => {

    if (token === players.computer) {
        for (let i of winner) {
            board_tiles[i].classList.add("board-tile-win");
            document.getElementById(`${i}-left`).style.stroke = "green";
            document.getElementById(`${i}-right`).style.stroke = "green";
        }
    } else {
        for (let i of winner) {
            board_tiles[i].classList.add("board-tile-win");
            document.getElementById(`my-circle-${i}`).style.stroke = "green";
        }
    }
    game_status.innerText = `${(token === players.computer) ? 'Computer' : 'You'} won the game !`;
}

const handleDraw = () => {
    for (let tile of board_tiles) {
        tile.classList.add("board-tile-win");
    }

    const gameBoardStatus = game.state;

    for (let i = 0; i < gameBoardStatus.length; i++) {
        if (gameBoardStatus[i] === players.computer) {
            document.getElementById(`${i}-left`).style.stroke = "red";
            document.getElementById(`${i}-right`).style.stroke = "red";
        } else {
            document.getElementById(`my-circle-${i}`).style.stroke = "red";
        }
    }

    game_status.innerText = `It's a draw !`;
}

const handleEach = (player) => {
    game_status.innerText = `In progress`;
}


button.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.innerText === "Start Game") {
        for (let tile of board_tiles) {
            tile.classList.remove("gray");
            tile.classList.add("white");
        }
        e.target.innerText = "Clear Game Board";
        e.target.classList.remove("btn-primary");
        e.target.classList.add("btn-danger");
        const level = dificultySelector.options[dificultySelector.selectedIndex].value;
        const start_player = s_player.options[s_player.selectedIndex].value;

        if (start_player == '0') {
            game = new Game(board_tiles, players.computer, level, handleWinner, handleDraw, handleEach);
            game.nextMove(null);
        } else {
            game = new Game(board_tiles, players.player, level, handleWinner, handleDraw, handleEach);
        }

        dificultySelector.setAttribute("disabled", true);
        s_player.setAttribute("disabled", true);
    } else {
        game.resetGame();
        dificultySelector.removeAttribute("disabled");
        s_player.removeAttribute("disabled");
        game_status.innerText = `Not started !`;
        e.target.innerText = "Start Game";
        e.target.classList.remove("btn-danger");
        e.target.classList.add("btn-primary");
        clearBoard();
    }
})

const handleGamePlay = (event) => {
    if (!game || !game.currentPlayer) {
        return;
    }

    const clickIndex = event.target.getAttribute('data-index');

    if (!game.positionAvailable(clickIndex) || game.findWinner()) {
        return;
    }

    game.nextMove(clickIndex);
}


for (let tile of board_tiles) {
    tile.addEventListener("click", handleGamePlay);
}

