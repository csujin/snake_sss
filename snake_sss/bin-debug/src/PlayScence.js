var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by admin on 14-9-19.
*/
var PlayScence = (function (_super) {
    __extends(PlayScence, _super);
    function PlayScence() {
        _super.call(this);
        this.m_bInit = false;
        this.m_nMakeCount = 0;
        this.m_nCurIDMax = 0;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    PlayScence.prototype.onAddToStage = function () {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        if (this.m_bInit)
            return;
        this.m_bInit = true;
        this.DrawLvUI();
        this.DrawInfor();
        this.RegKeyBoardEvent();
    };
    PlayScence.prototype.SetLinkObj = function (plink) {
        this.m_pLinkObj = plink;
    };
    PlayScence.prototype.DrawLvUI = function () {
        PlayScence.m_nScenceW = Math.floor(this.width / PlayScence.m_nGrideSize);
        PlayScence.m_nScenceH = Math.floor((this.height - 50) / PlayScence.m_nGrideSize);
        this.m_pContainer = new egret.Sprite;
        this.m_pContainer.y = 50;
        this.m_pContainer.width = PlayScence.m_nScenceW * PlayScence.m_nGrideSize;
        this.m_pContainer.height = PlayScence.m_nScenceH * PlayScence.m_nGrideSize;
        this.m_pContainer.graphics.beginFill(0x804422, 1);
        this.m_pContainer.graphics.drawRoundRect(0, 0, this.m_pContainer.width, this.m_pContainer.height, 30, 30);
        this.m_pContainer.graphics.endFill();
        this.addChild(this.m_pContainer);
    };
    PlayScence.prototype.DrawInfor = function () {
        this.m_pCountTimer = new egret.Timer(1000);
        this.m_pLvInfor = utils.createTextLabel("Lv:1", 0xffffff);
        this.m_pLvInfor.x = 60;
        this.m_pLvInfor.y = 10;
        this.addChild(this.m_pLvInfor);
        this.m_pLeftTime = utils.createTextLabel("Time:0", 0xffffff, egret.HorizontalAlign.CENTER, egret.VerticalAlign.TOP, 30, this.width);
        this.m_pLeftTime.y = 10;
        this.addChild(this.m_pLeftTime);
    };
    PlayScence.prototype.StartGame = function () {
        this.m_pLeftTime.text = "Lv:" + (DataManage.m_nCurLevel + 1);
        this.RefresheLeft();
        this.m_pCountTimer.addEventListener(egret.TimerEvent.TIMER, this.RefresheLeft, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.m_pCountTimer.reset();
        this.m_pCountTimer.start();
        this.ResetData();
    };
    PlayScence.prototype.GameOver = function (result) {
        this.m_pCountTimer.stop();
        if (result) {
            DataManage.OnWin();
        } else {
            DataManage.OnLose();
        }
        this.m_pLinkObj.showGameOverLayout();
    };
    PlayScence.prototype.RefresheLeft = function () {
        if (DataManage.m_nCurLeftTime <= 0) {
            this.GameOver(false);
            return;
        }
        DataManage.m_nCurLeftTime--;
        this.m_pLeftTime.text = "Time:" + DataManage.m_nCurLeftTime;
    };
    PlayScence.prototype.GetAllBlocks = function () {
        return this.m_pContainer._children;
    };
    PlayScence.prototype.GetAllBlockNum = function () {
        return this.m_pContainer.numChildren;
    };
    PlayScence.prototype.ResetData = function () {
        this.m_nCurIDMax = 0;
        this.m_nMakeCount = 0;
        this.m_pContainer.removeChildren();
        this.MakeNewSnake(utils.GetRndNum(4), utils.GetRndNum(10) + 5, PlayScence.m_szRndColor[utils.GetRndNum(PlayScence.m_szRndColor.length)], 3, false);
    };
    PlayScence.prototype.gameViewUpdate = function () {
        this.m_nMakeCount++;
        if (this.m_nMakeCount >= utils.GetRndNum(200) + 200) {
            this.m_nMakeCount = 0;
            this.MakeNewSnake(utils.GetRndNum(4), utils.GetRndNum(5) + 2, PlayScence.m_szRndColor[utils.GetRndNum(PlayScence.m_szRndColor.length)], 3);
        }
    };

    //--------------------------------GameBegin-----------------------------------
    PlayScence.prototype.MakeNewSnake = function (dir, len, color, v, bai) {
        if (typeof len === "undefined") { len = 3; }
        if (typeof color === "undefined") { color = 0xffff00; }
        if (typeof v === "undefined") { v = 3; }
        if (typeof bai === "undefined") { bai = true; }
        var sx = 0;
        var sy = 0;
        switch (dir) {
            case 0:
                sx = 0;
                sy = utils.GetRndNum(PlayScence.m_nScenceH);
                break;
            case 1:
                sx = utils.GetRndNum(PlayScence.m_nScenceW);
                sy = 0;
                break;
            case 2:
                sx = PlayScence.m_nScenceW;
                sy = utils.GetRndNum(PlayScence.m_nScenceH);
                break;
            default:
                sx = utils.GetRndNum(PlayScence.m_nScenceW);
                sy = PlayScence.m_nScenceH;
                break;
        }
        var phead;
        phead = new snakestyle.GSnakeHead();
        phead.InitHead(this, this.m_pContainer, this.m_nCurIDMax, sx, sy, dir, len, v, color, bai);
        this.m_pContainer.addChild(phead);
        this.m_nCurIDMax++;
        return phead;
    };
    PlayScence.prototype.OnPlayerMoveDir = function (dir, state) {
        var szblocks;
        var sztotop = [];
        szblocks = this.GetAllBlocks();
        var i;
        var nlen = szblocks.length;

        for (i = 0; i < nlen; i++) {
            if (typeof (szblocks[i]) != "object")
                continue;
            if (!(szblocks[i] instanceof snakestyle.GSnakeHead))
                continue;
            szblocks[i].SetMoveDir(dir);
        }
    };

    //注册键盘事件
    PlayScence.prototype.RegKeyBoardEvent = function () {
        var thisRef = this;
        document.onkeydown = function (evt) {
            if (evt.keyCode == 65 || evt.keyCode == 37 || evt.keyCode == 100) {
                //左
                thisRef.OnPlayerMoveDir(0, true);
            } else if (evt.keyCode == 87 || evt.keyCode == 38 || evt.keyCode == 104) {
                //上
                thisRef.OnPlayerMoveDir(1, true);
            } else if (evt.keyCode == 68 || evt.keyCode == 39 || evt.keyCode == 102) {
                //右
                thisRef.OnPlayerMoveDir(2, true);
            } else if (evt.keyCode == 83 || evt.keyCode == 40 || evt.keyCode == 98) {
                //下
                thisRef.OnPlayerMoveDir(3, true);
            }
        };
        document.onkeyup = function (evt) {
            if (evt.keyCode == 65 || evt.keyCode == 37 || evt.keyCode == 100) {
                //左
                thisRef.OnPlayerMoveDir(0, false);
            } else if (evt.keyCode == 87 || evt.keyCode == 38 || evt.keyCode == 104) {
                //上
                thisRef.OnPlayerMoveDir(1, false);
            } else if (evt.keyCode == 68 || evt.keyCode == 39 || evt.keyCode == 102) {
                //右
                thisRef.OnPlayerMoveDir(2, false);
            } else if (evt.keyCode == 83 || evt.keyCode == 40 || evt.keyCode == 98) {
                //下
                thisRef.OnPlayerMoveDir(3, false);
            }
        };
    };
    PlayScence.m_nScenceW = 20;
    PlayScence.m_nScenceH = 50;
    PlayScence.m_nGrideSize = 20;
    PlayScence.m_szRndColor = [0xffff00, 0xff00ff, 0x00ffff, 0xf00fff, 0xfff00f, 0xf0f00f];
    return PlayScence;
})(egret.Sprite);
PlayScence.prototype.__class__ = "PlayScence";
