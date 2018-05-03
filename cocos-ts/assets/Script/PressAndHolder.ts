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

const {ccclass, property} = cc._decorator;

@ccclass
export default class PressAndHolder extends cc.Component {

    @property(cc.Float)
    maxPressTimeMS:number = 2000;

    @property(cc.Label)
    textLabel: cc.Label = null;

    @property(Player)
    player: Player = null;

    //Time handling
    touchStartTime = null;
    touchEndTime = null;
    touchTotalTime = null;
    isTouching = false;

    //Events
    touchStart = null;
    touchEnd = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.enableListeners();        
    }

    enableListeners () {
        cc.log('set input');
        this.touchStart = this.node.on(cc.Node.EventType.TOUCH_START, function onTouchStart(event){
            this.player.startSquash();
            this.touchStartTime = Date.now();
        }, this, true);
        this.touchEnd = this.node.on(cc.Node.EventType.TOUCH_END, function onTouchEnd(event) {
            this.touchEndTime = Date.now();
            this.touchTotalTime = this.touchEndTime - this.touchStartTime;
            if(this.touchTotalTime >= this.maxPressTimeMS) this.touchTotalTime = this.maxPressTimeMS;
            this.player.jump(this.touchTotalTime / this.maxPressTimeMS);

            this.textLabel.string = this.touchTotalTime;
        }, this, true);
    }

    disableListeners () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this.node);
        this.node.off(cc.Node.EventType.TOUCH_END,   this.touchEnd,   this.node);
    }

    start () {
    }

    // update (dt) {}
}
