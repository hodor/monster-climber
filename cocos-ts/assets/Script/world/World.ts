// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Player from '../Player';
import PressAndHolder from '../PressAndHolder';
import InfiniteVerticalBg from '../background/InfiniteVerticalBg';
import StateMachine from '../FSM/StateMachine';
import IntroState from '../FSM/States/Main/IntroState';
import GameState from '../FSM/States/Main/GameState';
import WorldWrapper from './WorldWrapper';
import MonsterFactory from '../monster/MonsterFactory';
import Instant from '../Instant/Instant';

const {ccclass, property} = cc._decorator;

export enum MainStates {
    INTRO = 0,
    GAME,
    REWARDED,
    CONTEXT_UPDATE,
    ADS,
    MENU,
    CHALLENGE,
    LEADERBOARD
}

@ccclass
export default class World extends cc.Component {

    @property(Player)
    player: Player = null;
    @property
    cameraFollowTimeMS: number = 0.25;

    @property(InfiniteVerticalBg)
    background: InfiniteVerticalBg = null;

    @property(PressAndHolder)
    input: PressAndHolder = null;

    @property(MonsterFactory)
    monsterFactory: MonsterFactory = null;

    @property(cc.Label)
    labelScore: cc.Label = null;

    @property(cc.Label)
    labelScoreShadow: cc.Label = null;

    @property(cc.Prefab)
    btnRetry: cc.Prefab = null;

    @property(cc.Prefab)
    btnChallenge: cc.Prefab = null;

    @property(cc.Prefab)
    uiBestScore: cc.Prefab = null;

    @property(cc.Prefab)
    uiOverlay: cc.Prefab = null;

    //The main state machine
    mainFSM:StateMachine<MainStates> = null;
    debug:boolean = false;

    // The wrapper for all states
    public wrapper:WorldWrapper = null;

    // LIFE-CYCLE CALLBACKS:

    setupMainFSM(){
        this.mainFSM = new StateMachine<MainStates>(MainStates.INTRO, 'IntroState', this, this);
        this.mainFSM.addTransaction(MainStates.INTRO, MainStates.GAME, 'GameState');
    }

    onLoad () {
        Instant.init();
        this.input.setWorld(this);
        this.background.setWorld(this);
        this.wrapper = new WorldWrapper(this);
        this.setupMainFSM();
    }

    start () {
    }


    update (dt) {
    }
    
}
