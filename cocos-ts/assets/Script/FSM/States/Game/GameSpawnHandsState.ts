import BaseGameState from "./BaseGameState";
import { GameStates } from "../Main/GameState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameSpawnHandsState extends BaseGameState {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        super.start();
        var p:cc.Vec2 = this.w.player.getNextTarget();
        this.w.monsterFactory.spawnArms(p, this.finishedSpawn, this);
    }

    finishedSpawn() {
        this.changeState(GameStates.HANDLE_INPUT);
    }
    update (dt) {
        super.update(dt);
    }
}
