import BaseGameState from "./BaseGameState";
import { GameStates } from "../Main/GameState";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameHandHitState extends BaseGameState {

    // onLoad () {}

    start() {
        super.start();
        this.calculateResult();
    }

    update(dt) {
        super.update(dt);
    }

    calculateResult() {
        var landed = this.w.player.getLandedPoint();

        var isSafe: boolean = false;
        if (landed.y < this.w.player.getMaxLandPoint().y &&
            this.w.monsterFactory.isPointSafe(landed)) {
            this.changeState(GameStates.WIN);

        } else {
            this.w.monsterFactory.playArmKilled();
        //    this.w.player.playDeath();
            this.changeState(GameStates.LOSE);
        }
    }


}
