var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.apply(this, arguments);
    }
    //创建全局静态界面
    GameView.prototype.createStaticView = function (rootLayout) {
        this.m_pGameMenuLayOutParent = rootLayout;
        this.createGamePlayLayout();
        this.createGameBeginLayout(rootLayout);
        this.createGameOverLayout(rootLayout);
        this.showGameBeginLayout();
    };
    GameView.prototype.createGamePlayLayout = function () {
        //创建游戏层
        this.m_pGamePlayLayOut = new PlayScence();
        this.m_pGamePlayLayOut.SetLinkObj(this);
    };
    GameView.prototype.createGameBeginLayout = function (rootLayout) {
        this.m_pGameBeginLayOut = new egret.Sprite();
        var bk = utils.createRoundRectangular(0, 0, DataManage.m_nGameViewWidth, DataManage.m_nGameViewHeight, 0xff7e00, 1, 8, 0x84cb08, 30, 30);
        this.m_pGameBeginLayOut.addChild(bk);
        var title = utils.createTextLabel(Game.m_sGameName, 0x324902, egret.HorizontalAlign.CENTER, egret.VerticalAlign.TOP, 80, DataManage.m_nGameViewWidth, 0, 0x00a5d4);
        title.y = 100;
        this.m_pGameBeginLayOut.addChild(title);
        var btn = utils.createCircleBtn("开始", rootLayout, egret.MainContext.instance.stage.stageWidth / 2, egret.MainContext.instance.stage.stageHeight / 2, 200);
        btn.SetStroke(5, 0x6ed400);
        btn.SetTextSize(50);
        btn.SetLinkFun(this.onRestart, this);
        this.m_pGameBeginLayOut.addChild(btn);
    };
    GameView.prototype.createGameOverLayout = function (rootLayout) {
        this.m_pGameOverLayOut = new egret.Sprite();
        var bk = utils.createRectangular(0, 0, DataManage.m_nGameViewWidth, DataManage.m_nGameViewHeight, 0xff7e00);
        this.m_pGameOverLayOut.addChild(bk);
        var btn = utils.createRectBtn("重新开始", rootLayout, egret.MainContext.instance.stage.stageWidth / 2, egret.MainContext.instance.stage.stageHeight / 2, 160, 40);
        btn.SetLinkFun(this.onRestart, this);
        this.m_pGameOverLayOut.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
    };

    //显示游戏开始画面
    GameView.prototype.showGameBeginLayout = function () {
        if (this.m_pGamePlayLayOut.parent == this.m_pGameMenuLayOutParent) {
            this.m_pGameMenuLayOutParent.removeChild(this.m_pGamePlayLayOut);
        }
        if (this.m_pGameOverLayOut.parent == this.m_pGameMenuLayOutParent) {
            this.m_pGameMenuLayOutParent.removeChild(this.m_pGameOverLayOut);
        }
        this.m_pGameMenuLayOutParent.addChild(this.m_pGameBeginLayOut);
    };

    //显示游戏结束画面
    GameView.prototype.showGameOverLayout = function () {
        if (this.m_pGamePlayLayOut.parent == this.m_pGameMenuLayOutParent) {
            this.m_pGameMenuLayOutParent.removeChild(this.m_pGamePlayLayOut);
        }
        if (this.m_pGameBeginLayOut.parent == this.m_pGameMenuLayOutParent) {
            this.m_pGameMenuLayOutParent.removeChild(this.m_pGameBeginLayOut);
        }
        this.m_pGameMenuLayOutParent.addChild(this.m_pGameOverLayOut);
    };

    //重新开始
    GameView.prototype.onRestart = function () {
        DataManage.Restart();
        if (this.m_pGameBeginLayOut.parent == this.m_pGameMenuLayOutParent) {
            this.m_pGameMenuLayOutParent.removeChild(this.m_pGameBeginLayOut);
        }
        if (this.m_pGameOverLayOut.parent == this.m_pGameMenuLayOutParent) {
            this.m_pGameMenuLayOutParent.removeChild(this.m_pGameOverLayOut);
        }
        this.m_pGameMenuLayOutParent.addChild(this.m_pGamePlayLayOut);
        this.m_pGamePlayLayOut.StartGame();
    };
    return GameView;
})(egret.EventDispatcher);
GameView.prototype.__class__ = "GameView";
