import BaseGameState from "./BaseGameState";
import { GameStates } from "../Main/GameState";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameHandHitState extends BaseGameState {

    // onLoad () {}

    start() {
        super.start();
        this.armHit();
    }

    update(dt) {
        super.update(dt);
    }

    armHit() {
        this.calculateResult();
    }

    calculateResult() {
        var landed = this.w.player.getLandedPoint();

        var isSafe: boolean = false;
        cc.log('landed y: '+landed.y);
        if (landed.y < this.w.player.getMaxLandPoint().y &&
            this.w.monsterFactory.isPointSafe(landed))
            this.changeState(GameStates.WIN);
        else
            this.changeState(GameStates.LOSE);

    }

}
