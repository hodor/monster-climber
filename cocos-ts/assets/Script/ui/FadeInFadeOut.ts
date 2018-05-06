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
export default class FadeInFadeOut extends cc.Component {

    @property
    speed: number = 2;

    private additive:boolean = true;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
    	if(this.additive){
    		this.node.opacity += this.speed;
    		if(this.node.opacity >= 255){
    			this.node.opacity = 255;
    			this.additive = false;
    		}
    	} else {
    		this.node.opacity -= this.speed;
    		if(this.node.opacity <= 0){
    			this.node.opacity = 0;
    			this.additive = true;
    		}
    	}
    }
}
