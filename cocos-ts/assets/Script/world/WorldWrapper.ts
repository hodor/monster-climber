import PressAndHolder from "../PressAndHolder";
import Player from "../Player";
import InfiniteVerticalBg from "../background/InfiniteVerticalBg";
import World from "./World";

const {ccclass, property} = cc._decorator;

@ccclass
//A place to quickly set all important variables that we need to use from the world.
export default class WorldWrapper extends cc.Object {
    public player:Player;
    public input:PressAndHolder;
    public background:InfiniteVerticalBg;

    constructor(world:World){
        super();
        this.player = world.player;
        this.input = world.input;
        this.background = world.background;
    }
}
