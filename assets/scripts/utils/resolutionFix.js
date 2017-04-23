cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        var resolution = cc.ResolutionPolicy.SHOW_ALL;
        cc.view.setDesignResolutionSize(
            cc.view.getDesignResolutionSize().width, 
            cc.view.getDesignResolutionSize().height,
            resolution
        );
        cc.view.resizeWithBrowserSize(true);
    },
});
