// 리액트를 참고해서 만든 flutter의 상태관리중 하나인
// provider를 참고해서 만든
// 바닐라 자바스크립트 상태 관리 라이브러리

export class ProviderJS {

    states = [];

    constructor() {
    }

    notify() {
        for (let i = 0; i < this.states.length; i++) {
            let fun = this.states[i];
            fun();
        }
    }

    watch(fun) {
        this.states.push(fun);
    }
}

