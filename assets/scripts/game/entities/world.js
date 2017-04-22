var gameEvents = require("gameEvents");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        this.node.runAction(
            cc.repeatForever(cc.rotateBy(2, 360))
        );
        
        var clickable = this.getComponent('clickable');
        if (clickable) {
            clickable._callback = function () {
                gameEvents.emit("worldGrow");
                this.node.runAction(cc.sequence(
                    cc.scaleTo(0.05, 1.2, 1.2),
                    cc.scaleTo(0.05, 1, 1)
                ));
            }
        }
    },
    
    onCollisionEnter: function (other) {
        cc.log(other);
        // this.node.color = cc.Color.RED;
    },
});
