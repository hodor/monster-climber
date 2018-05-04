import StateComponent from "../../StateComponent";
import World from "../../../World/World";
import Player from "../../../Player";
import PressAndHolder from "../../../PressAndHolder";
import InfiniteVerticalBg from "../../../background/InfiniteVerticalBg";
import StateMachine from "../../StateMachine";

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

export enum GameStates {
    SPAWN_HANDS,
    HANDLE_INPUT,
    JUMP_ANIMATION,
    HAND_HIT,
    END,
    WIN,
    LOSE
}

@ccclass
export default class GameState extends StateComponent {

    // LIFE-CYCLE CALLBACKS:
    FSM:StateMachine<GameStates> = null;

    onLoad () {
    }

    //Override
    public setWorld(world:World){
        super.setWorld(world);
        this.FSM = new StateMachine<GameStates>(GameStates.SPAWN_HANDS, 'GameSpawnHandsState', this.world, this);
        this.setupFSM();
    }

    setupFSM(){
        this.FSM.addTransaction(GameStates.SPAWN_HANDS, GameStates.HANDLE_INPUT, 'GameHandleInputState');
        this.FSM.addTransaction(GameStates.HANDLE_INPUT, GameStates.JUMP_ANIMATION, 'GameJumpState');
        this.FSM.addTransaction(GameStates.JUMP_ANIMATION, GameStates.HAND_HIT, 'GameHandHitState');
        this.FSM.addTransaction(GameStates.HAND_HIT, GameStates.WIN, 'GameWinState');
        this.FSM.addTransaction(GameStates.HAND_HIT, GameStates.LOSE, 'GameLoseState');
    }

    start () {
        super.start();
    }
    
    update (dt) {
        super.update(dt);
    }
}
