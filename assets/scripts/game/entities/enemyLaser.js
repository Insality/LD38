cc.Class({
    extends: cc.Component,

    properties: {
        updateTimer: 0.04,
    },

    // use this for initialization
    onLoad: function () {
        window.a = this;
        this.collider = this.getComponent(cc.BoxCollider);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.updateTimer -= dt;
        if (this.updateTimer < 0) {
            this.node.width = 46 + cc.randomMinus1To1() * 3;
            this.updateTimer = 0.04;
        }
        
        this.node.height += 10;
        if (this.node.height > 620) {
            this.node.height = 120;
        }
        this.collider.size.height = this.node.height;
        this.collider.offset.y = -this.node.height/2
    },
});
