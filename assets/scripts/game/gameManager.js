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

    situations: [
        {
            type: "meteorits",
            desc: "Meteorits incoming!",
            hint: "Tap to meteriots to destroy them"
        },  
        {
            type: "lasers",
            desc: "UFO want to destroy your world!",
            hint: "Move world to evade lasers"
        },  
        {
            type: "invaders",
            desc: "Invaders incoming!",
            hint: "Avoid from invaders"
        },  
        {
            type: "grow",
            desc: "Grow time",
            hint: "Tap on world to upgrade your world",
        },  
    ],

    // use this for initialization
    onLoad: function () {
        this.currentSituation = false;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
