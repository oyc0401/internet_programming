import {ChangeNotifier} from "../../providerJS/provider.js";
import {Activity, Game} from "./game.js";
import {clearStage, getStage, ifNotUserMoveLoginPage} from "./api.js";

export class GameViewModel extends ChangeNotifier {
    game;
    moveType = 0;
    stageId = 1;
    width = 0
    height = 0
    stageName = ""
    star1 = 0
    star2 = 0
    star3 = 0

    clear = false;

    clearStar = 2
    clearScore = 0
    clearRank = 0
    nextExist = false;

    async clearStage() {
        let data = await clearStage(this.stageId, this.game.round);
        console.log(data)
        this.clearStar = data.star;
        this.clearScore = data.move;
        this.clearRank = data.rank;
        this.nextExist = data.nextExist;
        console.log(`스테이지 클리어! ${this.game.round}회`)
        this.notifyListeners();

    }


    constructor(stageId) {
        super();
        this.stageId = parseInt(stageId);
        // this.init();
    }

    async init() {
        // 로그인 체크
        await ifNotUserMoveLoginPage();

        let map = await getStage(this.stageId)
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


    setType(type) {
        this.moveType = type;
        this.notifyListeners();
    }


    move(direction) {
        if (this.moveType === 0) {
            // 1칸 이동
            this.clear = this.game.move(Activity.walk, direction);
        }
        if (this.moveType === 1) {
            // 2칸 이동
            this.clear = this.game.move(Activity.jump, direction);
        }
        if (this.moveType === 2) {
            // 벽 만날때 까지 이동
            this.clear = this.game.move(Activity.dash, direction);
        }

        // 클리어 시 실행
        if (this.clear) {
            this.clearStage();
        }

        this.notifyListeners();
    }


    getViewBoard() {
        return this.game.board.toList();
    }

    getViewEntity() {
        return this.game.entity.toList();
    }


}




