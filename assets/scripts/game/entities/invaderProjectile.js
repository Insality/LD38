cc.Class({
    extends: cc.Component,

    properties: {
        lifetime: 3,
        speed: 300,
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.lifetime -= dt;
        this.node.x -= this.speed * dt;
        
        if (this.lifetime < 0) {
            this.node.destroy();
        }
    },
});
