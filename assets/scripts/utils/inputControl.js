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

    onClick: null,
    onDrag: null,
    
    // use this for initialization
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_END, function() {
            if (this.onClick) {
                this.onClick();
            } 
        }, this);
        
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
            if (this.onDrag) {
                var target = event.touch.getLocation();
                this.onDrag(target);
                
                if (this.getComponent("inputControl").propagate)
                    event.stopPropagation();
            } 
        }, this);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
