import {ChangeNotifier} from "../../providerJS/provider.js";

import {deleteUser, getProfile, getStages, getUserRank, logout} from "./api.js";

export class MainViewModel extends ChangeNotifier {
    nickname
    username
    stages = []
    ranks = []
    // // 데모 랭킹 데이터
    // rankings = [
    //     {username: 'user1', nickname: 'Player 1', star: 3, move: 10},
    //     {username: 'user2', nickname: 'Player 2', star: 2, move: 15},
    //     {username: 'user3', nickname: 'Player 3', star: 3, move: 12},
    //     {username: 'user4', nickname: 'Player 4', star: 1, move: 18},
    //     {username: 'user5', nickname: 'Player 5', star: 2, move: 14}
    // ];

    complete = false;


    constructor() {
        super();
        this.init();
    }

    async init() {

        this.stages = await getStages();
        this.ranks = await getUserRank();
        // let js = getProfile();
        // console.log(js)
        this.complete = true;
        this.notifyListeners();
    }

    profile() {
        let js = getProfile();
        console.log(js)
    }

    logout() {
        logout();
    }

    deleteUser() {
        deleteUser();
    }


}




