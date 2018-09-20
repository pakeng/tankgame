/**
 * 常量和枚举
 * 用来标识全局相关的数据
 */
var Constant = {
    
    TANK_TYPE : cc.Enum({
        MONSTER: 0,
        PLAYER: 1,
        PLAYER2: 2,
    }),
    MoveDirection : cc.Enum({
        NONE: 0,
        UP: 1,
        RIGHT: 2,
        DOWN: 3,
        LEFT: 4,
    }),
    BULLET_TYPE : cc.Enum({
        NONE: 0,
        NORMAL: 1,
        KILLALL: 2,
    }),



}

module.exports = Constant;
