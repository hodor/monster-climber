// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import World from './world/World';
import {MainStates} from './world/World';
import FadeInFadeOut from './ui/FadeInFadeOut';

const {ccclass, property} = cc._decorator;

@ccclass
export default class IntroController extends cc.Component {
 
    @property(World)
    world:World = null;
    @property(cc.Sprite)
    instructionHoldSprite:cc.Sprite = null;

    @property(cc.Sprite)
    instructionReleaseSprite:cc.Sprite = null;

    @property(cc.AudioClip)
    monsterGrowl:cc.AudioClip = null;

    animation:cc.Animation;

    onTouchStart = null;
    onTouchEnd = null;


    private growlAudioSource:cc.AudioSource = null;
    private windAudioSource:cc.AudioSource = null;
    
    //onLoad () { };
    
    start () {
        this.growlAudioSource = this.node.getComponent(cc.AudioSource);
        this.windAudioSource = this.node.getComponentInChildren(cc.AudioSource);
        this.addListeners();
        this.schedule(function() {
             this.playGrowl();
         }, 1, 0, false);
    }


    playGrowl() {
        var waitTime = (Math.random()*7+6);
        console.log(waitTime);
        this.growlAudioSource.play();
        this.schedule(function() {
             this.playGrowl();
         }, waitTime, 0, false);
    }

    touchStart(event) {
        var actionFadeOut = cc.fadeTo(0.3, 0);
        var FadeInFadeOutComp = this.node.getComponentInChildren(FadeInFadeOut);
        FadeInFadeOutComp.destroy();
        this.instructionHoldSprite.node.runAction(cc.sequence(actionFadeOut, cc.callFunc(function callBack () {
                if(!this.onTouchEnd) return;
                var actionFadeIn = cc.fadeTo(0.5, 255);
                this.instructionReleaseSprite.node.runAction(actionFadeIn);    
            }, this)));
        
        
    }

    touchEnd(event) {
        if(!this.onTouchEnd) return;
        this.removeListeners();
        this.instructionReleaseSprite.node.stopAllActions();
        this.instructionHoldSprite.node.stopAllActions();
        this.instructionReleaseSprite.node.opacity = 0;
        this.instructionHoldSprite.node.opacity = 0;
        this.playIntro();
    }
        

    removeListeners () {
        cc.log('removed');
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this.node, true);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this.node, true);
        this.onTouchStart = null;
        this.onTouchEnd = null;
    }

    addListeners () {
        this.onTouchStart = this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this, true);
        this.onTouchEnd = this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this, true);
    }


    playIntro () {
        this.animation = this.getComponent(cc.Animation);
        this.animation.play();
        this.animation.on('finished', this.goToGameState, this);
    }

    goToGameState () {
        this.world.mainFSM.changeState(MainStates.GAME);
        this.node.destroy();
    }

    update (dt) {
        if(!this.onTouchEnd){
            this.growlAudioSource.volume -= 0.01;
            this.windAudioSource.volume -= 0.01;
        }
    }


}
