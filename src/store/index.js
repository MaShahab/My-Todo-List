import {observable,action} from "mobx";
import {bindActionCreators} from "redux";

class Store {
    @observable loadingProgress;
    constructor() {
        this.loadingProgress = document.getElementById("loading_division");
    }

    @action
    stopTime(){
    //
    }

    @action
    resumeTime(){
        // this.time = new Date();
        // this.time.toLocaleTimeString()
    }
}

const myStore = new Store();
export default myStore;