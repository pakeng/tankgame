var BULLET_TYPE = require("Constant").BULLET_TYPE;

cc.Class({
    extends: cc.Component,

    properties: {
       bullet_name:"",
       bullet_type: {
            default: BULLET_TYPE.NONE,
            type: BULLET_TYPE
       },
       bullet_sp: {
           default: null,
           type: cc.Sprite
       }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
