// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property
    targetMinDist = 0.1;
    @property
    targetMaxDist = 0.7;

    // onLoad () {}
    jumpDuration = 0.4;
    jumpMaxPower = 10;

    squashDuration = 0.1;
    
    //Make a state machine if this gets too complicated
    isSquashing = false;

    maxSquash = 0.2;
    squashAnimation: cc.ActionInterval = null;

    curSquash:number = 1;

    public static initialPos: cc.Vec2 = null;

    jitterOffset: number = 100;
    lastDistanceJumped: number = 0;

    start () {
        Player.initialPos = this.node.getPosition();
        this.jumpMaxPower = cc.winSize.height;
    }

    update (dt) {
        if(this.isSquashing){
            if(this.node.scaleY <= this.maxSquash) {
                this.curSquash = this.maxSquash;
                //make it jitter
                var newX = Player.initialPos.x + Math.sin(Date.now()) * dt * this.jitterOffset;
                this.node.setPositionX(newX);
            }
        }
    }

    jump(power, callback, callbackTarget) {
        this.isSquashing = false;
        this.node.stopAllActions();
        this.lastDistanceJumped = this.jumpMaxPower * power;
        var jumpUp = cc.moveBy(0.5, cc.p(0,this.lastDistanceJumped)).easing(cc.easeCubicActionOut());
        var stretch = cc.scaleTo(this.squashDuration, 1, 1.2);
        var scaleBack = cc.scaleTo(this.squashDuration, 1, 1);      
        this.node.runAction(cc.sequence(stretch, jumpUp, scaleBack, cc.callFunc(callback, callbackTarget)));
    }

    startSquash(maxHoldTime) {
        this.curSquash = 1;
        this.isSquashing = true;
        this.squashAnimation = cc.scaleTo(maxHoldTime/1000, 1, this.maxSquash);
        this.node.runAction(this.squashAnimation);
    }

    getDistance() {
        return this.lastDistanceJumped;
    }

    moveDownBy(amount, time, callback, target){
        this.node.stopAllActions();
        var movement = cc.moveBy(time, 0, amount);
        this.node.runAction(cc.sequence(movement, cc.callFunc(callback, target)));
    }

    // Get the next target point
    getNextTarget() {
        cc.log('min dist: '+this.targetMinDist*this.jumpMaxPower);
        cc.log('max dist: '+this.targetMaxDist*this.jumpMaxPower);
        var targetDist = (this.targetMinDist + (Math.random() * (this.targetMaxDist - this.targetMinDist))) * this.jumpMaxPower;
        cc.log('targetDist '+targetDist);
        var targetYPos = Player.initialPos.y + targetDist;
        return cc.v2(0,targetYPos);
    }

}