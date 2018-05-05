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
    safePoint: cc.Vec2 = null;
    @property
    isRight = false;
    @property
    howMuchOnTopOfTarget = 0.10416;

    private scaledHeight: number = 0;


    start() {
        this.shadowInst = cc.instantiate(this.shadow);
        var height = this.shadowInst.getContentSize().height;
        var scale = this.neededHeight / height;
        var scaledHeight = this.scaledHeight = (height * scale);
        var yPos, xPos;

        if (this.isRight) {
            this.shadowInst.setScale(-scale, scale);
            yPos = this.safePoint.y - (scaledHeight/2) + (this.howMuchOnTopOfTarget * scaledHeight);
            xPos = -cc.winSize.width/2;
        } else {
            this.shadowInst.setScale(scale);
            yPos = this.safePoint.y + (scaledHeight / 2) - (this.howMuchOnTopOfTarget * scaledHeight);
            xPos = cc.winSize.width/2;
        }
        this.shadowInst.setPosition(xPos, yPos);
        this.shadowInst.opacity = 0;
        this.node.addChild(this.shadowInst);
        var anim = this.shadowInst.getComponent(cc.Animation);
        anim.once('finished', this.finishedEnter, this);
        anim.play('shadow_enter', 0);
    }

    finishedEnter() {
        this.spawnedCallback.call(this.spawnedCallbackTarget);
    }

    hit(){
        this.armInst = cc.instantiate(this.arm);
        var height = this.armInst.getContentSize().height;
        var scale = this.neededHeight / height;
        var scaledHeight = (height * scale);
        var yPos, xPos, xPosInit;
        var scaleAnim;
        
        if (this.isRight) {
            this.armInst.setScale(-scale * 1.5, scale * 1.5);
            scaleAnim = cc.scaleBy(0.5, 0.5, 0.5);
            yPos = this.safePoint.y - (scaledHeight/2) + (this.howMuchOnTopOfTarget * scaledHeight);
            xPos = -cc.winSize.width/2;
            xPosInit = -cc.winSize.width*2;
        } else {
            this.armInst.setScale(scale * 1.5);
            scaleAnim = cc.scaleBy(0.5, 0.5, 0.5);
            yPos = this.safePoint.y + (scaledHeight / 2) - (this.howMuchOnTopOfTarget * scaledHeight);
            xPos = cc.winSize.width/2;
            xPosInit = cc.winSize.width*2;
        }
        this.armInst.setPosition(xPosInit, yPos);
        var enter = cc.moveBy(0.25, xPos - xPosInit, 0);
        var shadowScaleAnim = cc.scaleBy(0.5, 0.8, 0.8);
        this.armInst.runAction(enter);
        this.armInst.runAction(scaleAnim);
        this.shadowInst.runAction(shadowScaleAnim);
        this.node.addChild(this.armInst);     
    }

    move(distance, timeToMove) {
        var action = cc.moveBy(timeToMove, 0, distance);
        this.node.runAction(action);
    }

    moveOut(time, callback?, target?){
        var action;
        if(this.isRight){
            action = cc.moveBy(time, -cc.winSize.width, 0);
        } else {
            action = cc.moveBy(time, cc.winSize.width, 0);            
        }
        this.armInst.runAction(action);            
        var anim = this.shadowInst.getComponent(cc.Animation);
        if(callback){
            anim.once('finished', callback, target);
        }
        anim.play('shadow_exit', 0);
    }

    setHeight(height) {
        this.neededHeight = height;
    }

    setSafePoint(point) {
        this.safePoint = point;
    }

    spawnedCallback: Function = null;
    spawnedCallbackTarget: Object = null;

    setSpawnedCallback(callback: Function, target: Object) {
        this.spawnedCallback = callback;
        this.spawnedCallbackTarget = target;
    }

    update(dt) {

    }

    isPointSafe(point:cc.Vec2) {
        var y = point.y;
        return !((y >= this.shadowInst.getPositionY() - (this.scaledHeight / 2) + (this.howMuchOnTopOfTarget * this.scaledHeight)) &&
            (y <= this.shadowInst.getPositionY() + (this.scaledHeight / 2) - (this.howMuchOnTopOfTarget * this.scaledHeight)));
    }
}
