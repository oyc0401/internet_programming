import {Provider} from "../providerJS/provider.js";
import {GameViewModel} from "./game_viewmodel.js";
import {Direction, Entity} from "./game.js";

const URLSearch = new URLSearchParams(location.search);
let stageNum = URLSearch.get("stage");
Provider.instance({
    model: new GameViewModel(stageNum)
})
    .watch(model => {
        let boards = document.getElementsByClassName("board");

        let display = model.getViewBoard();
        for (let i = 0; i < boards.length; i++) {
            let board = boards[i];
            let stone = display[i];
            switch (stone) {
                case Entity.empty:
                    board.style.background = "burlywood";
                    break;
                case Entity.wall:
                    board.style.background = "black";
                    break;
                case Entity.player:
                    board.style.background = "red";
                    break;
                case Entity.goal:
                    board.style.background = "gold";
                    break;
            }

        }
    })
    .watch(model => {
        let moveTypeBtn = document.getElementsByClassName("moveTypeBtn");
        for (let i = 0; i < moveTypeBtn.length; i++) {
            if (i === model.moveType) {
                moveTypeBtn[i].style.background = "lightskyblue";
            } else {
                moveTypeBtn[i].style.background = "white";
            }
        }
    })
    .watch(model => {

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
            // console.log(e);
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
                alert("스테이지 클리어!", `${model.game.round}회`);
            }

        });
    })
    .read(model => {

    })
    .close();
