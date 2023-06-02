import {Provider} from "../providerJS/provider.js";
import {GameViewModel} from "./mapEditor-model.js";
import {Direction, Entity} from "./game.js";
import {getUrl} from "../navigator/navigator.js";

const URLSearch = new URLSearchParams(location.search);
let stageId = URLSearch.get("stage");

Provider.instance({
    model: new GameViewModel(stageId)
})
    /** 데이터 불러오기 */
    .init(model => {

        /** 게임 화면 제작 */
        model.write().then(() => {
            let boardContainer = document.getElementById("board-container");
            while (boardContainer.firstChild) {
                boardContainer.firstChild.remove();
            }

            let tableElement = document.createElement("table");
            for (let i = 0; i < model.height; i++) {
                let rowElement = document.createElement("tr");

                for (let k = 0; k < model.width; k++) {
                    let cellElement = document.createElement("td");
                    cellElement.classList.add("board");
                    let entityElement = document.createElement("div");
                    entityElement.classList.add("entity");
                    entityElement.onclick = function () {
                        model.click(i, k);
                    }
                    cellElement.append(entityElement);
                    rowElement.append(cellElement);
                }
                tableElement.appendChild(rowElement);
            }

            boardContainer.appendChild(tableElement);
            model.notifyListeners();
        });
    })
    /** 게임화면 바닥 만들기 */
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
    /** 게임 사물 만들기 */
    .watch(model => {

        let entities = document.getElementsByClassName("entity");

        let display = model.getViewEntity();
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            let stone = display[i];
            switch (stone) {
                case Entity.empty:
                    entity.className = "entity"
                    break;
                case Entity.player:
                    entity.className = "entity player"
                    break;
                // case Entity.goal:
                //     entity.className = "entity goal"
                //     break;

            }

        }
    })
    /** 이동 버튼 색 칠하기 */
    .watch(model => {
        let moveTypeBtn = document.getElementsByClassName("moveTypeBtn");
        for (let i = 0; i < moveTypeBtn.length; i++) {
            if (i === model.moveType) {
                moveTypeBtn[i].className = "moveTypeBtn selected"
            } else {
                moveTypeBtn[i].className = "moveTypeBtn disable"
            }
        }
    })
    /** 클리어 보드 보여주기 */
    .watch(model => {

        let popup = document.getElementById("popup-center");

        if (model.clear) {
            popup.style.visibility = "visible";
        } else {
            popup.style.visibility = "hidden";
        }
    })
    /** 클리어 보드 꾸미기 */
    .watch(model => {

        let clearText = document.getElementById("clear-text");
        clearText.textContent = `stage ${model.stageId} clear!`

        let clearScore = document.getElementById("clear-score");
        clearScore.textContent = model.clearScore;

        let clearRank = document.getElementById("clear-rank");
        clearRank.textContent = `rank: ${model.clearRank}`

    })
    /**
     * 클릭 이벤트 설정
     */

    /** 버튼 클릭 설정하기 */
    .read(model => {


        // 왼쪽 위 메뉴 버튼
        let menuButton = document.getElementById("menu");
        menuButton.onclick = function () {
            location.replace(getUrl('/'))
        }

        // 왼쪽 위 불러오기 버튼
        let bringButton = document.getElementById("bring");
        bringButton.onclick = function () {
            /** 게임 화면 제작 */
            model.init().then(() => {
                let boardContainer = document.getElementById("board-container");
                while (boardContainer.firstChild) {
                    boardContainer.firstChild.remove();
                }

                let tableElement = document.createElement("table");
                for (let i = 0; i < model.height; i++) {
                    let rowElement = document.createElement("tr");

                    for (let k = 0; k < model.width; k++) {
                        let cellElement = document.createElement("td");
                        cellElement.classList.add("board");
                        let entityElement = document.createElement("div");
                        entityElement.classList.add("entity");
                        cellElement.append(entityElement);
                        rowElement.append(cellElement);
                    }

                    tableElement.appendChild(rowElement);
                }

                boardContainer.appendChild(tableElement);
                model.notifyListeners();
            });
        }

        // 이동 타입 버튼
        let moveTypeBtn = document.getElementsByClassName("moveTypeBtn");
        for (let i = 0; i < moveTypeBtn.length; i++) {
            moveTypeBtn[i].addEventListener("click", function () {
                model.setType(i);
            });
        }


        let widthForm = document.getElementById("width-form");
        let heightForm = document.getElementById("height-form");



        let changeSizeBtn = document.getElementById("change-size");
        changeSizeBtn.onclick = function () {

            model.changeSize(parseInt (widthForm.value),parseInt(heightForm.value));
        }

    })
    /** 키보드 클릭 설정하기 */
    .read(model => {
        window.addEventListener("keydown", (e) => {
            console.log(e)

            // 게임 플레이 중 키보드 클릭

            switch (e.code) {
                case "ArrowRight":
                    model.move(Direction.right);
                    break;
                case "ArrowLeft":
                    model.move(Direction.left);
                    break;
                case "ArrowUp":
                    model.move(Direction.up);
                    break;
                case "ArrowDown":
                    model.move(Direction.down);
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
                case "Escape":
                case "KeyM":
                    console.log("exit")
                    let menuButton = document.getElementById("menu");
                    menuButton.click();
                    break;
            }

        }); // addEventListener
    })
    .read(model => {
    })
    .read(model => {
    })
    .close();
