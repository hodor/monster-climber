import ScoreSmall from "./ui/ScoreSmall";

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
export default class Player extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property
    targetMinDist = 0.1;
    @property
    targetMaxDist = 0.7;
    @property(cc.Prefab)
    scoreUI: cc.Prefab = null;
    @property
    maxDistForPerfect = 10;
    @property(cc.AudioClip)
    PressAndHoldSound: cc.AudioClip = null;
    @property
    loopSoundStart: number = 2.73;
    @property
    loopSoundEnd: number = 3.759;
    @property(cc.AudioClip)
    NoScoreLanding: cc.AudioClip = null;
    @property(cc.AudioClip)
    Landing: cc.AudioClip = null;
    @property(cc.AudioClip)
    PerfectLanding: cc.AudioClip = null;
    @property(cc.AudioClip)
    Fail: cc.AudioClip = null;
    // onLoad () {}
    jumpDuration = 0.4;
    jumpMaxPower = 10;

    squashDuration = 0.1;

    //Make a state machine if this gets too complicated
    isSquashing = false;

    maxSquash = 0.2;
    squashAnimation: cc.ActionInterval = null;

    curSquash: number = 1;

    public static initialPos: cc.Vec2 = null;
    initialScale: number = null;

    jitterOffset: number = 100;
    lastDistanceJumped: number = 0;

    private armatureDisplay: dragonBones.ArmatureDisplay;
    private armature: dragonBones.Armature;

    private audioSource: cc.AudioSource = null;

    start() {
        Player.initialPos = this.node.getPosition();
        this.armatureDisplay = this.node.getComponent(dragonBones.ArmatureDisplay);
        this.armature = this.armatureDisplay.armature();
        this.armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.dragonBonesComplete, this);

        cc.log('armature: %o', this.armature);
        this.initialScale = this.node.getScale();
        this.jumpMaxPower = cc.winSize.height;
        this.audioSource = this.node.getComponent(cc.AudioSource);
    }

    update(dt) {
        if (this.isSquashing) {
            if (this.node.scaleY <= this.maxSquash) {
                this.curSquash = this.maxSquash;
                //make it jitter
                var newX = Player.initialPos.x + Math.sin(Date.now()) * dt * this.jitterOffset;
                this.node.setPositionX(newX);
            }
            if (this.audioSource.isPlaying) {
                if (this.audioSource.getCurrentTime() >= this.loopSoundEnd)
                    this.audioSource.setCurrentTime(this.loopSoundStart);
            }
        }
    }

    jump(power, callback, callbackTarget) {
        this.stopAllSounds();
        this.isSquashing = false;
        this.node.stopAllActions();
        this.lastDistanceJumped = this.jumpMaxPower * power;
        var jumpUp = cc.moveBy(0.5, cc.p(0, this.lastDistanceJumped)).easing(cc.easeCubicActionOut());
        /*
        var stretch = cc.scaleTo(this.squashDuration, this.initialScale, this.initialScale + .1);
        var scaleBack = cc.scaleTo(this.squashDuration, this.initialScale, this.initialScale);      
        this.node.runAction(cc.sequence(stretch, jumpUp, scaleBack, cc.callFunc(this.jumpOver, this), cc.callFunc(callback, callbackTarget)));
        */
        this.node.runAction(cc.sequence(jumpUp, cc.callFunc(this.jumpOver, this), cc.callFunc(callback, callbackTarget)));
        this.armatureDisplay.playAnimation('release', -1);
    }

    jumpOver() {
        this.armatureDisplay.playAnimation('idle', -1);
    }

    startSquash(maxHoldTime) {
        this.curSquash = 1;
        this.isSquashing = true;

        //this.squashAnimation = cc.scaleTo(maxHoldTime / 1000, 1, this.maxSquash);
        //this.node.runAction(this.squashAnimation);
      
        this.armatureDisplay.playAnimation('hold', 1);
        this.playPressAndHold();
    }

    dragonBonesComplete() {
        if (this.armatureDisplay.animationName === 'hold')
            this.armatureDisplay.playAnimation('pressing', -1);
    }

    getDistance() {
        return this.lastDistanceJumped;
    }

    moveDownBy(amount, time, callback, target) {
        this.node.stopAllActions();
        var movement = cc.moveBy(time, 0, amount);
        this.node.runAction(cc.sequence(movement, cc.callFunc(callback, target)));
    }

    safePoint: cc.Vec2 = null;

    // Get the next target point
    getNextTarget() {
        var targetDist = (this.targetMinDist + (Math.random() * (this.targetMaxDist - this.targetMinDist))) * this.jumpMaxPower;
        var targetYPos = Player.initialPos.y + targetDist;
        this.safePoint = cc.v2(0, targetYPos);
        return this.safePoint;
    }

    getLandedPoint() {
        return cc.v2(0, Player.initialPos.y + this.getDistance());
    }

    getMaxLandPoint() {
        return cc.v2(0, Player.initialPos.y + (this.targetMaxDist * this.jumpMaxPower));
    }

    scoreMultiplier: number = 1;
    handleScore(totalSafeHeight): number {
        var dist = (Math.abs(this.safePoint.y - this.getLandedPoint().y));
        var score = 1;
        // Check if we are indeed in the green area
        if (dist > totalSafeHeight / 2) {
            score = 0;
            this.playNoScoreLanding();
            this.scoreMultiplier = 1;
        } else {
            if (dist <= this.maxDistForPerfect) {
                this.playPerfectLanding();
                score = 2 * this.scoreMultiplier;
                this.scoreMultiplier++;
            } else {
                this.playLanding();
                this.scoreMultiplier = 1;
            }
            var ui = cc.instantiate(this.scoreUI);
            var scorescript = ui.getComponent(ScoreSmall);
            scorescript.setScore(score);
            this.node.addChild(ui);
        }
        return score;
    }

    resetScore() {
        this.scoreMultiplier = 1;
    }

    playPressAndHold() {
        this.stopAllSounds();
        this.audioSource.clip = this.PressAndHoldSound;
        this.audioSource.play();
    }

    playLanding() {
        this.stopAllSounds();
        this.audioSource.clip = this.Landing;
        this.audioSource.play();
    }

    playPerfectLanding() {
        this.stopAllSounds();
        this.audioSource.clip = this.PerfectLanding;
        this.audioSource.play();
    }

    playNoScoreLanding() {
        this.stopAllSounds();
        this.audioSource.clip = this.NoScoreLanding;
        this.audioSource.play();
    }

    playDeath() {
        this.stopAllSounds();
        this.audioSource.clip = this.Fail;
        this.audioSource.play();
    }

    stopAllSounds() {
        this.audioSource.stop();
    }

}