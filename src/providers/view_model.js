import {ProviderJS} from "../../providerJS/provider.js"
import {Board, Stone} from "./board.js"


export class ViewModel extends ProviderJS {

    _board = new Board(15);
    text = "init";
    _round = 0;
    _stack = [];


    constructor() {
        super();


    }


    getViewBoard() {
        let li = [];
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                li.push(this._board.at(i,j));
            }
        }
        return li;
    }

    undo() {
        this.text = "undo";
        super.notify();
    }

    reset() {
        this._board = new Board(15);
        // renju = Renju(_board);
        this._round = 0;
        // _viewBoard =
        // List.generate(size, (i) => List.generate(size, (_) => Stone.empty));
        this._stack = [];


        this.text = "reset";
        super.notify();
    }

    put(x, y) {
        let stone = this._round % 2 === 0 ? Stone.black : Stone.white;
        this._round++;
        this._board.set(x, y, stone)
        console.log(x, y);
        super.notify();
    }

}


