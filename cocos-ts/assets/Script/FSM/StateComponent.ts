// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import StateMachine from './StateMachine';
import World from '../World';

const {ccclass, property} = cc._decorator;

@ccclass
export default class StateComponent extends cc.Component {

    public fsm:any = null;
    protected world:World = null;

    onLoad () {}

    start () {

    }

    update (dt) {}

    setWorld(world:World){
        this.world = world;
    }

    changeState(state:any) {
        this.fsm.changeState(state);
    }
}
