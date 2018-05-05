import StateComponent from "../../StateComponent";
import World from "../../../World/World";
import Player from "../../../Player";
import PressAndHolder from "../../../PressAndHolder";
import InfiniteVerticalBg from "../../../background/InfiniteVerticalBg";
import StateMachine from "../../StateMachine";

const {ccclass, property} = cc._decorator;

export enum GameStates {
    SPAWN_HANDS,
    HANDLE_INPUT,
    HAND_HIT,
    END,
    WIN,
    LOSE
}

@ccclass
export default class GameState extends StateComponent {

    // LIFE-CYCLE CALLBACKS:
    FSM:StateMachine<GameStates> = null;

    private score:number = 0;

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
        this.FSM.addTransaction(GameStates.HANDLE_INPUT, GameStates.HAND_HIT, 'GameHandHitState');
        this.FSM.addTransaction(GameStates.HAND_HIT, GameStates.WIN, 'GameWinState', this.updateScore);
        this.FSM.addTransaction(GameStates.HAND_HIT, GameStates.LOSE, 'GameLoseState', this.handleLose);
        this.FSM.addTransaction(GameStates.WIN, GameStates.SPAWN_HANDS, 'GameSpawnHandsState');
    }

    start () {
        super.start();
    }
    
    update (dt) {
        super.update(dt);
    }

    updateScore(){
        this.score++;
        cc.log('score: '+this.score);
    }

    handleLose(){
        this.score = 0;
    }
}
