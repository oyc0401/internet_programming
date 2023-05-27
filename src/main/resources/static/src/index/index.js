// 데모 스테이지 데이터
const stages = [
    { id: 1, name: 'Stage 1' },
    { id: 2, name: 'Stage 2' },
    { id: 3, name: 'Stage 3' },
    { id: 4, name: 'Stage 4' },
    { id: 5, name: 'Stage 5' }
];


// 데모 랭킹 데이터
const rankings = [
    { username: 'user1', nickname: 'Player 1', star: 3, move: 10 },
    { username: 'user2', nickname: 'Player 2', star: 2, move: 15 },
    { username: 'user3', nickname: 'Player 3', star: 3, move: 12 },
    { username: 'user4', nickname: 'Player 4', star: 1, move: 18 },
    { username: 'user5', nickname: 'Player 5', star: 2, move: 14 }
];

// 스테이지 버튼 생성
const stageButtonsContainer = document.getElementById('stage-buttons');

stages.forEach(stage => {
    const stageButton = document.createElement('a');
    stageButton.classList.add('stage-button');
    stageButton.textContent = stage.name;
    stageButton.href = `game?stage=${stage.id}`; // 스테이지 페이지로 연결할 링크 설정

    stageButtonsContainer.appendChild(stageButton);
});

// 랭킹 생성
const rankingsContainer = document.getElementById('rankings');

rankings.forEach((ranking, index) => {
    const rankingItem = document.createElement('div');
    rankingItem.classList.add('ranking-item');

    const rank = document.createElement('span');
    rank.classList.add('rank');
    rank.textContent = index + 1;

    const nickname = document.createElement('span');
    nickname.classList.add('nickname');
    nickname.textContent = ranking.nickname;

    const star = document.createElement('span');
    star.classList.add('star');
    star.textContent = `Star: ${ranking.star}`;

    const move = document.createElement('span');
    move.classList.add('move');
    move.textContent = `Move: ${ranking.move}`;

    rankingItem.appendChild(rank);
    rankingItem.appendChild(nickname);
    rankingItem.appendChild(star);
    rankingItem.appendChild(move);

    console.log(rankingsContainer)
    rankingsContainer.appendChild(rankingItem);
});

import {MainViewModel} from "./main-model.js";
import {Provider} from "../../providerJS/provider.js";

Provider.instance({
    model: new MainViewModel()
})
    .watch(model => {


    })
    .watch(model => {

    })
    .watch(model => {

    })
    .read(model => {
        let profileButton=document.getElementById("profile-button");
        profileButton.onclick=function (){
            model.profile();
        }

        let logoutButton=document.getElementById("logout-button");
        logoutButton.onclick=function (){
            model.logout();
        }
        let withDrawButton=document.getElementById("withdraw-button");
        withDrawButton.onclick=function (){
            model.deleteUser();
        }
    })
    .read(model => {

    })
    .read(model => {

    })
    .close();





