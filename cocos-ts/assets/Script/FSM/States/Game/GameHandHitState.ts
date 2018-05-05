import BaseGameState from "./BaseGameState";
import { GameStates } from "../Main/GameState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameHandHitState extends BaseGameState {

    // onLoad () {}

    start () {
        super.start();
        var landed = this.w.player.getLandedPoint();

        var isSafe: boolean = false;
        if(this.w.monsterFactory.isPointSafe(landed))
            cc.log('IS SAFE');
        else   
            cc.log('IS DEAD');
    }

    update (dt) {
        super.update(dt);
    }


}
