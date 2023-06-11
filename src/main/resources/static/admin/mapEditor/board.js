export class Board {
    /// 세로가 x, 가로가 y
    _list = [];

    /// 열린 4: 1-5 체크가 가장 큼.
    _padding = 5;
    _width;
    _height;

    getMap() {

        let sendMap = new Array(this._width);
        let maxX = this._width;
        let maxY = this._height;
        for (let i = 0; i < maxX; i++) {
            sendMap[i] = new Array(maxY);
        }

        for (let i = 0; i < this._width ; i++) {
            for (let k = 0; k < this._height ; k++) {
                sendMap[i][k] = this._list[i + this._padding][k + this._padding]
            }
        }
        console.log(sendMap)

        return sendMap;
    }

    constructor(width, height) {
        this._width = width
        this._height = height
        this._list = this.basicPlace();
        for (let i = this._padding; i < this._width + this._padding; i++) {
            for (let k = this._padding; k < this._height + this._padding; k++) {
                this._list[i][k] = 0;
            }
        }
    }

    setMap(list) {
        for (let i = 0; i < this._width; i++) {
            for (let k = 0; k < this._height; k++) {
                this._list[i + this._padding][k + this._padding] = list[i][k];
            }
        }
    }

    at(x, y) {
        return this._list[x + this._padding][y + this._padding];
    }

    set(x, y, rock) {
        this._list[x + this._padding][y + this._padding] = rock;
    }


    basicPlace() {
        let li = new Array(this._width);
        let maxX = this._width + this._padding * 2;
        let maxY = this._height + this._padding * 2;
        for (let i = 0; i < maxX; i++) {
            li[i] = new Array(maxY);
        }

        for (let i = 0; i < maxX; i++) {
            for (let j = 0; j < maxY; j++) {
                li[i][j] = 1;
            }
        }

        return li;
    }

    toList() {
        console.log("toList: ",this._width, this._height)
        let li = [];
        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j < this._height; j++) {
                li.push(this.at(i, j));
            }
        }

        return li;
    }

}


