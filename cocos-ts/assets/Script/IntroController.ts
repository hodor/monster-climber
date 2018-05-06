// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import World from './world/World';
import {MainStates} from './world/World';

const {ccclass, property} = cc._decorator;

@ccclass
export default class IntroController extends cc.Component {
 
    @property(World)
    world:World = null;
    @property(cc.Label)
    instructionHoldLabel:cc.Label = null;

    @property(cc.Label)
    instructionReleaseLabel:cc.Label = null;

    @property(cc.AudioClip)
    PressAndHoldSound:cc.AudioClip = null;

    animation:cc.Animation;

    onTouchStart = null;
    onTouchEnd = null;
    
    //onLoad () { };

    start () {
        this.addListeners();
        this.playGrowl();
    }


    playGrowl() {
        var waitTime = (Math.random()*2+5);
        cc.log(waitTime);
        cc.log('lol');
        cc.Scheduler(this.playGrowl, waitTime, this, false);
    }

    touchStart(event) {
        var actionFadeOut = cc.fadeTo(0.3, 0);
        this.instructionHoldLabel.node.runAction(cc.sequence(actionFadeOut, cc.callFunc(function callBack () {
                if(!this.onTouchEnd) return;
                var actionFadeIn = cc.fadeTo(0.5, 255);
                this.instructionReleaseLabel.node.runAction(actionFadeIn);    
            }, this)));
        
        
    }

    touchEnd(event) {
        if(!this.onTouchEnd) return;
        this.removeListeners();
        this.instructionReleaseLabel.node.stopAllActions();
        this.instructionHoldLabel.node.stopAllActions();
        this.instructionReleaseLabel.node.opacity = 0;
        this.instructionHoldLabel.node.opacity = 0;
        this.playIntro();
    }
        

    removeListeners () {
        cc.log('removed');
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this.node, true);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this.node, true);
        this.onTouchStart = null;
        this.onTouchEnd = null;
    }

    addListeners () {
        this.onTouchStart = this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this, true);
        this.onTouchEnd = this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this, true);
    }


    playIntro () {
        this.animation = this.getComponent(cc.Animation);
        this.animation.play();
        this.animation.on('finished', this.goToGameState, this);
    }

    goToGameState () {
        this.world.mainFSM.changeState(MainStates.GAME);
        this.node.destroy();
    }

    //update (dt) { }


}
