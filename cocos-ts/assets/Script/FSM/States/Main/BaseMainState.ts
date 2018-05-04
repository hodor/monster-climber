import StateComponent from "../../StateComponent";
import World from "../../../World/World";
import WorldWrapper from "../../../world/WorldWrapper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseMainState extends StateComponent {
    protected w:WorldWrapper;
    /**
     * override setWorld
     */
    public setWorld(world:World) {
        super.setWorld(world);
        this.w = this.world.wrapper
    }

    start() {
        cc.log('START Game State: '+this.constructor['name']);        
    }

    update(dt) {
    }
}
