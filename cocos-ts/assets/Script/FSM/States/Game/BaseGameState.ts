import StateComponent from "../../StateComponent";
import World from "../../../World/World";
import Player from "../../../Player";
import PressAndHolder from "../../../PressAndHolder";
import InfiniteVerticalBg from "../../../background/InfiniteVerticalBg";
import WorldWrapper from "../../../world/WorldWrapper";
import { GameStates } from "../Main/GameState";

const {ccclass, property} = cc._decorator;

@ccclass
// Base class with all the things we need to handle a game state
export default class BaseGameState extends StateComponent {
    protected w:WorldWrapper;
    protected debug:Boolean = true;

    /**
     * override setWorld
     */
    public setWorld(world:World) {
        super.setWorld(world);
        this.w = this.world.wrapper;
    }

    start() {
        cc.log(this.constructor['name']);        
    }

    update(dt) {
    }
}
