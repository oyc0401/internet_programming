// 데모 스테이지 데이터
import {getUrl} from "../../navigator/navigator.js";
import {MainViewModel} from "./home-model.js";
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
                        location.href = getUrl('/edit', `?stage=${stageJson.stage.id}`)
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
                stageButtonsContainer.appendChild(stageButton);
            }
        }
    })


    .read(model => {
        let addButton = document.getElementById("add-button");
        addButton.onclick = function () {
            console.log(model.stages.length)
            location.href = getUrl('/edit', `?stage=${model.stages.length+1}`)
        }
    })


    .close();





