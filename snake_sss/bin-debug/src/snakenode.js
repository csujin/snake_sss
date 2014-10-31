var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by admin on 14-9-26.
*/
var snakestyle;
(function (snakestyle) {
    var GBaseSnakeNode = (function (_super) {
        __extends(GBaseSnakeNode, _super);
        function GBaseSnakeNode() {
            _super.apply(this, arguments);
        }
        GBaseSnakeNode.prototype.InitBoday = function (id, ix, iy, color) {
            this.m_nSnakeId = id;
            this.m_nIx = ix;
            this.m_nIy = iy;
            this.m_nColor = color;
            this.DrawSelf(color);
        };
        GBaseSnakeNode.prototype.IsHead = function () {
            return false;
        };
        GBaseSnakeNode.prototype.DrawSelf = function (color) {
            this.graphics.clear();
            this.graphics.beginFill(color, 1);
            this.graphics.drawRect(0, 0, PlayScence.m_nGrideSize, PlayScence.m_nGrideSize);
            this.graphics.endFill();
        };
        GBaseSnakeNode.prototype.OnMoveTo = function (itx, ity) {
            var iprex = 0;
            var iprey = 0;
            iprex = this.m_nIx;
            iprey = this.m_nIy;
            this.m_nIx = itx;
            this.m_nIy = ity;
            this.RefreshPos();
            if (this.m_pNextNode != null) {
                this.m_pNextNode.OnMoveTo(iprex, iprey);
            }
        };
        GBaseSnakeNode.prototype.GetSnakeLen = function () {
            var count = 1;
            var pcheck;
            pcheck = this.m_pNextNode;
            while (pcheck != null) {
                pcheck = pcheck.m_pNextNode;
                count++;
            }
            return count;
        };
        GBaseSnakeNode.prototype.AddNode = function (num) {
            return;
            if (this.parent == null)
                return;
            var plast;
            plast = this.GetEndNode();
            for (var i = 0; i < num; i++) {
                var p = new snakestyle.GBaseSnakeNode();
                p.InitBoday(this.m_nSnakeId, plast.m_nIx, plast.m_nIy, this.m_nColor);
                p.m_pPreNode = plast;
                plast.m_pNextNode = p;
                plast = p;
                this.parent.addChild(p);
            }
        };
        GBaseSnakeNode.prototype.GetEndNode = function () {
            if (this.m_pNextNode == null)
                return this;
            var pend = this.m_pNextNode;
            var pcheck;
            pcheck = this.m_pNextNode;
            while (pcheck != null) {
                pend = pcheck;
                pcheck = pcheck.m_pNextNode;
            }
            return pend;
        };
        GBaseSnakeNode.prototype.RefreshPos = function () {
            this.x = this.m_nIx * PlayScence.m_nGrideSize;
            this.y = this.m_nIy * PlayScence.m_nGrideSize;
        };
        GBaseSnakeNode.prototype.OnNodeBroke = function () {
            this.OnNodeDie();
            if (this.m_pNextNode == null)
                return;
            this.m_pNextNode.OnNodeBroke();
        };
        GBaseSnakeNode.prototype.OnNodeDie = function () {
            if (this.parent == null)
                return;
            if (this.m_pPreNode != null) {
                this.m_pPreNode.m_pNextNode = null;
            }
            this.parent.removeChild(this);
        };
        return GBaseSnakeNode;
    })(egret.Sprite);
    snakestyle.GBaseSnakeNode = GBaseSnakeNode;
    GBaseSnakeNode.prototype.__class__ = "snakestyle.GBaseSnakeNode";
    var GSnakeHead = (function (_super) {
        __extends(GSnakeHead, _super);
        function GSnakeHead() {
            _super.apply(this, arguments);
        }
        GSnakeHead.prototype.InitHead = function (pscence, pcontainer, id, ix, iy, dir, len, v, color, bai) {
            this.m_pScence = pscence;
            this.m_nSnakeId = id;
            this.m_nIx = ix;
            this.m_nIy = iy;
            this.m_nDir = dir;
            this.m_nSpeed = v;
            this.m_nColor = color;
            this.m_bAi = bai;
            this.m_pPreNode = null;
            var plast;
            plast = this;
            for (var i = 0; i < len; i++) {
                var p = new snakestyle.GBaseSnakeNode();
                p.InitBoday(this.m_nSnakeId, ix, iy, color);
                p.m_pPreNode = plast;
                plast.m_pNextNode = p;
                plast = p;
                pcontainer.addChild(p);
            }
            this.m_pCountTimer = new egret.Timer(100);
            this.m_pCountTimer.addEventListener(egret.TimerEvent.TIMER, this.OnHeadMove, this);
            this.m_pCountTimer.reset();
            this.m_pCountTimer.start();
            this.DrawSelf(color);
        };
        GSnakeHead.prototype.IsHead = function () {
            return true;
        };
        GSnakeHead.prototype.IsAi = function () {
            return this.m_bAi;
        };
        GSnakeHead.prototype.GetHitNode = function (ix, iy) {
            if (this.m_nIx == ix && this.m_nIy == iy)
                return this;
            var pcheck;
            pcheck = this.m_pNextNode;
            while (pcheck != null) {
                if (pcheck.m_nIx == ix && pcheck.m_nIy == iy)
                    return pcheck;
                pcheck = pcheck.m_pNextNode;
            }
            return null;
        };
        GSnakeHead.prototype.SetMoveDir = function (dir) {
            //不能调头
            if (Math.abs(this.m_nDir - dir) == 2)
                return;
            this.m_nDir = dir;
        };
        GSnakeHead.prototype.CheckHitSnake = function () {
            var nsize = this.m_pScence.GetAllBlockNum();
            if (nsize < 1)
                return;
            var szblocks;
            szblocks = this.m_pScence.GetAllBlocks();
            var i = 0;
            for (i = 0; i < nsize; i++) {
                if (szblocks[i] == this)
                    continue;
                if (typeof (szblocks[i]) != "object")
                    continue;
                if (!(szblocks[i] instanceof snakestyle.GSnakeHead))
                    continue;
                var phit;
                phit = szblocks[i].GetHitNode(this.m_nIx, this.m_nIy);
                if (phit == null)
                    continue;
                var len1 = this.GetSnakeLen();
                var len2 = phit.GetSnakeLen();
                if (phit.IsHead()) {
                    if (len1 == len2) {
                        this.OnNodeBroke();
                        phit.OnNodeBroke();
                    } else {
                        if (len1 > len2) {
                            phit.OnNodeBroke();
                            this.AddNode(len2);
                        } else {
                            this.OnNodeBroke();
                            phit.AddNode(len1);
                        }
                    }
                } else {
                    phit.OnNodeBroke();
                    this.AddNode(len2);
                }
            }
        };
        GSnakeHead.prototype.OnHeadMove = function () {
            if (this.m_bAi) {
                if (utils.GetRndNum(100) < 50)
                    this.m_nDir++;
            }
            var iprex, iprey;
            iprex = this.m_nIx;
            iprey = this.m_nIy;
            switch (this.m_nDir) {
                case 0:
                    this.m_nIx--;
                    if (this.m_nIx <= 0)
                        this.m_nIx = PlayScence.m_nScenceW;
                    break;
                case 1:
                    this.m_nIy--;
                    if (this.m_nIy <= 0)
                        this.m_nIy = PlayScence.m_nScenceH;
                    break;
                case 2:
                    this.m_nIx++;
                    if (this.m_nIx >= PlayScence.m_nScenceW)
                        this.m_nIx = 0;
                    break;
                default:
                    this.m_nIy++;
                    if (this.m_nIy >= PlayScence.m_nScenceH)
                        this.m_nIy = 0;
                    break;
            }
            this.RefreshPos();
            if (this.m_pNextNode != null) {
                this.m_pNextNode.OnMoveTo(iprex, iprey);
            }
            this.CheckHitSnake();
        };
        GSnakeHead.prototype.OnNodeDie = function () {
            if (this.parent == null)
                return;
            this.parent.removeChild(this);
            if (this.IsAi())
                return;
            this.m_pScence.GameOver(false);
        };
        return GSnakeHead;
    })(snakestyle.GBaseSnakeNode);
    snakestyle.GSnakeHead = GSnakeHead;
    GSnakeHead.prototype.__class__ = "snakestyle.GSnakeHead";
})(snakestyle || (snakestyle = {}));
