class Game extends egret.DisplayObjectContainer
{
    public static m_sGameName:string="蛇吃蛇";//游戏名字
    private m_pGameVie:GameView;      //游戏视图
    public constructor ()
    {
        super();
        this.addEventListener( egret.Event.ADDED_TO_STAGE, this.onAddStage,this);
    }
    private onAddStage():void
    {
        //egret.Profiler.getInstance().run();

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComp,this);
        RES.loadConfig("resource/resource.json","resource/");
        RES.loadGroup("gameres");
    }
    //加载完成
    private onGroupComp()
    {
        //初始化游戏数据
        DataManage.InitData();
        DataManage.m_nGameViewWidth=this.stage.stageWidth;
        DataManage.m_nGameViewHeight=this.stage.stageHeight;
        this.width=this.stage.stageWidth;
        this.height=this.stage.stageHeight;
        //创建游戏静态界面
        this.m_pGameVie = new GameView();
        this.m_pGameVie.createStaticView( this );
    }
}