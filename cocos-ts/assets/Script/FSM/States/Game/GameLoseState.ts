import BaseGameState from "./BaseGameState";
import { GameStates } from "../Main/GameState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameLoseState extends BaseGameState {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    retryButton: cc.Node;
    
    start () {
        super.start();
        this.retryButton = cc.instantiate(this.w.btnRetry);
        this.node.addChild(this.retryButton);
        this.retryButton.on('click', this.retry, this)
    }

    retry(event){
        this.changeState(GameStates.SPAWN_HANDS);
    }

    update (dt) {
        super.update(dt);
    }

    onDestroy(){
        this.retryButton.removeFromParent();
        this.retryButton.destroy();
    }
}
