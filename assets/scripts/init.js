cc.Class({
    extends: cc.Component,
    properties: {
        
    },

    // use this for initialization
    start: function () {
        cc.view.enableAntiAlias = false
        cc.macro.COCOSNODE_RENDER_SUBPIXEL = 0;
        cc.macro.SPRITEBATCHNODE_RENDER_SUBPIXEL = 0;
        cc.macro.CC_FIX_ARTIFACTS_BY_STRECHING_TEXEL = 1;
        cc.director.setProjection(cc.Director.PROJECTION_2D);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
