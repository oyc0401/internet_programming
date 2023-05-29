import {Provider} from "../../providerJS/provider.js";
import {GameViewModel} from "./stage-model.js";
import {Direction, Entity} from "./game.js";
import {clearStage} from "./api.js";

const URLSearch = new URLSearchParams(location.search);
let stageId = URLSearch.get("stage");

Provider.instance({
    model: new GameViewModel(stageId)

})
    .watch(model => {
    })
    .watch(model => {

        let boardContainer = document.getElementById("board-container");
        while (boardContainer.firstChild) {
            boardContainer.firstChild.remove();
        }

        let tableElement = document.createElement("table");
        // board.id="board";
        for (let i = 0; i < model.height; i++) {
            let rowElement = document.createElement("tr");
            rowElement.classList.add("row")

            for (let k = 0; k < model.width; k++) {
                let cellElement = document.createElement("td");
                cellElement.classList.add("board");
                rowElement.append(cellElement);
            }

            tableElement.appendChild(rowElement);
        }

        boardContainer.appendChild(tableElement);
    })
    .watch(model => {
        let boards = document.getElementsByClassName("board");

        let display = model.getViewBoard();
        for (let i = 0; i < boards.length; i++) {
            let board = boards[i];
            let stone = display[i];
            switch (stone) {
                case Entity.empty:
                    board.className = "board empty"
                    break;
                case Entity.wall:
                    board.className = "board wall"
                    break;
                case Entity.player:
                    board.className = "board player"
                    break;
                case Entity.goal:
                    board.className = "board goal"
                    break;
            }

        }
    })
    .watch(model => {
        let moveTypeBtn = document.getElementsByClassName("moveTypeBtn");
        for (let i = 0; i < moveTypeBtn.length; i++) {
            if (i === model.moveType) {
                moveTypeBtn[i].className = "moveTypeBtn selected"
            } else {
                moveTypeBtn[i].className = "moveTypeBtn disable"

                // moveTypeBtn[i].style.background = "white";
            }
        }
    })
    .watch(model => {
        // console.log(model.game.round);
        let countText = document.getElementById("counter");
        countText.textContent = `${model.game.round}`;
    })
    .read(model => {
        let moveTypeBtn = document.getElementsByClassName("moveTypeBtn");
        for (let i = 0; i < moveTypeBtn.length; i++) {
            moveTypeBtn[i].addEventListener("click", function () {
                model.setType(i);
            });
        }
    })
    .read(model => {
        window.addEventListener("keydown", (e) => {

            let goal = false;
            switch (e.code) {
                case "ArrowRight":
                    goal = model.move(Direction.right);
                    break;
                case "ArrowLeft":
                    goal = model.move(Direction.left);
                    break;
                case "ArrowUp":
                    goal = model.move(Direction.up);
                    break;
                case "ArrowDown":
                    goal = model.move(Direction.down);
                    break;
                case "KeyQ":
                    model.setType(0);
                    break;
                case "KeyW":
                    model.setType(1);
                    break;
                case "KeyE":
                    model.setType(2);
                    break;
            }
            if (goal) {

                clearStage(stageId, model.game.round).then(() => {
                    console.log(`스테이지 클리어! ${model.game.round}회`)
                    window.location.replace('http://localhost:8080')
                });

                // alert(`스테이지 클리어! ${model.game.round}회`);


            }

        });
    })
    .read(model => {

    })
    .close();
