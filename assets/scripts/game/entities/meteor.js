var utils = require("Utils");
var gameEvents = require("gameEvents");

cc.Class({
    extends: cc.Component,

    properties: {
        rotationSpeed: 0,
        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        }
    },

    // use this for initialization
    onLoad: function () {
        var randomIdx = utils.getRandomInt(0, this.spriteList.length);
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteList[randomIdx];
        
        this.rotationSpeed = cc.randomMinus1To1() * 5;
        
        var clickable = this.getComponent('clickable');
        if (clickable) {
            clickable._callback = function () {
                gameEvents.emit("meteorDestroy");
                this.node.destroy();
            }
        }
        
        window.aa = this;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        // this.node.x -= 4;
        this.node.rotation += this.rotationSpeed;
    },
});
