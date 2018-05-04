// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import MonsterArm from './MonsterArm';

const {ccclass, property} = cc._decorator;

@ccclass
export default class MonsterFactory extends cc.Component {

    @property(cc.Prefab)
    Arm_Left: cc.Prefab = null;

    @property(cc.Prefab)
    Arm_Right: cc.Prefab = null;

    // onLoad () {}

    start () { }
    // update (dt) {}

    spawnArms() {

    }
}
