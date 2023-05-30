import {ChangeNotifier} from "../../providerJS/provider.js";

import {isUser, logout, deleteUser, getProfile} from "../api/userApi.js";
import {getStages, getStageRank, getUserRank} from "../api/stageApi.js";


export class MainViewModel extends ChangeNotifier {
    nickname
    username
    stages = []
    ranks = []

    stageRank = []
    stageStar1 = 20;
    stageStar2 = 16;
    stageStar3 = 12;
    pointStage = 1;
    stageName = ""

    hide = true;


    async open(stageId) {
        this.pointStage = stageId;
        this.stageRank = await this.getRankStage(stageId);

        let stageJson = this.stages[stageId - 1];
        this.stageName = stageJson.stage.name;
        this.stageStar1 = stageJson.stage.star1;
        this.stageStar2 = stageJson.stage.star2;
        this.stageStar3 = stageJson.stage.star3;

        console.log(this.stageRank);

        this.hide = false;
        this.notifyListeners();
    }

    close() {
        this.hide = true;
        this.notifyListeners();
    }

    complete = false;


    constructor() {
        super();
        this.init();
    }

    async init() {
        // 로그인 체크

        let isUserResponse = await isUser();
        if (isUserResponse.ok) {

        } else if (isUserResponse.status === 401) {
            console.log("로그인을 다시 해주세요")
            window.location.replace('http://localhost:8080/login')
        }

        this.stages = await this.getStage();
        this.ranks = await this.getUserRanks();


        this.complete = true;
        this.notifyListeners();
    }


    // api
    async getStage() {
        const response = await getStages();
        if (response.ok) {
            return await response.json();
        } else if (response.status === 401) {
            console.log("로그인이 필요합니다.")
            window.location.replace('http://localhost:8080/login')
        }
    }

    async getUserRanks() {
        try {
            const response = await getUserRank();
            if (response.ok) {
                // 데이터 처리
                return await response.json();
            } else {
                throw new Error('Error: ' + response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async getRankStage(stageId) {
        try {
            const response = await getStageRank(stageId);
            if (response.ok) {
                // 데이터 처리
                return await response.json();
            } else {
                throw new Error('Error: ' + response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    async profile() {
        let js = getProfile();
        console.log(js)
    }

    async logout() {
        let response = await logout();
        if (response.ok) {
            window.location.replace('http://localhost:8080/login')
        }
    }

    async deleteUser() {

        let response = await deleteUser();
        if (response.ok) {
            console.log("회원 탈퇴 성공")
            window.location.replace('http://localhost:8080/login')
        } else if (response.status === 401) {
            console.log("로그인이 필요합니다.")
            window.location.replace('http://localhost:8080/login')
        }

    }


    stagesDummy = [
        {
            "stage": {
                "id": 1,
                "star1": 20,
                "star2": 15,
                "star3": 10,
                "name": "tutorial",
                "map": "[[1,2,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,3,0,0,0,0],[0,1,0,0,0,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]]"
            },
            "clear": true,
            "unlock": true,
            "move": 6,
            "star": 3
        },
        {
            "stage": {
                "id": 2,
                "star1": 15,
                "star2": 12,
                "star3": 8,
                "name": "grace",
                "map": "[[1,1,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,1,0,0,0,0,0,3,0,2,0,0],[0,1,0,0,0,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]]"
            },
            "clear": true,
            "unlock": true,
            "move": 14,
            "star": 1
        },
        {
            "stage": {
                "id": 3,
                "star1": 21,
                "star2": 16,
                "star3": 13,
                "name": "maze",
                "map": "[[1,1,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,3,0,2,0,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,1,0,1,0,1,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]]"
            },
            "clear": false,
            "unlock": true,
            "move": 0,
            "star": 0
        },
        {
            "stage": {
                "id": 4,
                "star1": 15,
                "star2": 12,
                "star3": 8,
                "name": "stone",
                "map": "[[1,1,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,1,0,0,0,1,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,1,0,0,1,0,0,0],[0,0,0,0,1,0,0,0,0,0,3,0,2,0,0],[0,1,0,0,0,1,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,1,0]]"
            },
            "clear": false,
            "unlock": false,
            "move": 0,
            "star": 0
        },
        {
            "stage": {
                "id": 5,
                "star1": 15,
                "star2": 12,
                "star3": 8,
                "name": "wall",
                "map": "[[1,1,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,3,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,1,0,1,0,0,0,0,0,1,0,0],[0,1,0,0,0,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]]"
            },
            "clear": false,
            "unlock": false,
            "move": 0,
            "star": 0
        }
    ];
}




