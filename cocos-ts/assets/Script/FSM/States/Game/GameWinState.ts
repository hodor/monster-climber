import BaseGameState from "./BaseGameState";
import { GameStates } from "../Main/GameState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameWinState extends BaseGameState {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        super.start();
        var distance = -this.w.player.getDistance();
        this.w.monsterFactory.move(distance, this.world.cameraFollowTimeMS);
        this.move();
    }

    update (dt) {
        super.update(dt);
    }

    move(){
        var distance = -this.w.player.getDistance();
        this.w.player.moveDownBy(distance, this.world.cameraFollowTimeMS, this.finishedMoving, this);
        this.w.background.moveDownBy(distance, this.world.cameraFollowTimeMS);
    }

    finishedMoving() {
        this.w.monsterFactory.moveOut(0.25, this.finish, this);
    }

    finish(){
        this.w.monsterFactory.deleteArms();
        this.changeState(GameStates.SPAWN_HANDS);
    }
}
