import StateComponent from "../../StateComponent";
import World from "../../../World";
import Player from "../../../Player";
import PressAndHolder from "../../../PressAndHolder";
import InfiniteVerticalBg from "../../../background/InfiniteVerticalBg";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameState extends StateComponent {

    // LIFE-CYCLE CALLBACKS:
    player:Player = null;
    input:PressAndHolder = null;
    background:InfiniteVerticalBg = null

    onLoad () {
    }

    //Override
    public setWorld(world:World){
        super.setWorld(world);
        this.player = this.world.player;
        this.input = this.world.input;
        this.background = this.world.background;
    }

    start () {
        this.input.setStartCallback(this.touchStart);
        this.input.setEndCallback(this.touchEnd);
        this.input.setTarget(this); 
        this.input.enableListeners();
    }

    touchStart(maxPressTimeMS){
        this.player.startSquash(maxPressTimeMS);
        
    }

    touchEnd(power){
        this.input.disableListeners();        
        this.player.jump(power, this.jumpFinished, this);
    }

    jumpFinished(p) {
        var distance = -this.player.getDistance();
        this.player.moveDownBy(distance, this.world.cameraFollowTimeMS, this.checkLandedPosition, this);
        this.background.moveDownBy(distance, this.world.cameraFollowTimeMS);
    }

    checkLandedPosition() {
        //if game continues
        this.input.enableListeners();
    }

    update (dt) {
        cc.log('ON GAME');
    }
}
