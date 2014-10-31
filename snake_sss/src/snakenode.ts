/**
 * Created by admin on 14-9-26.
 */
module snakestyle{
    export class GBaseSnakeNode extends egret.Sprite{
        //通用属性
        public m_nSnakeId:number;
        public m_pPreNode:snakestyle.GBaseSnakeNode;
        public m_pNextNode:snakestyle.GBaseSnakeNode;
        public m_nColor:number;
        public m_nIx:number;
        public m_nIy:number;
        public InitBoday(id:number,ix:number,iy:number,color:number){
            this.m_nSnakeId=id;
            this.m_nIx=ix;
            this.m_nIy=iy;
            this.m_nColor=color;
            this.DrawSelf(color);
        }
        public IsHead(){
            return false;
        }
        public DrawSelf(color:number){
            this.graphics.clear();
            this.graphics.beginFill(color,1);
            this.graphics.drawRect(0,0,PlayScence.m_nGrideSize,PlayScence.m_nGrideSize);
            this.graphics.endFill();
        }
        public OnMoveTo(itx:number,ity:number){
            var iprex:number=0;
            var iprey:number=0;
            iprex=this.m_nIx;
            iprey=this.m_nIy;
            this.m_nIx=itx;
            this.m_nIy=ity;
            this.RefreshPos();
            if(this.m_pNextNode!=null){
                this.m_pNextNode.OnMoveTo(iprex,iprey);
            }
        }
        public GetSnakeLen():number{
            var count:number=1;
            var pcheck:snakestyle.GBaseSnakeNode;
            pcheck=this.m_pNextNode;
            while(pcheck!=null){
                pcheck=pcheck.m_pNextNode;
                count++;
            }
            return count;
        }
        public AddNode(num:number){
            return;
            if(this.parent==null) return;
            var plast:snakestyle.GBaseSnakeNode;
            plast=this.GetEndNode();
            for(var i:number=0;i<num;i++){
                var p:snakestyle.GBaseSnakeNode=new snakestyle.GBaseSnakeNode();
                p.InitBoday(this.m_nSnakeId,plast.m_nIx,plast.m_nIy,this.m_nColor);
                p.m_pPreNode=plast;
                plast.m_pNextNode=p;
                plast=p;
                this.parent.addChild(p);
            }
        }
        public GetEndNode():snakestyle.GBaseSnakeNode{
            if(this.m_pNextNode==null) return this;
            var pend:snakestyle.GBaseSnakeNode=this.m_pNextNode;
            var pcheck:snakestyle.GBaseSnakeNode;
            pcheck=this.m_pNextNode;
            while(pcheck!=null){
                pend=pcheck;
                pcheck=pcheck.m_pNextNode;
            }
            return pend;
        }
        public RefreshPos(){
            this.x=this.m_nIx*PlayScence.m_nGrideSize;
            this.y=this.m_nIy*PlayScence.m_nGrideSize;
        }
        public OnNodeBroke(){
            this.OnNodeDie();
            if(this.m_pNextNode==null) return;
            this.m_pNextNode.OnNodeBroke();
        }
        public OnNodeDie(){
            if(this.parent==null) return;
            if(this.m_pPreNode!=null){
                this.m_pPreNode.m_pNextNode=null;
            }
            this.parent.removeChild(this);
        }
    }
    export class GSnakeHead extends snakestyle.GBaseSnakeNode{
        private m_pScence:PlayScence;
        private m_nDir:number;
        private m_nSpeed:number;
        private m_bAi:boolean;
        private m_pCountTimer:egret.Timer;
        public InitHead(pscence:PlayScence,pcontainer:egret.Sprite,id:number,ix:number,iy:number,dir:number,len:number,v:number,color:number,bai:boolean){
            this.m_pScence=pscence;
            this.m_nSnakeId=id;
            this.m_nIx=ix;
            this.m_nIy=iy;
            this.m_nDir=dir;
            this.m_nSpeed=v;
            this.m_nColor=color;
            this.m_bAi=bai;
            this.m_pPreNode=null;
            var plast:snakestyle.GBaseSnakeNode;
            plast=this;
            for(var i:number=0;i<len;i++){
                var p:snakestyle.GBaseSnakeNode=new snakestyle.GBaseSnakeNode();
                p.InitBoday(this.m_nSnakeId,ix,iy,color);
                p.m_pPreNode=plast;
                plast.m_pNextNode=p;
                plast=p;
                pcontainer.addChild(p);
            }
            this.m_pCountTimer=new egret.Timer(100);
            this.m_pCountTimer.addEventListener(egret.TimerEvent.TIMER,this.OnHeadMove,this);
            this.m_pCountTimer.reset();
            this.m_pCountTimer.start();
            this.DrawSelf(color);
        }
        public IsHead(){
            return true;
        }
        public IsAi():boolean{
            return this.m_bAi;
        }
        public GetHitNode(ix:number,iy:number):snakestyle.GBaseSnakeNode{
            if(this.m_nIx==ix && this.m_nIy==iy) return this;
            var pcheck:snakestyle.GBaseSnakeNode;
            pcheck=this.m_pNextNode;
            while(pcheck!=null){
                if(pcheck.m_nIx==ix && pcheck.m_nIy==iy) return pcheck;
                pcheck=pcheck.m_pNextNode;
            }
            return null;
        }
        public SetMoveDir(dir:number){
            //不能调头
            if(Math.abs(this.m_nDir-dir)==2) return;
            this.m_nDir=dir;
        }
        public CheckHitSnake(){
            var nsize:number=this.m_pScence.GetAllBlockNum();
            if(nsize<1) return;
            var szblocks:Array<any>;
            szblocks=this.m_pScence.GetAllBlocks();
            var i:number=0;
            for(i=0;i<nsize;i++){
                if(szblocks[i]==this) continue;
                if (typeof(szblocks[i]) != "object") continue;
                if (!(szblocks[i] instanceof snakestyle.GSnakeHead)) continue;
                var phit:snakestyle.GBaseSnakeNode;
                phit=szblocks[i].GetHitNode(this.m_nIx,this.m_nIy);
                if(phit==null) continue;
                var len1:number=this.GetSnakeLen();
                var len2:number=phit.GetSnakeLen();
                if(phit.IsHead()){
                    if(len1==len2){
                        this.OnNodeBroke();
                        phit.OnNodeBroke();
                    }else{
                        if(len1>len2){
                            phit.OnNodeBroke();
                            this.AddNode(len2);
                        }else{
                            this.OnNodeBroke();
                            phit.AddNode(len1);
                        }
                    }
                }else{
                    phit.OnNodeBroke();
                    this.AddNode(len2);
                }
            }
        }
        public OnHeadMove(){
            if(this.m_bAi){
                if(utils.GetRndNum(100)<50) this.m_nDir++;
            }
            var iprex:number,iprey:number;
            iprex=this.m_nIx;
            iprey=this.m_nIy;
            switch(this.m_nDir){
                case 0:
                    this.m_nIx--;
                    if(this.m_nIx<=0) this.m_nIx=PlayScence.m_nScenceW;
                    break;
                case 1:
                    this.m_nIy--;
                    if(this.m_nIy<=0) this.m_nIy=PlayScence.m_nScenceH;
                    break;
                case 2:
                    this.m_nIx++;
                    if(this.m_nIx>=PlayScence.m_nScenceW) this.m_nIx=0;
                    break;
                default:
                    this.m_nIy++;
                    if(this.m_nIy>=PlayScence.m_nScenceH) this.m_nIy=0;
                    break;
            }
            this.RefreshPos();
            if(this.m_pNextNode!=null){
                this.m_pNextNode.OnMoveTo(iprex,iprey);
            }
            this.CheckHitSnake();
        }
        public OnNodeDie(){
            if(this.parent==null) return;
            this.parent.removeChild(this);
            if(this.IsAi()) return;
            this.m_pScence.GameOver(false);
        }
    }
}
