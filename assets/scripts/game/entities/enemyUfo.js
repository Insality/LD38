var utils = require("Utils");

cc.Class({
    extends: cc.Component,

    properties: {
        projectile: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        this.changeTimer = 2;
        this.node.zIndex = 1;
        window.aa = this;
        this.path = [5, 4, -5, -4, 3, -3, -2, -1, 0, 1, 2, 5, 8];
        this.currentCell = 5;
    },

    attackLaser: function(cell) {
        if (!cell) {
            this.node.destroy();
            return 1;
        }
        
        var delay = 0.1 * Math.abs(this.currentCell-cell);
        this.node.runAction(cc.sequence(
            cc.moveTo(delay, cc.p(90 * cell, this.node.y)),
            cc.delayTime(0.4),
            cc.callFunc(function() {
                var laser = cc.instantiate(this.projectile);
                laser.parent = this.node.parent;
                laser.position = cc.p(this.node.x, this.node.y);
                
            }, this)
        ));  
        this.currentCell = cell;
        
        return delay;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.changeTimer -= dt;
        if (this.changeTimer < 0) {
            this.changeTimer = this.attackLaser(this.path.shift()) + 0.8;
        }
        
    },
});
