import {ChangeNotifier} from "../../providerJS/provider.js";
import {Activity, Entity, Game} from "./game.js";
import {clearStage, getStage} from "../../src/api/stageApi.js";
import {isUser} from "../../src/api/userApi.js";
import {getUrl} from "../../navigator/navigator.js";

export class GameViewModel extends ChangeNotifier {
    game;
    moveType = 0;
    stageId = 1;
    width = 6
    height = 6
    stageName = ""
    star1 = 0
    star2 = 0
    star3 = 0
    admin = false


    constructor(stageId) {
        super();
        this.stageId = parseInt(stageId);
        // this.init();
    }

    async ifNotUserMoveLoginPage() {
        let response = await isUser();
        if (response.ok) {
        } else if (response.status === 401) {
            console.log("로그인을 다시 해주세요")
            location.replace(getUrl('/login'))
        } else {
            console.error(`${response.status}`)
        }
    }

    // api
    async stageget(stageId) {
        const response = await getStage(stageId);
        let stage = [[2]];

        if (response.ok) {
            const data = await response.json();
            data.map = JSON.parse(data.map);
            stage = data;
        } else {
            throw new Error('Error: ' + response.status);
        }

        return stage
    }


    async init() {
        // 로그인 체크
        // await this.ifNotUserMoveLoginPage();
        let map = await this.stageget(this.stageId)
        console.log(map);
        this.height = map.map.length;
        this.width = map.map[0].length;
        this.game = Game.fromStage(map.map);
        this.stageName = map.name
        // this.stageName = "3w21312312312312"
        this.star1 = map.star1
        this.star2 = map.star2
        this.star3 = map.star3

        this.notifyListeners();
    }


    async write() {
        this.game = Game.createGame(this.width, this.height);
        this.notifyListeners();
    }

    changeSize(x, y) {
        this.game.changeSize(x, y);
        this.width = x;
        this.height = y;
        this.notifyListeners();
    }


    click(x, y) {

        console.log(`${x}, ${y}`)

        if (this.moveType === 0) {
            // 지우기
            this.setBoard(x, y, Entity.empty);
            this.setEntity(x, y, Entity.empty);
        }
        if (this.moveType === 1) {
            // 벽
            this.setBoard(x, y, Entity.wall);
        }
        if (this.moveType === 2) {
            // 플레이어
            this.setBoard(x, y, Entity.player);
            this.setEntity(x, y, Entity.player);
        }
        if (this.moveType === 3) {
            // 골대
            this.setBoard(x, y, Entity.goal);
        }


    }


    setType(type) {
        this.moveType = type;
        this.notifyListeners();
    }

    setBoard(x, y, entity) {
        this.game.setBoard(x, y, entity);
        this.notifyListeners();
    }

    setEntity(x, y, entity) {
        this.game.setEntity(x, y, entity);
        this.notifyListeners();
    }

    getViewBoard() {
        return this.game.board.toList();
    }

    getViewEntity() {
        return this.game.entity.toList();
    }


}




