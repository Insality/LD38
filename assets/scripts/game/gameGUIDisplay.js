cc.Class({
    extends: cc.Component,

    properties: {
        hintUI: cc.Label,
        descUI: cc.Label,
        powerUI: cc.Label,
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
});
