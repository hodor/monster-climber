// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import StateComponent from '../../StateComponent';
import {MainStates} from '../../../World/World';

const {ccclass, property} = cc._decorator;

@ccclass
export default class IntroState extends StateComponent {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }

    totalTime  = 0;
    update (dt) {
        // this.totalTime += dt;
        // if(this.totalTime >= 1){
        //     super.changeState(MainStates.GAME);
        // }
    }
}
