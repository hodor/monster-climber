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

    // onLoad () {}
    jumpDuration = 0.4;
    //todo: use the screen height to define maximum movement
    jumpMaxPower = 1000;

    squashDuration = 0.1;

    isSquashing = false;
    maxSquash = 0.2;

    curSquash = 1;
    squashStep = 0.7;
    start () {
    }

    update (dt) {
        if(this.isSquashing){
            this.curSquash -= this.squashStep * dt;
            if(this.curSquash < this.maxSquash) this.curSquash = this.maxSquash;
            cc.log('setting scale: '+this.curSquash);
            this.node.setScale(1,this.curSquash);
        }
    }

    jump(power) {
        this.isSquashing = false;
        var jumpUp = cc.moveBy(0.5, cc.p(0,this.jumpMaxPower*power)).easing(cc.easeCubicActionOut());
        var stretch = cc.scaleTo(this.squashDuration, 1, 1.2);
        var scaleBack = cc.scaleTo(this.squashDuration, 1, 1);      
        this.node.runAction(cc.sequence(stretch, jumpUp, scaleBack));
    }

    startSquash() {
        this.curSquash = 1;
        this.isSquashing = true;
    }

}