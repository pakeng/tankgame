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
    },
    _levelUP () {
        let that = this;
        if(this.tank_level<6){
            this.tank_level++;
        }else{
            this.tank_level = 0;
        }
        let tank_sp_name = "p"+this.tank_type+"tank"+ this.tank_level;
        cc.loader.loadRes("tank/tank", cc.SpriteAtlas, function (err, atlas) {
            console.log(that);
            console.log(tank_sp_name);
            var frame = atlas.getSpriteFrame(tank_sp_name);
            that.tank_sp.spriteFrame =frame ;//new cc.SpriteFrame("p1tank6");
        });
        
    }
    // update (dt) {},
});
