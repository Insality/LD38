var utils = require("Utils");

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
    // update: function (dt) {

    // },
});
