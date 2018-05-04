// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Player from './Player';
import PressAndHolder from './PressAndHolder';
import InfiniteVerticalBg from './background/InfiniteVerticalBg';

const {ccclass, property} = cc._decorator;

@ccclass
export default class World extends cc.Component {

    @property(Player)
    player: Player = null;
    @property
    cameraFollowTimeMS: number = 0.25;

    @property(InfiniteVerticalBg)
    background: InfiniteVerticalBg = null;

    @property(PressAndHolder)
    input: PressAndHolder = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.input.setWorld(this);
        this.input.enableListeners();
    }

    start () {
    }

    // update (dt) {}

    touchStart(maxPressTimeMS){
        this.player.startSquash(maxPressTimeMS);
    }

    touchEnd(power){
        this.player.jump(power, this.jumpFinished, this);
        this.input.disableListeners();
    }

    jumpFinished(p) {
        var distance = -this.player.getDistance();
        this.player.moveDownBy(distance, this.cameraFollowTimeMS, this.checkLandedPosition, this);
        this.background.moveDownBy(distance, this.cameraFollowTimeMS);
    }

    checkLandedPosition() {
        //if game continues
        this.input.enableListeners();
    }
}
