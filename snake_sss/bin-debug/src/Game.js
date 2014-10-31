var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);
    }
    Game.prototype.onAddStage = function () {
        //egret.Profiler.getInstance().run();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("gameres");
    };

    //加载完成
    Game.prototype.onGroupComp = function () {
        //初始化游戏数据
        DataManage.InitData();
        DataManage.m_nGameViewWidth = this.stage.stageWidth;
        DataManage.m_nGameViewHeight = this.stage.stageHeight;
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;

        //创建游戏静态界面
        this.m_pGameVie = new GameView();
        this.m_pGameVie.createStaticView(this);
    };
    Game.m_sGameName = "蛇吃蛇";
    return Game;
})(egret.DisplayObjectContainer);
Game.prototype.__class__ = "Game";
