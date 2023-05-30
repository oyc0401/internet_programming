// 데모 스테이지 데이터
const stages = [
    {id: 1, name: 'Stage 1'},
    {id: 2, name: 'Stage 2'},
    {id: 3, name: 'Stage 3'},
    {id: 4, name: 'Stage 4'},
    {id: 5, name: 'Stage 5'}
];


// // 데모 랭킹 데이터
// const rankings = [
//     {username: 'user1', nickname: 'Player 1', star: 3, move: 10},
//     {username: 'user2', nickname: 'Player 2', star: 2, move: 15},
//     {username: 'user3', nickname: 'Player 3', star: 3, move: 12},
//     {username: 'user4', nickname: 'Player 4', star: 1, move: 18},
//     {username: 'user5', nickname: 'Player 5', star: 2, move: 14}
// ];


import {MainViewModel} from "./main-model.js";
import {Provider} from "../../providerJS/provider.js";

Provider.instance({
    model: new MainViewModel()
})
    .watch(model => {
        // 스테이지 버튼 생성
        const stageButtonsContainer = document.getElementById('stage-buttons');
        // 자식 요소 전부 삭제
        while (stageButtonsContainer.firstChild) {
            stageButtonsContainer.firstChild.remove();
        }
        if (model.complete) {
            console.log(model.stages)

            for (const stageJson of model.stages) {
                const stageButton = document.createElement('a');
                stageButton.classList.add('stage-button');
                stageButton.textContent = stageJson.stage.name;
                // let starCount=stage.stage.

                if (stageJson.unlock === true) {
                    stageButton.classList.add('unlock');
                    stageButton.onclick = function () {
                        // model.stageStar1= stageJson.stage.star1;
                        // model.stageStar2= stageJson.stage.star2;
                        // model.stageStar3= stageJson.stage.star3;
                        // console.log(model.stageStar3)

                        model.open(stageJson.stage.id)
                    }


                    // stageButton.href = `game?stage=${stage.stage.id}`; // 스테이지 페이지로 연결할 링크 설정

                    const starIcons = document.createElement("div");
                    starIcons.classList.add("star-icons");

                    let starCount = stageJson.star;

                    // 별 개수에 따라 노란색과 회색 별 생성
                    for (let i = 0; i < starCount; i++) {
                        const star = document.createElement("span");
                        star.classList.add("star", "fa", "fa-star", "yellow");
                        starIcons.appendChild(star);
                    }

                    for (let i = starCount; i < 3; i++) {
                        const star = document.createElement("span");
                        star.classList.add("star", "fa", "fa-star", "gray");
                        starIcons.appendChild(star);
                    }

                    // 버튼에 별 아이콘 추가
                    stageButton.appendChild(starIcons);

                } else {
                    stageButton.classList.add('lock');
                }

                if (stageJson.clear === true) {

                } else {

                }


                stageButtonsContainer.appendChild(stageButton);
            }
        }
    })
    .watch(model => {
        // 랭킹 생성
        const rankingsContainer = document.getElementById('rankings');
        // 자식 요소 전부 삭제
        while (rankingsContainer.firstChild) {
            rankingsContainer.firstChild.remove();
        }
        if (model.complete) {
            console.log(model.ranks)
            for (let i = 0; i < model.ranks.length || i < 10; i++) {
                let ranking = model.ranks[i];

                const rankingItem = document.createElement('div');
                rankingItem.classList.add('ranking-item');

                const rank = document.createElement('span');
                rank.classList.add('rank');
                rank.textContent = i + 1;
                if (i + 1 === 1) {
                    rank.classList.add('gold');
                }
                if (i + 1 === 2) {
                    rank.classList.add('silver');
                }
                if (i + 1 === 3) {
                    rank.classList.add('bronze');
                }

                const nickname = document.createElement('span');
                nickname.classList.add('nickname');
                nickname.textContent = ranking.nickname;

                const star = document.createElement('span');
                star.classList.add('starText');
                star.textContent = `️${ranking.star}`;

                const move = document.createElement('span');
                move.classList.add('moveText');
                move.textContent = `${ranking.move}`;

                rankingItem.appendChild(rank);
                rankingItem.appendChild(nickname);
                rankingItem.appendChild(star);
                rankingItem.appendChild(move);

                // console.log(rankingsContainer)
                rankingsContainer.appendChild(rankingItem);
            }

        }

    })
    .watch(model => {
        // 스테이지 랭킹 생성
        const rankingsContainer = document.getElementById('stage-rankings');
        // 자식 요소 전부 삭제
        while (rankingsContainer.firstChild) {
            rankingsContainer.firstChild.remove();
        }
        if (model.complete) {
            console.log(model.stageRank)
            if (model.stageRank.length === 0) {
                const rankingItem = document.createElement('div');
                rankingItem.textContent = "랭킹이 없습니다.";
                rankingsContainer.appendChild(rankingItem);
            }

            for (let i = 0; i < model.stageRank.length || i < 10; i++) {
                let ranking = model.stageRank[i];

                const rankingItem = document.createElement('div');
                rankingItem.classList.add('ranking-item');

                const rank = document.createElement('span');
                rank.classList.add('rank');
                rank.textContent = i + 1;
                if (i + 1 === 1) {
                    rank.classList.add('gold');
                }
                if (i + 1 === 2) {
                    rank.classList.add('silver');
                }
                if (i + 1 === 3) {
                    rank.classList.add('bronze');
                }

                const nickname = document.createElement('span');
                nickname.classList.add('nickname');
                nickname.textContent = ranking.nickname;

                const star = document.createElement('span');
                star.classList.add('starText');
                star.textContent = `️${ranking.star}`;

                const move = document.createElement('span');
                move.classList.add('moveText');
                move.textContent = `${ranking.move}`;

                rankingItem.appendChild(rank);
                rankingItem.appendChild(nickname);
                rankingItem.appendChild(star);
                rankingItem.appendChild(move);

                // console.log(rankingsContainer)
                rankingsContainer.appendChild(rankingItem);
            }

        }

    })
    .watch(model => {

    })
    .read(model => {
        let profileButton = document.getElementById("profile-button");
        profileButton.onclick = function () {
            model.profile();
        }

        let logoutButton = document.getElementById("logout-button");
        logoutButton.onclick = function () {
            model.logout();
        }
        let withDrawButton = document.getElementById("withdraw-button");
        withDrawButton.onclick = function () {
            model.deleteUser();
        }
    })
    .watch(model => {
        let stageName = document.getElementById("stage-name");
        let star1Score = document.getElementById("star1-score");
        let star2Score = document.getElementById("star2-score");
        let star3Score = document.getElementById("star3-score");

        star1Score.textContent = model.stageStar1;
        star2Score.textContent = model.stageStar2;
        star3Score.textContent = model.stageStar3;
        stageName.textContent = model.stageName;

    })

    .read(model => {
        let popup = document.getElementById("popup-center");
        popup.onclick = function () {
            popup.style.visibility = "hidden";
        }

        let stageInfo = document.getElementById("stage-info");
        stageInfo.onclick = function () {
            event.stopPropagation();
        }


    })
    .watch(model => {
        let popup = document.getElementById("popup-center");


        if (!model.hide) {
            popup.style.visibility = "visible";
        } else {
            popup.style.visibility = "hidden";
        }
    })
    .read(model => {
        let closeButton = document.getElementById("close-button");
        closeButton.onclick = function () {
            model.close();
        }

        let playButton = document.getElementById("play-button");
        playButton.onclick = function () {
            // console.log(`game?stage=${model.pointStage}`)
            location.href = `game?stage=${model.pointStage}`;
            model.close();
        }
    })
    /** 키보드 클릭 설정하기 */
    .read(model => {
        window.addEventListener("keydown", (e) => {
            console.log(e)

            // 스테이지 정보가 나올 때
            if (!model.hide) {
                switch (e.code) {
                    case "Enter":
                    case "Space":
                        let playButton = document.getElementById("play-button");
                        playButton.click();
                        break;
                }
            }
        }); // addEventListener
    })
    .read(model => {


    })
    .close();





