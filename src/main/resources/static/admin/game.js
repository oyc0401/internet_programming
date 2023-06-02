import {Board} from "./board.js";

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

    changeSize(width, height) {
        let newBoard = new Board(width, height);
        let newEntity = new Board(width, height);

        for (let i = 0; i < this.width || i < width; i++) {
            for (let k = 0; k < this.height || k < height; k++) {
                newBoard.set(i, k, this.board.at(i, k));
                newEntity.set(i, k, this.entity.at(i, k));
            }
        }
        console.log(width,height);
        this.board = newBoard;
        this.entity = newEntity;
    }

    static createGame(width, height) {
        let game = new Game();
        game.width = width;
        game.height = height;

        game.board = new Board(width, height);
        game.entity = new Board(width, height);

        game.px = 0;
        game.py = 0;
        game.goalPx = width - 1;
        game.goalPy = height - 1;
        game.entity.set(game.px, game.py, Entity.player);
        game.entity.set(game.goalPx, game.goalPy, Entity.goal);

        return game;

    }


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

    setBoard(x, y, entity) {
        this.board.set(x, y, entity);
    }

    setEntity(x, y, entity) {
        this.entity.set(x, y, entity);
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