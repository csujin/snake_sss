module mygui
{
    export class GBaseBtn extends egret.Sprite{
        private m_pStage:any;
        private m_pLinkObj:any;
        private m_pFunction:any;
        public m_pFillObj:egret.Shape;
        public m_nColor1:number;
        private m_pText:egret.TextField;
        public m_nStrokeWidth:number;
        public m_nStrokeColor:number;
        private m_bTouchDown:boolean=false;
        public constructor(_text:string="Btn",_stage:any=null,_x:number=0,_y:number=0,_w:number=100,_h:number=30,_c0:number=0x005070,_textSize:number=16,_textColor:number=0xffffff,strokew:number=0,strokec:number=0)
        {
            super();
            this.x=_x;
            this.y=_y;
            this.m_pStage=_stage;
            this.m_nColor1=_c0;
            this.m_nStrokeWidth=strokew;
            this.m_nStrokeColor=strokec;
            this.CreateFillObj(_w,_h);
            this.FillColor();
            this.m_pText=utils.createTextLabel(_text,_textColor,egret.HorizontalAlign.CENTER,egret.VerticalAlign.MIDDLE,_textSize);
            this.m_pText.x=-_w/2;
            this.m_pText.y=-_h/2;
            this.m_pText.width=_w;
            this.m_pText.height=_h;
            this.addChild(this.m_pText);
            this.Enable();
        }
        public CreateFillObj(_w:number,_h:number){
            this.m_pFillObj=new egret.Shape();
            this.m_pFillObj.x=-_w/2;
            this.m_pFillObj.y=-_h/2;
            this.m_pFillObj.width=_w;
            this.m_pFillObj.height=_h;
            this.addChild(this.m_pFillObj);
        }
        public SetLinkFun(plink:any,pfun:any){
            this.m_pLinkObj=plink;
            this.m_pFunction=pfun;
        }
        public SetStroke(w:number,c:number){
            this.m_nStrokeWidth=w;
            this.m_nStrokeColor=c;
            this.FillColor();
        }
        public SetTextSize(nsize:number){
            this.m_pText.size=nsize;
        }
        public SetText(txt:string){
            this.m_pText.text=txt;
        }
        public FillColor(){
        }
        public Enable(){
            this.m_pFillObj.touchEnabled=true;
            this.m_pFillObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.OnTouchBegin, this);
            this.m_pFillObj.addEventListener(egret.TouchEvent.TOUCH_OUT,this.OnTouchEnd, this);
            this.m_pFillObj.addEventListener(egret.TouchEvent.TOUCH_END,this.OnTouchEnd, this);
        }
        public UnEnable(){
            this.m_pFillObj.touchEnabled=false;
            this.m_pFillObj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.OnTouchBegin, this);
            this.m_pFillObj.removeEventListener(egret.TouchEvent.TOUCH_OUT,this.OnTouchEnd, this);
            this.m_pFillObj.removeEventListener(egret.TouchEvent.TOUCH_END,this.OnTouchEnd, this);
        }
        private OnClick(){
            if(this.m_pLinkObj==null || this.m_pFunction==null) return;
            this.m_pLinkObj.call(this.m_pFunction,this.m_pLinkObj);
        }
        private  OnTouchBegin(event:egret.TouchEvent)
        {
            this.Down();
        }
        private  OnTouchEnd(event:egret.TouchEvent)
        {
            this.Up();
        }
        private addStageMouseHandlers():void{
            if(this.m_pStage==null) return;
            this.m_pStage.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.stage_mouseUpHandler,this);
            this.m_pStage.stage.addEventListener(egret.Event.LEAVE_STAGE,this.stage_mouseUpHandler,this);
        }
        private removeStageMouseHandlers():void{
            if(this.m_pStage==null) return;
            this.m_pStage.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.stage_mouseUpHandler,this);
            this.m_pStage.stage.removeEventListener(egret.Event.LEAVE_STAGE,this.stage_mouseUpHandler,this);
        }
        private stage_mouseUpHandler(event:Event){
            if(!this.m_bTouchDown) return;
            this.Up();
        }
        public PlayDown(){
            egret.Tween.get(this).to({scaleX:0.8,scaleY:0.8,alpha:0.5},100);
        }
        public PlayUp(){
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({scaleX:1,scaleY:1,alpha:1},300,egret.Ease.elasticOut);
        }
        private Down(){
            if(this.m_bTouchDown) return;
            this.m_bTouchDown=true;
            this.addStageMouseHandlers();
            this.PlayDown();
        }
        private Up(){
            if(!this.m_bTouchDown) return;
            this.m_bTouchDown=false;
            this.removeStageMouseHandlers();
            this.PlayUp();
            this.OnClick();
        }
    }
    export class GRectBtn extends mygui.GBaseBtn
    {
        public CreateFillObj(_w:number,_h:number){
            this.m_pFillObj=new egret.Shape();
            this.m_pFillObj.x=-_w/2;
            this.m_pFillObj.y=-_h/2;
            this.m_pFillObj.width=_w;
            this.m_pFillObj.height=_h;
            this.addChild(this.m_pFillObj);
        }
        public FillColor(){
            this.m_pFillObj.graphics.clear();
            if(this.m_nStrokeWidth!=0 && this.m_nStrokeColor!=0){
                this.m_pFillObj.graphics.lineStyle( this.m_nStrokeWidth, this.m_nStrokeColor );
            }
            this.m_pFillObj.graphics.beginFill(this.m_nColor1,1);
            this.m_pFillObj.graphics.drawRoundRect(0,0,this.m_pFillObj.width,this.m_pFillObj.height,Math.min(this.m_pFillObj.width,this.m_pFillObj.height)/3,Math.min(this.m_pFillObj.width,this.m_pFillObj.height)/3);
            this.m_pFillObj.graphics.endFill();
        }
    }
    export class GCircleBtn extends mygui.GBaseBtn
    {
        public CreateFillObj(_w:number,_h:number){
            this.m_pFillObj=new egret.Shape();
            this.m_pFillObj.anchorX=0.5;
            this.m_pFillObj.anchorY=0.5;
            this.m_pFillObj.width=_w;
            this.m_pFillObj.height=_h;
            this.addChild(this.m_pFillObj);
        }
        public FillColor(){
            this.m_pFillObj.graphics.clear();
            if(this.m_nStrokeWidth!=0 && this.m_nStrokeColor!=0){
                this.m_pFillObj.graphics.lineStyle( this.m_nStrokeWidth, this.m_nStrokeColor );
            }
            this.m_pFillObj.graphics.beginFill(this.m_nColor1,1);
            this.m_pFillObj.graphics.drawCircle(this.m_pFillObj.width/2,this.m_pFillObj.width/2,this.m_pFillObj.width/2);
            this.m_pFillObj.graphics.endFill();
        }
    }
}
