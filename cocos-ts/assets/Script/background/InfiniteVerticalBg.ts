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
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    bgPrefab: cc.Prefab = null;

    bg_A: cc.Node = null;
    bg_B: cc.Node = null;
    bg_C: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bg_A = cc.instantiate(this.bgPrefab);
        var size = this.bg_A.getContentSize();
        this.bg_A.setScale(cc.winSize.width / size.width, cc.winSize.height / size.height);
    //    this.bg_A.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.node.addChild(this.bg_A);
        /*
        this.sprites = new Array<cc.Sprite>();
        var s1 = new cc.Sprite();
        s1.name = 'A';
        s1.spriteFrame = this.image;
        s1.node.setContentSize(cc.winSize);
        this.node.setContentSize(cc.winSize);
        */
     //   this.node.addChild(s1);
    }

    start () {

    }

    // update (dt) {}

    moveDownBy(amount){

    }
}
