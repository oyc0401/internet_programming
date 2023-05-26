import {ChangeNotifier} from "../providerJS/provider.js";
import {Activity, Game} from "./game.js";
import {getStage} from "./api.js";

export class GameViewModel extends ChangeNotifier {
    game;
    moveType = 0;
    StageNumber = 1;

    constructor(StageNumber) {
        super();
        this.StageNumber = StageNumber;
        this.init();
    }

    async init() {
        let map = await getStage(this.StageNumber)
        console.log(map.map);
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
        this.notifyListeners();
        return goal;
    }


    getViewBoard() {
        return this.game.board.toList();
    }

}


const stage1 = [
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
];



