import BaseGameState from "./BaseGameState";
import { GameStates } from "../Main/GameState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameWinState extends BaseGameState {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        super.start();
    }

    update (dt) {
        super.update(dt);
    }
}
