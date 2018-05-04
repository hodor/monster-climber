// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import StateComponent from './StateComponent';
import World from '../World/World';

const {ccclass, property} = cc._decorator;

export class Transaction<T> {
    public from:T;
    public to:T;
    public component:string;
    public callback:Function;
    public target:Object;

    constructor(from:T, to:T, component:string, callback?:Function, target?:Object){
        this.from = from;
        this.to = to;
        this.component = component;
        this.callback = callback;
        this.target = target;
    }
    
    public call() : void{
        if(this.callback)
            this.callback.call(this.target);
    }
}

@ccclass
export default class StateMachine<T> extends cc.Object {
    //dictionary because it's O(1)
    private transactions: {[id: string] : Transaction<T> } = {};

    public currentState:T;
    public currentComponent:string;

    private world:World;
    private callbackContext:Object;
    constructor (initState:T, initComponent:string, world:World, callbackContext:Object) {
        super();
        this.currentState = initState;
        this.currentComponent = initComponent;
        this.world = world;
        this.callbackContext = callbackContext;
        this.addComponent(this.currentComponent);
    }

    private getId(from:T, to:T):string {
        return from.toString() + '-' + to.toString();
    }

    public addTransaction(from:T, to:T, component:string, callback?:Function) : void {
        this.transactions[this.getId(from, to)] = new Transaction(from, to, component, callback, this.callbackContext);
    }

    public changeState(newState:T) : boolean {
        var id = this.getId(this.currentState, newState);
        var t:Transaction<T> = this.transactions[id];
        if(t) {
            this.world.node.removeComponent(this.currentComponent);
            this.currentComponent = t.component;
            this.currentState = t.to;
            t.call();
            this.addComponent(this.currentComponent);
            return true;
        } 
        cc.log('Cannot change state '+this.currentState+ ' to '+newState);
        return false;
    }

    private addComponent(componentType:string){
        cc.log('adding component '+this.currentComponent);
        var component = this.world.node.addComponent(this.currentComponent);
        var sComponent = component as StateComponent;
        sComponent.fsm = this;
        sComponent.setWorld(this.world as World);
    }
}
