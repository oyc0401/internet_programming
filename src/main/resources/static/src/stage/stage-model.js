import {ChangeNotifier} from "../../providerJS/provider.js";
import {Activity, Game} from "./game.js";
import {getStage} from "./api.js";

export class GameViewModel extends ChangeNotifier {
    game;
    moveType = 0;
    StageNumber = 1;
    width = 0
    height = 0

    constructor(StageNumber) {
        super();
        this.StageNumber = StageNumber;
        this.init();
    }

    async init() {
        let map = await getStage(this.StageNumber)
        console.log(map);
        this.height = map.map.length;
        this.width = map.map[0].length;
        this.game = Game.fromStage(map.map);
        this.notifyListeners();
    }


    setType(type) {
        this.moveType = type;
        this.notifyListeners();
    }


    move(direction) {
        let goal = false;
        if (this.moveType === 0) {
            // 1칸 이동
            goal = this.game.move(Activity.walk, direction);
        }
        if (this.moveType === 1) {
            // 2칸 이동
            goal = this.game.move(Activity.jump, direction);
        }
        if (this.moveType === 2) {
            // 벽 만날때 까지 이동
            goal = this.game.move(Activity.dash, direction);
        }
        // console.log(goal)
        this.notifyListeners();
        return goal;
    }


    getViewBoard() {
        return this.game.board.toList();
    }

}




