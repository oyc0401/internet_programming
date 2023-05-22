export class Board {
    /// 세로가 x, 가로가 y
    _list = [];

    /// 열린 4: 1-5 체크가 가장 큼.
    _padding = 5;
    _size = 15;

    width() {
        return this._size + 2 * this._padding;
    }

    constructor(size) {
        this._size = size
        this._list = this.getWall();
        console.log(this._list[0][0])
        for (let i = this._padding; i < this.width() - this._padding; i++) {
            for (let k = this._padding; k < this.width() - this._padding; k++) {
                this._list[i][k] = Stone.empty;
            }
        }
    }


    at(x, y) {
        return this._list[x + this._padding][y + this._padding];
    }

    set(x, y, rock) {
        this._list[x + this._padding][y + this._padding] = rock;
    }

    copy() {
        let value = this.getWall()
        for (let i = 0; i < this._size; i++) {
            for (let k = 0; k < this._size; k++) {
                value[i][k] = this._list[i + this._padding][k + this._padding];
            }
        }
        return value;
    }

    getWall() {
        let li = new Array(this.width());
        for (let i = 0; i < this.width(); i++) {
            li[i] = new Array(this.width());
        }

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                li[i][j] = Stone.wall;
            }
        }

        return li;
    }

}


export const Stone = {
    wall: -1,
    empty: 0,
    black: 1,
    white: 2,
}