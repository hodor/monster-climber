import BaseGameState from "./BaseGameState";
import { GameStates } from "../Main/GameState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameSpawnHandsState extends BaseGameState {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        super.start();
    }

    totalTime = 0;
    update (dt) {
        super.update(dt);
        this.totalTime += dt;
        if(this.totalTime >= 2) {
            this.changeState(GameStates.HANDLE_INPUT);
        }
    }
}
