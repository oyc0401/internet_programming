import {ChangeNotifier} from "../../providerJS/provider.js";

import {deleteUser, getProfile, getStages, getUserRank, logout} from "./api.js";

export class MainViewModel extends ChangeNotifier {
    nickname
    username
    stages = []
    ranks = []

    complete = false;


    constructor() {
        super();
        this.init();
    }

    async init() {
        this.stages = await getStages();
        this.ranks = await getUserRank();
        let js = getProfile();

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




