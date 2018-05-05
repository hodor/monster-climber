import PressAndHolder from "../PressAndHolder";
import Player from "../Player";
import InfiniteVerticalBg from "../background/InfiniteVerticalBg";
import World from "./World";
import MonsterFactory from "../monster/MonsterFactory";

const {ccclass, property} = cc._decorator;

@ccclass
//A place to quickly set all important variables that we need to use from the world.
export default class WorldWrapper extends cc.Object {
    public player:Player;
    public input:PressAndHolder;
    public background:InfiniteVerticalBg;
    public monsterFactory:MonsterFactory;

    //Labels
    public labelScore:cc.Label;
    
    //Buttons
    public btnRetry:cc.Prefab;

    constructor(world:World){
        super();
        this.player = world.player;
        this.input = world.input;
        this.background = world.background;
        this.monsterFactory = world.monsterFactory;
        this.btnRetry = world.btnRetry;
        this.labelScore = world.labelScore;
    }
}
