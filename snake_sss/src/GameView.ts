class GameView extends egret.EventDispatcher
{
    private m_pGamePlayLayOut:PlayScence;
    private m_pGameBeginLayOut:egret.Sprite;
    private m_pGameOverLayOut:egret.Sprite;
    private m_pGameMenuLayOutParent:egret.DisplayObjectContainer;
    //创建全局静态界面
    public createStaticView(rootLayout:egret.DisplayObjectContainer):void
    {
        this.m_pGameMenuLayOutParent = rootLayout;
        this.createGamePlayLayout();
        this.createGameBeginLayout(rootLayout);
        this.createGameOverLayout(rootLayout);
        this.showGameBeginLayout();
    }
    private createGamePlayLayout()
    {
        //创建游戏层
        this.m_pGamePlayLayOut = new PlayScence();
        this.m_pGamePlayLayOut.SetLinkObj(this);
    }
    private createGameBeginLayout(rootLayout:egret.DisplayObjectContainer)
    {
        this.m_pGameBeginLayOut = new egret.Sprite();
        var bk:egret.Sprite=utils.createRoundRectangular(0,0,DataManage.m_nGameViewWidth,DataManage.m_nGameViewHeight,0xff7e00,1,8,0x84cb08,30,30);
        this.m_pGameBeginLayOut.addChild(bk);
        var title:egret.TextField=utils.createTextLabel(Game.m_sGameName,0x324902,egret.HorizontalAlign.CENTER,egret.VerticalAlign.TOP,80,DataManage.m_nGameViewWidth,0,0x00a5d4);
        title.y=100;
        this.m_pGameBeginLayOut.addChild(title);
        var btn:mygui.GRectBtn = utils.createCircleBtn("开始",rootLayout,egret.MainContext.instance.stage.stageWidth/2,egret.MainContext.instance.stage.stageHeight/2,200);
        btn.SetStroke(5,0x6ed400);
        btn.SetTextSize(50);
        btn.SetLinkFun(this.onRestart,this);
        this.m_pGameBeginLayOut.addChild( btn );
    }
    private createGameOverLayout(rootLayout:egret.DisplayObjectContainer)
    {
        this.m_pGameOverLayOut = new egret.Sprite();
        var bk=utils.createRectangular(0,0,DataManage.m_nGameViewWidth,DataManage.m_nGameViewHeight,0xff7e00);
        this.m_pGameOverLayOut.addChild(bk);
        var btn:mygui.GRectBtn = utils.createRectBtn("重新开始",rootLayout,egret.MainContext.instance.stage.stageWidth/2,egret.MainContext.instance.stage.stageHeight/2,160,40);
        btn.SetLinkFun(this.onRestart,this);
        this.m_pGameOverLayOut.addChild( btn );
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRestart, this);
    }
    //显示游戏开始画面
    public showGameBeginLayout()
    {
        if(this.m_pGamePlayLayOut.parent==this.m_pGameMenuLayOutParent){
            this.m_pGameMenuLayOutParent.removeChild( this.m_pGamePlayLayOut );
        }
        if(this.m_pGameOverLayOut.parent==this.m_pGameMenuLayOutParent){
            this.m_pGameMenuLayOutParent.removeChild( this.m_pGameOverLayOut );
        }
        this.m_pGameMenuLayOutParent.addChild( this.m_pGameBeginLayOut );
    }
    //显示游戏结束画面
    public showGameOverLayout()
    {
        if(this.m_pGamePlayLayOut.parent==this.m_pGameMenuLayOutParent){
            this.m_pGameMenuLayOutParent.removeChild( this.m_pGamePlayLayOut );
        }
        if(this.m_pGameBeginLayOut.parent==this.m_pGameMenuLayOutParent){
            this.m_pGameMenuLayOutParent.removeChild( this.m_pGameBeginLayOut );
        }
        this.m_pGameMenuLayOutParent.addChild( this.m_pGameOverLayOut );
    }
    //重新开始
    private onRestart()
    {
        DataManage.Restart();
        if(this.m_pGameBeginLayOut.parent==this.m_pGameMenuLayOutParent){
            this.m_pGameMenuLayOutParent.removeChild( this.m_pGameBeginLayOut );
        }
        if(this.m_pGameOverLayOut.parent==this.m_pGameMenuLayOutParent){
            this.m_pGameMenuLayOutParent.removeChild( this.m_pGameOverLayOut );
        }
        this.m_pGameMenuLayOutParent.addChild(this.m_pGamePlayLayOut);
        this.m_pGamePlayLayOut.StartGame();
    }
}