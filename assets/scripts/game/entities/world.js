cc.Class({
    extends: cc.Component,

    properties: {
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
        this.node.runAction(
            cc.repeatForever(cc.rotateBy(2, 360))
        );
        
        var clickable = this.getComponent('clickable');
        if (clickable) {
            clickable._callback = function () {
                this.node.runAction(cc.sequence(
                    cc.scaleTo(0.05, 1.2, 1.2),
                    cc.scaleTo(0.05, 1, 1)
                ));
            }
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
       
    },
});
