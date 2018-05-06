import Instant from "../Instant/Instant";

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

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    scoreLabel:cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.scoreLabel.string = '';
        var _this = this;
        Instant.GetHighscore()
            .then(function(score){
                _this.scoreLabel.string = score;
            })
            .catch(function(){
                _this.scoreLabel.string = '0';
            });
    }

    // update (dt) {}

}
