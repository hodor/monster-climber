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
        this.changeState(GameStates.HANDLE_INPUT);
        
        // Also spawn hint if on bonus
        if(this.w.player.scoreMultiplier >= 2) {
            this.w.monsterFactory.showHint();
        } else {
            // Or else make sure we're not showing
            this.w.monsterFactory.hideHint();
        }
    }

    finishedSpawn() {
    }
    update (dt) {
        super.update(dt);
    }
}
