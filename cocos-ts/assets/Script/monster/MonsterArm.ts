// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class MonsterArm extends cc.Component {

    @property(cc.Prefab)
    shadow: cc.Prefab = null;

    @property(cc.Prefab)
    arm: cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    shadowInst: cc.Node = null;
    armInst: cc.Node = null;

    neededHeight = 400;
    safePoint:cc.Vec2 = null;
    @property
    isRight = false;

    //Arm transform
    yPos: number = 0;
    yAnchor: number = 0;

    start() {
        if(this.isRight) return;
        this.shadowInst = cc.instantiate(this.shadow);
        var height = this.shadowInst.getContentSize().height;
        var scale = this.neededHeight / height;

        if (this.isRight) {
            this.shadowInst.setScale(-scale, scale);
            this.yPos = this.node.convertToNodeSpaceAR(this.safePoint).y;
        } else {
            cc.log('safePoint: %o', this.safePoint);
            this.shadowInst.setScale(scale);
            this.yPos = -(cc.winSize.height - this.safePoint.y);
        }
        cc.log('yPos: '+this.yPos);
        this.shadowInst.setPosition(0, this.yPos);
        this.shadowInst.opacity = 0;
        this.node.addChild(this.shadowInst);
        var anim = this.shadowInst.getComponent(cc.Animation);
        anim.on('finished', this.finishedEnter, this);
        anim.play('shadow_enter', 0);
    }

    finishedEnter() {
        this.spawnedCallback.call(this.spawnedCallbackTarget);
    }

    hit() {

    }

    setHeight(height) {
        this.neededHeight = height;
    }

    setSafePoint(point) {
        this.safePoint = point;
    }

    spawnedCallback:Function = null;
    spawnedCallbackTarget:Object = null;

    setSpawnedCallback(callback:Function, target:Object) {
        this.spawnedCallback = callback;
        this.spawnedCallbackTarget = target;
    }

    update (dt) {

    }
}
