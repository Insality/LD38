var utils = require("Utils");
var gameEvents = require("gameEvents");

cc.Class({
    extends: cc.Component,

    properties: {
        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        },
        projectile: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {  
        var randomIdx = utils.getRandomInt(0, this.spriteList.length);
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteList[randomIdx];
        
        
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.x -= 6;
    },
    
    onCollisionEnter: function (other) {
        if (other.node.group == "player") {
            this.node.destroy();
            gameEvents.emit("worldHit");
        }
    },
});
