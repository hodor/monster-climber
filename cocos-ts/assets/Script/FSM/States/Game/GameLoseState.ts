import BaseGameState from "./BaseGameState";
import { GameStates } from "../Main/GameState";
import Instant from "../../../Instant/Instant";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameLoseState extends BaseGameState {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    retryButton: cc.Node;
    challengeButton: cc.Node;

    start() {
        super.start();
        this.retryButton = cc.instantiate(this.w.btnRetry);
        this.challengeButton = cc.instantiate(this.w.btnChallenge);
        this.node.addChild(this.retryButton);
        this.node.addChild(this.challengeButton);
        this.retryButton.on('click', this.retry, this)
        this.challengeButton.on('click', this.challenge, this);
    }

    retry(event) {
        this.changeState(GameStates.SPAWN_HANDS);
    }

    challenge(event) {
        Instant.ChooseContext(this.contextChoosed, this);
    }

    contextChoosed(err){
        if(err == null){
            Instant.PostMessage(this.challengeDone, this);
        }
    }

    challengeDone(err) { 
        cc.log('post error: %o', err);
        this.changeState(GameStates.SPAWN_HANDS);
    }

    update(dt) {
        super.update(dt);
    }

    onDestroy() {
        this.retryButton.removeFromParent();
        this.retryButton.destroy();
        this.challengeButton.removeFromParent();
        this.challengeButton.destroy();
    }
}
