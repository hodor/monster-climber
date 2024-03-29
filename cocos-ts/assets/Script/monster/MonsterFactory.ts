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
import Player from '../Player';

const { ccclass, property } = cc._decorator;

@ccclass
export default class MonsterFactory extends cc.Component {

    @property(cc.Prefab)
    LeftPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    RightPrefab: cc.Prefab = null;

    @property
    heightPercentage: number = 0.5;

    @property(cc.Node)
    maximumArea: cc.Node = null;

    @property(cc.Node)
    minimumArea: cc.Node = null;

    @property(cc.Node)
    centerLine: cc.Node = null;

    @property(cc.Node)
    hint: cc.Node = null;

    @property(cc.AudioClip)
    armHitPlayer: cc.AudioClip = null;

    @property
    topOffset: number = 80;

    left: cc.Node = null;
    right: cc.Node = null;

    armRight: MonsterArm = null;
    armLeft: MonsterArm = null;

    maxAreaHeight: number = 0;
    minAreaHeight: number = 0;

    spawnedCallback: Function = null;
    spawnedCallbackTarget: Object = null;

    debug = false;
    private audioSource:cc.AudioSource = null;

    totalSafeHeight = 0;

    // onLoad () {}

    start() {
        this.audioSource = this.node.getComponent(cc.AudioSource);
        this.maxAreaHeight = this.maximumArea.getContentSize().height;
        this.minAreaHeight = this.minimumArea.getContentSize().height;
        if (this.debug) {
            this.maximumArea.active = true;
            this.minimumArea.active = false;
            this.centerLine.active = true;
        } else {
            this.maximumArea.active = false;
            this.minimumArea.active = false;
            this.centerLine.active = false;
        }
        this.hideHint();
    }
    // update (dt) {}

    spawnArms(spawnMid: cc.Vec2, callback: Function, target: Object) {
        this.spawnedCallback = callback;
        this.spawnedCallbackTarget = target;
        // Calculating the safe area
        var safeAreaHeight = this.totalSafeHeight = this.minAreaHeight + (Math.random() * (this.maxAreaHeight - this.minAreaHeight));
        var targetY = spawnMid.y;
        this.hint.setPositionY(targetY);

        // The hand size
        var neededHeight = cc.winSize.height * this.heightPercentage;

        // Find a random spot to start the safe area, from top to bottom
        var firstPoint = cc.v2(0, targetY + (safeAreaHeight / 2)); // Top point
        var lastPoint = cc.v2(0, targetY - (safeAreaHeight / 2)); // Bottom point

        if (this.debug) {
            this.maximumArea.anchorY = 1;
            this.maximumArea.setPositionY(firstPoint.y);
            this.maximumArea.setContentSize(640, safeAreaHeight);
            this.centerLine.setPositionY(targetY);
        }

        this.left = cc.instantiate(this.LeftPrefab);
        this.armLeft = this.left.getComponent(MonsterArm);
        this.node.addChild(this.left);
        this.armLeft.setHeight(neededHeight);
        this.armLeft.isRight = false;
        this.armLeft.setSafePoint(firstPoint);
        this.armLeft.setSpawnedCallback(this.leftSpawned, this);

        this.right = cc.instantiate(this.RightPrefab);
        this.armRight = this.right.getComponent(MonsterArm);
        this.node.addChild(this.right);
        this.armRight.setHeight(neededHeight);
        this.armRight.isRight = true;
        this.armRight.setSafePoint(lastPoint);
        this.armRight.setSpawnedCallback(this.rightSpawned, this);
    }

    deleteArms() {
        this.right.destroy();
        this.right = null;
        this.armRight.destroy();
        this.armRight = null;
        this.left.destroy();
        this.left = null;
        this.armLeft.destroy();
        this.armLeft = null;
        this.hideHint();
    }

    showHint () {
        this.hint.active = true;
    }

    hideHint() {
        this.hint.active = false;
    }


    leftSpawned() {
        this.spawnedCallback.call(this.spawnedCallbackTarget);
    }

    rightSpawned() {

    }

    isPointSafe(point:cc.Vec2):boolean {
        return this.armLeft.isPointSafe(point) && this.armRight.isPointSafe(point);
    }

    hit() {
        this.armLeft.hit();
        this.armRight.hit();
    }

    move(distance, timeToMove) {
        this.armLeft.move(distance, timeToMove)
        this.armRight.move(distance, timeToMove)
        this.hideHint();
    }

    moveOut(time, callback, target){
        this.armLeft.moveOut(time, callback, target);
        this.armRight.moveOut(time);
    }

    playArmKilled() {
        this.audioSource.stop();
        this.audioSource.clip = this.armHitPlayer;
        this.audioSource.play();
    }
}
