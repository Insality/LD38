var gameEvents = require("gameEvents");

cc.Class({
    extends: cc.Component,

    properties: {
        mode: "rest",
        shine: cc.Node
    },

    onLoad: function () {
        var self = this;
        this.zIndex = 5;
        this.node.runAction(
            cc.repeatForever(cc.rotateBy(2, 360))
        );
        this.target = cc.p(0, 0);
        
        var inputControl = this.getComponent('inputControl');
        if (inputControl) {
            inputControl.onClick = function () {
                if (self.mode == "grow") {
                    gameEvents.emit("worldGrow");
                    this.node.runAction(cc.sequence(
                        cc.scaleTo(0.05, 1.2, 1.2),
                        cc.scaleTo(0.05, 1, 1)
                    ));
                }
            }
            inputControl.onDrag = function(delta) {
                if (self.mode == "invaders") {
                    self.target.y = delta.y - 360; 
                } else {
                    self.target.y = 0;
                }
                if (self.mode == "lasers") {
                    self.target.x = delta.x - 640;
                } else {
                    self.target.x = 0;
                }
                
                // self.target.x = Math.round(self.target.x/self.stepX) * self.stepX;
            }
        }
    },
    
    update: function(dt) {
        this.shine.opacity = (this.mode == "grow") ? 255 : 0;
        this.node.y = cc.lerp(this.node.y, this.target.y, 0.2);
        this.node.y = cc.clampf(this.node.y, -210, 210);
        
        this.node.x = cc.lerp(this.node.x, this.target.x, 0.2);
        this.node.x = cc.clampf(this.node.x, -260, 260);
    }
});
