cc.Class({
    extends: cc.Component,

    properties: {
        hintUI: cc.Label,
        descUI: cc.Label,
        powerUI: cc.Label,
        scorePrefab: cc.Prefab,
        lives: [cc.Node]
    },

    setLives: function(lives) {
        window.aa = this.lives;
        for (var i = 0; i < this.lives.length; i++) {
            this.lives[i].opacity = (i+1 <= lives) ? 255 : 0;
            this.lives[i].stopAllActions();
        }
        if (this.lives[lives-1]) {
            this.lives[lives-1].runAction(cc.repeatForever(
                cc.rotateBy(2, 360)
            ))   
        }
    },

    setDesc: function(desc) {
        this.descUI.string = desc;
    },

    setHint: function(hint) {
        this.hintUI.string = hint;
    },

    setPower: function(power) {
        this.powerUI.string = power;
    },
    
    emitPower: function(amount, parent, pos) {
        var score = cc.instantiate(this.scorePrefab);
        score.parent = parent;
        
        var display = score.getComponent(cc.Label);
        display.string = "+" + amount;
       
        
        pos.x += cc.randomMinus1To1()*30;
        pos.y += cc.randomMinus1To1()*30;
        
        score.position = pos;
        
        score.runAction(cc.sequence(
            cc.moveBy(1, cc.p(0, 100))
        ));
        score.runAction(cc.sequence(
            cc.delayTime(0.6),
            cc.fadeOut(0.6),
            cc.callFunc(function() {
                score.destroy()
            })
        ));
        
    }
});
