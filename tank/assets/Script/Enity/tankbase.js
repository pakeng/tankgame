var Constant = require("Constant");
var MoveDirection = Constant.MoveDirection;
cc.Class({
    extends: cc.Component,

    properties: {
        tank_name: {
            default: "",
        },
        tank_type: {
            default: Constant.TANK_TYPE.MONSTER,
            type: Constant.TANK_TYPE
        },
        tank_hp: {
            default: 10
        },
        tank_level:{
            default:0
        },
        tank_weapon:{
            default:null
        },
        tank_sp:{
            default: null,
            type: cc.Sprite
        },
        curDirection:{
            default: MoveDirection.UP,
            type: MoveDirection
        }
    },
    start () {
        this.name = this.tank_name;
    },
    // 射击
    shot () {
        console.log("shot");
    },
    // 被击中
    onHit ( hp){

    },
    setTankPosition (pos) {
        console.log("set tank_sp position", pos);
        this.tank_sp.node.setPosition(pos)
    },
    turnDirection (dir) {
        console.log("set tank_sp dir", dir);
        this.tank_sp.node.rotation = (dir-1)*90;
        this.curDirection = dir;
    }
    // update (dt) {},
});
