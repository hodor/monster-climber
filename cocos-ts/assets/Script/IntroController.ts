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

    animation:cc.Animation;

    onTouchStart = null;
    onTouchEnd = null;
    
    //onLoad () { };

    start () {
        this.addListeners();
        cc.log(this.onTouchStart);
        cc.log(this.onTouchEnd);
    }

    touchStart(event) {
        cc.log('touch start');
    }

    touchEnd(event) {
        cc.log('touch end');
        this.playIntro();
        this.removeListeners();
    }
        

    removeListeners () {
        cc.log('removed listeners');
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this.node);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this.node);
    }

    addListeners () {
        cc.log('add listeners');
        this.onTouchStart = this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this, true);
        this.onTouchEnd = this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this, true);
    }


    playIntro () {
        cc.log('play intro');
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
