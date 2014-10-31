enum DEF_GAME_STATE {PREPARE,BEGIN,PAUSE,WIN,LOSE};
class DataManage
{
    public static m_nScore:number=0;             //当前分数
    public static m_nUnLockLevel:number=0;       //
    public static m_nCurLevel:number=0;          //当前关卡
    public static m_nGameState:number=0;         //游戏状态
    public static isRunning:boolean=false;       //是否运行
    public static m_nMaxLeftTime:number=30;      //每局运行时间
    public static m_nCurLeftTime:number=0;       //当前剩余时间
    public static m_nGameViewWidth:number=0;     //游戏视图宽
    public static m_nGameViewHeight:number=0;    //游戏视图高
    //创建所有的方块
    public static InitData():void
    {
        this.m_nCurLevel=0;
        this.m_nGameState=DEF_GAME_STATE.PREPARE;
        this.isRunning=false;
    }
    //重新开始游戏
    public static Restart()
    {
        if(this.m_nUnLockLevel>this.m_nCurLevel){
            this.m_nCurLevel++;
        }
        this.m_nCurLeftTime=this.m_nMaxLeftTime;
    }
    public static OnWin(){
        this.m_nGameState=DEF_GAME_STATE.WIN;
        this.m_nUnLockLevel++;
    }
    public static OnLose(){
        this.m_nGameState=DEF_GAME_STATE.LOSE;
    }
}