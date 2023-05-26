import {Provider} from "../../providerJS/provider.js";
import {GameViewModel} from "../model/game_viewmodel.js";
import {Direction, Entity} from "../model/game.js";

// const othePram = {
//     headers: {
//         'content-type': 'application/json, charset=UTF-8',
//     },
//     method: 'GET',
// };
//
// fetch('https://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoSpcifyRouteBusArvlPrearngeInfoList' +
//     '?serviceKey=%2FCX1Je8srsa%2BN1XFaGPVbiGNqbqECXBdN5MYLSf682mak8Po3%2BewTQAuuqybgT6HGAbdv3RLl0%2FqMi32J%2BPbvg%3D%3D' +
//     '&pageNo=1&numOfRows=10&_type=json&cityCode=23&nodeId=ICB163000165&routeId=ICB165000073')
//     .then(response => {
//         if (response.ok) {
//             return response.json(); // JSON 형태의 응답 데이터를 파싱하여 반환
//         } else {
//             throw new Error('Error: ' + response.status);
//         }
//     })
//     .then(data => {
//         console.log(data); // 응답 데이터 출력 또는 원하는 동작 수행
//     })
//     .catch(error => {
//         console.error('Error:', error); // 에러 처리
//     });


Provider.instance({
    model: new GameViewModel()
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
