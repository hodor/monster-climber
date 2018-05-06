import ShareImage from "./ShareImage";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Instant extends cc.Object {
    public static UserName: string;
    public static UserID: string;
    public static UserPhoto: string;
    public static ContextID: string;
    public static ContextType: string;
    public static Locale: string;
    public static Platform: string;
    public static SDKVersion: string;
    public static init() {
        if (FBInstant === undefined) {
            return;
        }

        Instant.UserName = FBInstant.player.getName();
        Instant.UserID = FBInstant.player.getID();
        Instant.UserPhoto = FBInstant.player.getPhoto();
        /* How to load a photo
        cc.loader.load(photoUrl, (err, texture) => {
            this.avatar.spriteFrame = new cc.SpriteFrame(texture);
        });
        */

        Instant.ContextID = FBInstant.context.getID();
        Instant.ContextType = FBInstant.context.getType();
        Instant.Locale = FBInstant.getLocale();
        Instant.Platform = FBInstant.getPlatform();
        Instant.SDKVersion = FBInstant.getSDKVersion();
    }

    public static Share(callback: Function, target: Object) {
        if (FBInstant === undefined) return;
        FBInstant.shareAsync({
            intent: 'SHARE',
            image: ShareImage.Base64,
            text: 'X is asking for your help!',
        }).then(() => {
            callback.call(target);
        });
    }

    public static ChooseContext(callback: Function, target: Object) {
        if (FBInstant === undefined) return;
        FBInstant.context
            .chooseAsync()
            .then(function () {
                Instant.ContextID = FBInstant.context.getID();
                Instant.ContextType = FBInstant.context.getType();
                callback.call(target, null);
            }).catch(function (error){
                if(error.code == "SAME_CONTEXT"){
                    callback.call(target, null);
                } else {
                    callback.call(target, error);
                }
            });
    }

    public static PostMessage(callback:Function, target:Object){
        if(FBInstant === undefined) return;
        FBInstant.updateAsync({
            action: 'CUSTOM',
            cta: 'Climb!',
            image: ShareImage.Base64,
            text: 'Reach the monsters head',
            template: '',
            strategy: 'IMMEDIATE',
            notification: 'NO_PUSH',
        }).then(function () {
            callback.call(target, null);
        }).catch(function (error) {
            callback.call(target, error);
        });
    }
    /*
    public static  getImgBase64 () {
        let sp = cc.find('Canvas/New Sprite(Splash)').getComponent(cc.Sprite);

        let target = cc.find('Canvas');
        let width = 960, height = 640;
        let renderTexture = new cc.RenderTexture(width, height);
        renderTexture.begin();
        target._sgNode.visit();
        renderTexture.end();
        //
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            let texture = renderTexture.getSprite().getTexture();
            let image = texture.getHtmlElementObj();
            ctx.drawImage(image, 0, 0);
        }
        else if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
            let buffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
            let texture = renderTexture.getSprite().getTexture()._glID;
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            let data = new Uint8Array(width * height * 4);
            gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            let rowBytes = width * 4;
            for (let row = 0; row < height; row++) {
                let srow = height - 1 - row;
                let data2 = new Uint8ClampedArray(data.buffer, srow * width * 4, rowBytes);
                let imageData = new ImageData(data2, width, 1);
                ctx.putImageData(imageData, 0, row);
            }
        }
        return canvas.toDataURL('image/png');
    } */
}
