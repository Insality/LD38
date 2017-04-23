cc.Class({
    extends: cc.Component,

    properties: {
        sprite: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.sprite = this.sprite.getComponent(cc.Sprite);
        
        this.sprite.node.y += cc.randomMinus1To1() * 15;
        this.sprite.node.color = new cc.Color(
            cc.random0To1()*255,
            cc.random0To1()*255,
            cc.random0To1()*255,
            255
        );
        cc.log(this.sprite);
        
        this.speed = 1 + cc.random0To1() * 6
        if (cc.random0To1() > 0.5) {
            this.speed *= -1;
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.rotation += this.speed;
    },
});
