cc.Class({
    extends: cc.Component,

    properties: {
        mask: {
            default: null,
            type: cc.Node
        }
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        this.mask.opacity = 255;
        this.mask.runAction(cc.sequence( 
            cc.fadeOut(0.3)
        ))
    },
    
    onDisable: function() {
        console.log("TEST");
        cc.audioEngine.stopMusic();
    },
    
    toMenu: function() {
        this.mask.runAction(cc.sequence( 
            cc.fadeIn(0.3), 
            cc.callFunc(function () {
                cc.director.loadScene("MenuScene"); 
            })
        ));
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
