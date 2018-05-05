// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import World from './World/World';

const { ccclass, property } = cc._decorator;

@ccclass
export default class PressAndHolder extends cc.Component {

    world:World = null;

    @property(cc.Float)
    maxPressTimeMS: number = 2000;

    //Time handling
    touchStartTime = null;
    touchEndTime = null;
    touchTotalTime = null;
    isTouching = false;
    hasEndedTouch = false;

    //Events
    touchStart = null;
    touchEnd = null;

    //Callbacks
    private callbackTouchStart:Function = null;
    private callbackTouchEnd:Function = null;
    private target:Object = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.enabled = false;
    }

    enableListeners() {
        this.enabled = true;
        this.isTouching = false;
        this.hasEndedTouch = false;
        this.touchStart = this.node.on(cc.Node.EventType.TOUCH_START, function onTouchStart(event) {
            if(!this.enabled || this.hasEndedTouch) return;
            this.callbackTouchStart.call(this.target, this.maxPressTimeMS);
            this.touchStartTime = Date.now();
            this.isTouching = true;
        }, this, true);
        this.touchEnd = this.node.on(cc.Node.EventType.TOUCH_END, function onTouchEnd(event) {
            if(!this.enabled || !this.isTouching) return;
            this.hasEndedTouch = true;
            this.touchEndTime = Date.now();
            this.touchTotalTime = this.touchEndTime - this.touchStartTime;
            if (this.touchTotalTime >= this.maxPressTimeMS) this.touchTotalTime = this.maxPressTimeMS;
            this.callbackTouchEnd.call(this.target, this.touchTotalTime / this.maxPressTimeMS);
        }, this, true);
    }

    disableListeners() {
        this.enabled = false;
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this.node);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this.node);
    }

    start() 
    {}
    
    setWorld(world){
        this.world = world;
    }

    setTarget(t:Object){
        this.target = t;
    }

    setStartCallback(f:Function) {
        this.callbackTouchStart = f;
    }

    setEndCallback(f:Function){
        this.callbackTouchEnd = f;
    }

    // update(dt) {}
}
