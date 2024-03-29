// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import World from '../World/World';
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    bgPrefabA: cc.Prefab = null;

    @property(cc.Prefab)
    bgPrefabB: cc.Prefab = null;    

    @property(cc.Prefab)
    bgPrefabC: cc.Prefab = null;    

    bg_A: cc.Node = null;
    bg_B: cc.Node = null;
    bg_C: cc.Node = null;

    totalHeight = 0;
    world:World = null;

    setWorld(world) {
        this.world = world;
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var size;
        var scaleX;
        var scaleY;
        this.totalHeight = cc.winSize.height;

        this.bg_A = cc.instantiate(this.bgPrefabA);
        size = this.bg_A.getContentSize();
        scaleX = scaleY = cc.winSize.height / size.height;

        this.bg_A.setScale(scaleX, scaleY);
        this.bg_A.setPositionY(this.totalHeight);
        if(this.world.debug)
            this.bg_A.color = cc.color(255, 0, 0, 255);
        this.bg_A.name = 'A';
        this.node.addChild(this.bg_A);

        this.bg_B = cc.instantiate(this.bgPrefabB);
        this.bg_B.setScale(scaleX, scaleY);
        if(this.world.debug)
            this.bg_B.color = cc.color(0, 255, 0, 255);
        this.bg_B.name = 'B';
        this.node.addChild(this.bg_B);

        this.bg_C = cc.instantiate(this.bgPrefabC);
        this.bg_C.setScale(scaleX, scaleY);
        this.bg_C.setPositionY(-this.totalHeight);
        if(this.world.debug)
            this.bg_C.color = cc.color(0, 0, 255, 255);
        this.bg_C.name = 'C';
        this.node.addChild(this.bg_C);
    }

    start() {
    }

    update(dt) {
        this.repositionPrefabs();
    }

    getWorldPos(node: cc.Node) {
        return this.node.convertToWorldSpace(node.getPosition());
    }

    isBelowScreen(node: cc.Node) {
        var pos = this.getWorldPos(node);
        return (pos.y <= -this.totalHeight)
    }

    repositionNode(from: cc.Node, to: cc.Node) {
        if (this.isBelowScreen(from)) {
            var toPos = this.getWorldPos(to);
            var newY = toPos.y + this.totalHeight;
            var curY = this.getWorldPos(from).y;
            var diffY = newY - curY;
            var localY = from.getPositionY() + diffY;
            from.setPosition(cc.v2(from.getPositionX(), localY));          
        }
    }

    repositionPrefabs() {
        this.repositionNode(this.bg_A, this.bg_B);
        this.repositionNode(this.bg_B, this.bg_C);
        this.repositionNode(this.bg_C, this.bg_A);
    }

    moveDownBy(amount, time) {
        var movement = cc.moveBy(time, 0, amount);
        this.node.runAction(movement);
    }
}
