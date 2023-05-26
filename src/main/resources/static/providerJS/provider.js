// 리액트를 참고해서 만든 flutter의 상태관리 중 하나인
// provider를 참고해서 만든
// 바닐라 자바스크립트 상태 관리 라이브러리

export class Provider {
    #view_model;

    static instance({model}) {
        return new Provider(model);
    }

    constructor(model) {
        if (!model instanceof ChangeNotifier) {
            throw "Provider: ChangeNotifier를 넣어주세요";
        }
        this.#view_model = model;
    }

    watch(listener) {
        if (typeof listener != "function") {
            throw "Provider.watch: 입력한 리스너를 확인해주세요";
        }

        this.#view_model.addListener(listener);
        return this;
    }

    read(read) {
        if (typeof read != "function") {
            throw "Provider.read: 입력한 함수를 확인해주세요";
        }

        read(this.#view_model);
        return this;
    }

    close() {
        this.#view_model.notifyListeners();
    }


    // watchItem({element, listener}) {
    //     if (typeof listener != "function") {
    //         console.log(typeof listener);
    //         throw "Provider.watch: 입력한 리스너를 확인해주세요";
    //     }
    //
    //     this.#view_model.addListener(element,listener);
    //     return this;
    // }


    readItem({element, func: read}) {
        if (!element instanceof Element) {
            throw "Provider.read: Element를 확인해주세요";
        }
        if (typeof read != "function") {
            throw "Provider.read: 입력한 함수를 확인해주세요";
        }


        read(element, this.#view_model);
        return this;
    }


}

export class ChangeNotifier {
    #listeners = [];

    notifyListeners() {
        for (let i = 0; i < this.#listeners.length; i++) {
            let listener = this.#listeners[i];
            try {
                listener(this);
            } catch (e) {
            }
        }
    }

    addListener(listener) {
        if (typeof listener != "function") {
            console.log(typeof listener);
            throw "ChangeNotifier.addListener: 리스너만 추가해주세요";
        }
        this.#listeners.push(listener);
    }
}


