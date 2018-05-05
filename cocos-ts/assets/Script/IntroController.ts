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
    // LIFE-CYCLE CALLBACKS:
    animation:cc.Animation;
    totalTime:number = 0;

    hasPlayed:boolean = false;
    
    onLoad () {
        cc.log(this.world);
    }

    start () {
        
    }

    playIntro () {
        this.animation = this.getComponent(cc.Animation);
        this.animation.play();
        this.animation.on('finished', this.goToGameState, this);
        this.hasPlayed = true;
    }

    goToGameState () {
        this.world.mainFSM.changeState(MainStates.GAME);
        this.node.destroy();
    }

    update (dt) {
        this.totalTime += dt;
        if(this.totalTime >= 1 && !this.hasPlayed){
            this.playIntro();
        }
    }


}
