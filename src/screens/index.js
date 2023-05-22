import {ViewModel} from "../providers/view_model.js"
import {Stone} from "../providers/board.js"


let viewModel = new ViewModel();

viewModel.watch(() => {
    let text = document.getElementById("text");
    text.innerText = viewModel.text;
});


viewModel.watch(() => {
    let boards = document.getElementsByClassName("board");

    let display = viewModel.getViewBoard();
    for (let i = 0; i < boards.length; i++) {
        let board = boards[i];
        let stone = display[i];
        switch (stone) {
            case Stone.black:
                board.style.background = "black";
                break;
            case Stone.white:
                board.style.background = "white";
                break;
            case Stone.empty:
                board.style.background = "burlywood";
                break;
        }

    }
});


let boards = document.getElementsByClassName("board");
for (let k = 0; k < boards.length; k++) {
    let board = boards[k];
    board.onclick = () => {
        let x = parseInt(k / 15);
        let y = k % 15;
        viewModel.put(x, y);
    }
}

viewModel.notify();

let undoButton = document.getElementById("undoButton");
undoButton.onclick = () => {
    viewModel.undo();
}

let resetButton = document.getElementById("resetButton");
resetButton.onclick = () => {
    viewModel.reset();
}




