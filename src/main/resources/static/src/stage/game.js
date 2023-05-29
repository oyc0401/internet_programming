import {Board} from "./board.js";

class Pos {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Game {
    width;
    height;
    board = new Board(1, 2);
    entity = new Board(1, 2);
    round = 0;

    px
    py
    goalPx
    goalPy



    static fromStage(stage) {
        let game = new Game();

        let width = stage.length;
        let height = stage[0].length;

        game.width = width;
        game.height = height;
        game.board = new Board(width, height);
        game.board.setMap(stage);

        // 엔티티
        game.entity = new Board(width, height);

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                if (stage[i][j] === Entity.player) {
                    game.px = i;
                    game.py = j;
                }
                if (stage[i][j] === Entity.goal) {
                    game.goalPx = i;
                    game.goalPy = j;
                }
            }
        }
        // 보드
        game.board.set(game.px, game.py, Entity.empty);

        // 엔티티
        game.entity.set(game.px, game.py, Entity.player);
        game.entity.set(game.goalPx, game.goalPy, Entity.goal);
        // console.log(game.px, game.py)


        return game;
    }

    move(activity, direction) {
        let pos;
        switch (activity) {
            case Activity.walk:
                pos = this.walk(direction);
                break;
            case Activity.jump:
                pos = this.jump(direction);
                break;
            case Activity.dash:
                pos = this.dash(direction);
                break;
        }

        let valid = this.validate(pos.x, pos.y);

        if (valid) {
            this.round += 1;
            this.entity.set(this.px, this.py, Entity.empty);
            this.entity.set(pos.x, pos.y, Entity.player);
            this.px = pos.x;
            this.py = pos.y;
        }

        let goal = this.px === this.goalPx && this.py === this.goalPy;
        return goal;
    }

    validate(x, y) {
        if (this.px === x && this.py === y) {
            return false;
        }

        return this.board.at(x, y) !== Entity.wall;
    }

    // 1칸 이동
    walk(direction) {

        // left, right, up, down
        const dirX = [0, 0, -1, 1];
        const dirY = [-1, 1, 0, 0];

        let dx = dirX[direction];
        let dy = dirY[direction];
        let x = this.px + dx;
        let y = this.py + dy;
        return new Pos(x, y);
    }

    // 2칸 이동, 벽 통과 가능
    jump(direction) {
        // left, right, up, down
        const dirX = [0, 0, -1, 1];
        const dirY = [-1, 1, 0, 0];

        let dx = dirX[direction];
        let dy = dirY[direction];
        let x = this.px + 2 * dx;
        let y = this.py + 2 * dy;
        return new Pos(x, y);
    }

    dash(direction) {
        // left, right, up, down
        const dirX = [0, 0, -1, 1];
        const dirY = [-1, 1, 0, 0];

        let dx = dirX[direction];
        let dy = dirY[direction];

        let x = this.px;
        let y = this.py;
        while (this.board.at(x + dx, y + dy) !== Entity.wall) {
            x += dx;
            y += dy;
        }

        return new Pos(x, y);
    }


}

export const Entity = {
    empty: 0, wall: 1, player: 2, goal: 3,
}

export const Direction = {
    left: 0, right: 1, up: 2, down: 3
}

export const Activity = {
    walk: 0, jump: 1, dash: 2,
}