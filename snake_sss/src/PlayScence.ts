/**
 * Created by admin on 14-9-19.
 */
class PlayScence extends egret.Sprite{
    private m_bInit:boolean=false;
    private m_pLinkObj:GameView;
    private m_pLeftTime:egret.TextField;
    private m_pLvInfor:egret.TextField;
    private m_pCountTimer:egret.Timer;
    private m_pContainer:egret.Sprite;
    private m_nMakeCount:number=0;
    private m_nCurIDMax:number=0;
    public static m_nScenceW:number=20;
    public static m_nScenceH:number=50;
    public static m_nGrideSize:number=20;
    private static m_szRndColor:Array<number>=[0xffff00,0xff00ff,0x00ffff,0xf00fff,0xfff00f,0xf0f00f];
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(){
        this.width=this.stage.stageWidth;
        this.height=this.stage.stageHeight;
        if(this.m_bInit) return;
        this.m_bInit=true;
        this.DrawLvUI();
        this.DrawInfor();
        this.RegKeyBoardEvent();
    }
    public SetLinkObj(plink:GameView){
        this.m_pLinkObj=plink;
    }
    private DrawLvUI(){
        PlayScence.m_nScenceW=Math.floor(this.width/PlayScence.m_nGrideSize);
        PlayScence.m_nScenceH=Math.floor((this.height-50)/PlayScence.m_nGrideSize);
        this.m_pContainer=new egret.Sprite;
        this.m_pContainer.y=50;
        this.m_pContainer.width=PlayScence.m_nScenceW*PlayScence.m_nGrideSize;
        this.m_pContainer.height=PlayScence.m_nScenceH*PlayScence.m_nGrideSize;
        this.m_pContainer.graphics.beginFill(0x804422,1);
        this.m_pContainer.graphics.drawRoundRect(0,0,this.m_pContainer.width,this.m_pContainer.height,30,30);
        this.m_pContainer.graphics.endFill();
        this.addChild(this.m_pContainer);
    }
    private DrawInfor(){
        this.m_pCountTimer=new egret.Timer(1000);
        this.m_pLvInfor=utils.createTextLabel("Lv:1",0xffffff);
        this.m_pLvInfor.x=60;
        this.m_pLvInfor.y=10;
        this.addChild(this.m_pLvInfor);
        this.m_pLeftTime=utils.createTextLabel("Time:0",0xffffff,egret.HorizontalAlign.CENTER,egret.VerticalAlign.TOP,30,this.width);
        this.m_pLeftTime.y=10;
        this.addChild(this.m_pLeftTime);
    }
    public StartGame(){
        this.m_pLeftTime.text="Lv:"+(DataManage.m_nCurLevel+1);
        this.RefresheLeft();
        this.m_pCountTimer.addEventListener(egret.TimerEvent.TIMER,this.RefresheLeft,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
        this.m_pCountTimer.reset();
        this.m_pCountTimer.start();
        this.ResetData();
    }
    public GameOver(result:boolean){
        this.m_pCountTimer.stop();
        if(result){
            DataManage.OnWin();
        }else{
            DataManage.OnLose();
        }
        this.m_pLinkObj.showGameOverLayout();
    }
    public RefresheLeft(){
        if(DataManage.m_nCurLeftTime<=0){
            this.GameOver(false);
            return;
        }
        DataManage.m_nCurLeftTime--;
        this.m_pLeftTime.text="Time:"+DataManage.m_nCurLeftTime;
    }
    public GetAllBlocks():Array<any>{
        return this.m_pContainer._children;
    }
    public GetAllBlockNum():number{
        return this.m_pContainer.numChildren;
    }
    private ResetData(){
        this.m_nCurIDMax=0;
        this.m_nMakeCount=0;
        this.m_pContainer.removeChildren();
        this.MakeNewSnake(utils.GetRndNum(4),utils.GetRndNum(10)+5,PlayScence.m_szRndColor[utils.GetRndNum(PlayScence.m_szRndColor.length)],3,false);
    }
    private gameViewUpdate(){
        this.m_nMakeCount++;
        if(this.m_nMakeCount>=utils.GetRndNum(200)+200){
            this.m_nMakeCount=0;
            this.MakeNewSnake(utils.GetRndNum(4),utils.GetRndNum(5)+2,PlayScence.m_szRndColor[utils.GetRndNum(PlayScence.m_szRndColor.length)],3);
        }

    }
    //--------------------------------GameBegin-----------------------------------

    private MakeNewSnake(dir:number,len:number=3,color:number=0xffff00,v:number=3,bai:boolean=true):snakestyle.GSnakeHead {
        var sx:number=0;
        var sy:number=0;
        switch(dir){
            case 0:
                sx=0;
                sy=utils.GetRndNum(PlayScence.m_nScenceH);
                break;
            case 1:
                sx=utils.GetRndNum(PlayScence.m_nScenceW);
                sy=0;
                break;
            case 2:
                sx=PlayScence.m_nScenceW;
                sy=utils.GetRndNum(PlayScence.m_nScenceH);
                break;
            default:
                sx=utils.GetRndNum(PlayScence.m_nScenceW);
                sy=PlayScence.m_nScenceH;
                break;
        }
        var phead:snakestyle.GSnakeHead;
        phead=new snakestyle.GSnakeHead();
        phead.InitHead(this,this.m_pContainer,this.m_nCurIDMax,sx,sy,dir,len,v,color,bai);
        this.m_pContainer.addChild(phead);
        this.m_nCurIDMax++;
        return phead;
    }
    private OnPlayerMoveDir(dir:number,state:boolean){
        var szblocks:Array<any>;
        var sztotop:Array<any>=[];
        szblocks=this.GetAllBlocks();
        var i:number;
        var nlen:number=szblocks.length;
        //把与背景颜色相同的放到上面
        for(i=0;i<nlen;i++) {
            if (typeof(szblocks[i]) != "object") continue;
            if (!(szblocks[i] instanceof snakestyle.GSnakeHead)) continue;
            szblocks[i].SetMoveDir(dir);
        }
    }
    //注册键盘事件
    private RegKeyBoardEvent(){
        var thisRef = this;
        document.onkeydown = function(evt){
            if(evt.keyCode==65 || evt.keyCode==37 || evt.keyCode==100){
                //左
                thisRef.OnPlayerMoveDir(0,true);
            }else if(evt.keyCode==87 || evt.keyCode==38 || evt.keyCode==104){
                //上
                thisRef.OnPlayerMoveDir(1,true);
            }else if(evt.keyCode==68 || evt.keyCode==39 || evt.keyCode==102){
                //右
                thisRef.OnPlayerMoveDir(2,true);
            }else if(evt.keyCode==83 || evt.keyCode==40 || evt.keyCode==98){
                //下
                thisRef.OnPlayerMoveDir(3,true);
            }
        };
        document.onkeyup = function(evt){
            if(evt.keyCode==65 || evt.keyCode==37 || evt.keyCode==100){
                //左
                thisRef.OnPlayerMoveDir(0,false);
            }else if(evt.keyCode==87 || evt.keyCode==38 || evt.keyCode==104){
                //上
                thisRef.OnPlayerMoveDir(1,false);
            }else if(evt.keyCode==68 || evt.keyCode==39 || evt.keyCode==102){
                //右
                thisRef.OnPlayerMoveDir(2,false);
            }else if(evt.keyCode==83 || evt.keyCode==40 || evt.keyCode==98){
                //下
                thisRef.OnPlayerMoveDir(3,false);
            }
        };
    }
}