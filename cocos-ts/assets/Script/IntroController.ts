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

    animation:cc.Animation;

    onTouchStart = null;
    onTouchEnd = null;
    
    //onLoad () { };

    start () {
        this.addListeners();
    }

    touchStart(event) {
        var actionFadeOut = cc.fadeTo(0.4, 0);
        this.instructionHoldLabel.node.runAction(cc.sequence(actionFadeOut, cc.callFunc(function callBack () {
                var actionFadeIn = cc.fadeTo(2, 255);
                this.instructionReleaseLabel.node.runAction(actionFadeIn);    
            }, this)));
        
        
    }

    touchEnd(event) {
        this.instructionReleaseLabel.node.stopAllActions();
        var actionFadeOut = cc.fadeTo(0.2, 0);
        this.instructionReleaseLabel.node.runAction(actionFadeOut);
        this.playIntro();
        this.removeListeners();
    }
        

    removeListeners () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this.node, true);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this.node, true);
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
