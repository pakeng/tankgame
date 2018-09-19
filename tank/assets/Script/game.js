var tankbase = require("tankbase");
var Constant = require("Constant");

var minTilesCount = 2;
var mapMoveStep = 1;
var minMoveValue = 50;
 // 游戏类型0 一个人玩，1 两个人玩
var GameType = cc.Enum({
    ONE: 0,
    TWO: 1,
});
var gameType = GameType.ONE;
cc.Class({
    extends: cc.Component,
    editor:{
        requireComponent: cc.TiledMap
    },
    properties: {
        mapBgLayerName: {
            default: "bg"
        },
        mapWallLayerName: {
            default: "wall"
        },
        mapObjLayerName: {
            default: "obj"
        },
        m1BirthPoint:{
            default: "m1"
        },
        
        m2BirthPoint:{
            default: "m2"
        },
        
        m3BirthPoint:{
            default: "m3"
        },

        user1TankName:{
            default: "p1"
        },
        user2TankName:{
            default: "p2"
        },
        p1BirthPoint:{
            default: "p1"
        },

        p2BirthPoint:{
            default: "p2"
        },
        userBasePoint:{
            default: "king"
        },
        mapObjLayer:{
            default: null,
            visible: false
        }
    },

    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this._onKeyPressed, this);
    },
    start () {
        this._tiledMap = this.node.getComponent('cc.TiledMap');
        this.mapObjLayer = this._tiledMap.getObjectGroup(this.mapObjLayerName);
        if(!this.mapObjLayer){
            console.log("get Obj Layer Error");
            return;
        }
        // 初始化地图信息
        this._bgLayer = this._tiledMap.getLayer(this.mapBgLayerName);
        this._wallLayer = this._tiledMap.getLayer(this.mapWallLayerName);
        if(!this._bgLayer||!this._wallLayer){
            console.log("初始化地图信息错误");
            return;
        }
        this.initPlayer();
    },
    initPlayer(){
        // 获取出生地点
        let user_brith_address = this.mapObjLayer.getObject(this.p1BirthPoint);
        this._startPos = cc.v2(user_brith_address.x, user_brith_address.y);
        // 初始化玩家
        this._player = this.node._parent.getChildByName(this.user1TankName).getComponent(tankbase);
        this._curTile = this._transformPixel2TilePos(this._startPos);
        console.log("_curtile" , this._curTile);
        this._updatePlayerPos( this._curTile);
    },
    _onKeyPressed: function(event) {

        var newTile = cc.v2(this._curTile.x, this._curTile.y);
        var mapMoveDir = Constant.MoveDirection.NONE;
        var playerMoveDir = Constant.MoveDirection.NONE;
        switch(event.keyCode) {
            case cc.macro.KEY.up:
                newTile.y -= 1;
                playerMoveDir = Constant.MoveDirection.UP;
                mapMoveDir = Constant.MoveDirection.DOWN;
                break;
            case cc.macro.KEY.down:
                newTile.y += 1;
                playerMoveDir = Constant.MoveDirection.DOWN;
                mapMoveDir = Constant.MoveDirection.UP;
                break;
            case cc.macro.KEY.left:
                newTile.x -= 1;
                playerMoveDir = Constant.MoveDirection.LEFT;
                mapMoveDir = Constant.MoveDirection.RIGHT;
                break;
            case cc.macro.KEY.right:
                newTile.x += 1;
                playerMoveDir = Constant.MoveDirection.RIGHT;
                mapMoveDir = Constant.MoveDirection.LEFT;
                console.log("ccccccc  ritht");
                break;
            default:
                return;
        }
        // 尝试转向
        if (!this._tryTurnDirection(playerMoveDir)){
            this._tryMovePlayer(newTile);
        }
    },
    _transformPixel2TilePos: function (posInPixel){
        var mapSize = this.node.getContentSize();
        console.log(mapSize);
        console.log(posInPixel);
        var tileSize = this._tiledMap.getTileSize();
        var x = Math.floor((posInPixel.x) / tileSize.width);
        var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);
        return cc.v2(x, y);
    },
    _updatePlayerPos: function() {
        console.log(this._curTile);
        var pos = this._bgLayer.getPositionAt(this._curTile);
        pos.x = pos.x+16; // 转换坐标 把地图块的左下角坐标转换到中间位置
        pos.y = pos.y+16;
        this._player.setTankPosition(pos);
    },
    // 玩家移动方法
    _tryMovePlayer: function(newTile) {
        if(!newTile){
            console.log("new Tiled = ", newTile);
            return;
        }
        let mapSize = this._tiledMap.getMapSize();
        console.log("mapSize", mapSize);
        if (newTile.x < 1 || newTile.x >= mapSize.width-1) return;
        if (newTile.y < 1 || newTile.y >= mapSize.height-1) return;
        // 判断类型来决定是否能进入
        if (this._wallLayer.getTileGIDAt(newTile)) {
            cc.log('This way is blocked!');
            return false;
        }
        // update the player position
        this._curTile = newTile;
        this._updatePlayerPos();
    },
    _tryTurnDirection (dir){
        if (this._player.curDirection == dir||dir == Constant.MoveDirection.NONE){
            return false;
        }else{
            // turn dir
            this._player.turnDirection(dir);
            return true;
        }
    }
});
