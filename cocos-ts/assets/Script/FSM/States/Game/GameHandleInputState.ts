import BaseGameState from "./BaseGameState";
import { GameStates } from "../Main/GameState";
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameHandlInputState extends BaseGameState {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        super.start();
        this.w.input.setStartCallback(this.touchStart);
        this.w.input.setEndCallback(this.touchEnd);
        this.w.input.setTarget(this); 
        this.w.input.enableListeners();
    }

    touchStart(maxPressTimeMS){
        this.w.player.startSquash(maxPressTimeMS);
        
    }

    touchEnd(power){
        this.w.input.disableListeners();        
        this.w.player.jump(power, this.jumpFinished, this);
    }

    jumpFinished() {
        this.changeState(GameStates.HAND_HIT);
    }

    checkLandedPosition() {
        //if game continues
        this.w.input.enableListeners();
    }
    update (dt) {
        super.update(dt);
    }
}
