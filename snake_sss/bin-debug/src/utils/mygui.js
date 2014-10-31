var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mygui;
(function (mygui) {
    var GBaseBtn = (function (_super) {
        __extends(GBaseBtn, _super);
        function GBaseBtn(_text, _stage, _x, _y, _w, _h, _c0, _textSize, _textColor, strokew, strokec) {
            if (typeof _text === "undefined") { _text = "Btn"; }
            if (typeof _stage === "undefined") { _stage = null; }
            if (typeof _x === "undefined") { _x = 0; }
            if (typeof _y === "undefined") { _y = 0; }
            if (typeof _w === "undefined") { _w = 100; }
            if (typeof _h === "undefined") { _h = 30; }
            if (typeof _c0 === "undefined") { _c0 = 0x005070; }
            if (typeof _textSize === "undefined") { _textSize = 16; }
            if (typeof _textColor === "undefined") { _textColor = 0xffffff; }
            if (typeof strokew === "undefined") { strokew = 0; }
            if (typeof strokec === "undefined") { strokec = 0; }
            _super.call(this);
            this.m_bTouchDown = false;
            this.x = _x;
            this.y = _y;
            this.m_pStage = _stage;
            this.m_nColor1 = _c0;
            this.m_nStrokeWidth = strokew;
            this.m_nStrokeColor = strokec;
            this.CreateFillObj(_w, _h);
            this.FillColor();
            this.m_pText = utils.createTextLabel(_text, _textColor, egret.HorizontalAlign.CENTER, egret.VerticalAlign.MIDDLE, _textSize);
            this.m_pText.x = -_w / 2;
            this.m_pText.y = -_h / 2;
            this.m_pText.width = _w;
            this.m_pText.height = _h;
            this.addChild(this.m_pText);
            this.Enable();
        }
        GBaseBtn.prototype.CreateFillObj = function (_w, _h) {
            this.m_pFillObj = new egret.Shape();
            this.m_pFillObj.x = -_w / 2;
            this.m_pFillObj.y = -_h / 2;
            this.m_pFillObj.width = _w;
            this.m_pFillObj.height = _h;
            this.addChild(this.m_pFillObj);
        };
        GBaseBtn.prototype.SetLinkFun = function (plink, pfun) {
            this.m_pLinkObj = plink;
            this.m_pFunction = pfun;
        };
        GBaseBtn.prototype.SetStroke = function (w, c) {
            this.m_nStrokeWidth = w;
            this.m_nStrokeColor = c;
            this.FillColor();
        };
        GBaseBtn.prototype.SetTextSize = function (nsize) {
            this.m_pText.size = nsize;
        };
        GBaseBtn.prototype.SetText = function (txt) {
            this.m_pText.text = txt;
        };
        GBaseBtn.prototype.FillColor = function () {
        };
        GBaseBtn.prototype.Enable = function () {
            this.m_pFillObj.touchEnabled = true;
            this.m_pFillObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
            this.m_pFillObj.addEventListener(egret.TouchEvent.TOUCH_OUT, this.OnTouchEnd, this);
            this.m_pFillObj.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnd, this);
        };
        GBaseBtn.prototype.UnEnable = function () {
            this.m_pFillObj.touchEnabled = false;
            this.m_pFillObj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
            this.m_pFillObj.removeEventListener(egret.TouchEvent.TOUCH_OUT, this.OnTouchEnd, this);
            this.m_pFillObj.removeEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnd, this);
        };
        GBaseBtn.prototype.OnClick = function () {
            if (this.m_pLinkObj == null || this.m_pFunction == null)
                return;
            this.m_pLinkObj.call(this.m_pFunction, this.m_pLinkObj);
        };
        GBaseBtn.prototype.OnTouchBegin = function (event) {
            this.Down();
        };
        GBaseBtn.prototype.OnTouchEnd = function (event) {
            this.Up();
        };
        GBaseBtn.prototype.addStageMouseHandlers = function () {
            if (this.m_pStage == null)
                return;
            this.m_pStage.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
            this.m_pStage.stage.addEventListener(egret.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
        };
        GBaseBtn.prototype.removeStageMouseHandlers = function () {
            if (this.m_pStage == null)
                return;
            this.m_pStage.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
            this.m_pStage.stage.removeEventListener(egret.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
        };
        GBaseBtn.prototype.stage_mouseUpHandler = function (event) {
            if (!this.m_bTouchDown)
                return;
            this.Up();
        };
        GBaseBtn.prototype.PlayDown = function () {
            egret.Tween.get(this).to({ scaleX: 0.8, scaleY: 0.8, alpha: 0.5 }, 100);
        };
        GBaseBtn.prototype.PlayUp = function () {
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 300, egret.Ease.elasticOut);
        };
        GBaseBtn.prototype.Down = function () {
            if (this.m_bTouchDown)
                return;
            this.m_bTouchDown = true;
            this.addStageMouseHandlers();
            this.PlayDown();
        };
        GBaseBtn.prototype.Up = function () {
            if (!this.m_bTouchDown)
                return;
            this.m_bTouchDown = false;
            this.removeStageMouseHandlers();
            this.PlayUp();
            this.OnClick();
        };
        return GBaseBtn;
    })(egret.Sprite);
    mygui.GBaseBtn = GBaseBtn;
    GBaseBtn.prototype.__class__ = "mygui.GBaseBtn";
    var GRectBtn = (function (_super) {
        __extends(GRectBtn, _super);
        function GRectBtn() {
            _super.apply(this, arguments);
        }
        GRectBtn.prototype.CreateFillObj = function (_w, _h) {
            this.m_pFillObj = new egret.Shape();
            this.m_pFillObj.x = -_w / 2;
            this.m_pFillObj.y = -_h / 2;
            this.m_pFillObj.width = _w;
            this.m_pFillObj.height = _h;
            this.addChild(this.m_pFillObj);
        };
        GRectBtn.prototype.FillColor = function () {
            this.m_pFillObj.graphics.clear();
            if (this.m_nStrokeWidth != 0 && this.m_nStrokeColor != 0) {
                this.m_pFillObj.graphics.lineStyle(this.m_nStrokeWidth, this.m_nStrokeColor);
            }
            this.m_pFillObj.graphics.beginFill(this.m_nColor1, 1);
            this.m_pFillObj.graphics.drawRoundRect(0, 0, this.m_pFillObj.width, this.m_pFillObj.height, Math.min(this.m_pFillObj.width, this.m_pFillObj.height) / 3, Math.min(this.m_pFillObj.width, this.m_pFillObj.height) / 3);
            this.m_pFillObj.graphics.endFill();
        };
        return GRectBtn;
    })(mygui.GBaseBtn);
    mygui.GRectBtn = GRectBtn;
    GRectBtn.prototype.__class__ = "mygui.GRectBtn";
    var GCircleBtn = (function (_super) {
        __extends(GCircleBtn, _super);
        function GCircleBtn() {
            _super.apply(this, arguments);
        }
        GCircleBtn.prototype.CreateFillObj = function (_w, _h) {
            this.m_pFillObj = new egret.Shape();
            this.m_pFillObj.anchorX = 0.5;
            this.m_pFillObj.anchorY = 0.5;
            this.m_pFillObj.width = _w;
            this.m_pFillObj.height = _h;
            this.addChild(this.m_pFillObj);
        };
        GCircleBtn.prototype.FillColor = function () {
            this.m_pFillObj.graphics.clear();
            if (this.m_nStrokeWidth != 0 && this.m_nStrokeColor != 0) {
                this.m_pFillObj.graphics.lineStyle(this.m_nStrokeWidth, this.m_nStrokeColor);
            }
            this.m_pFillObj.graphics.beginFill(this.m_nColor1, 1);
            this.m_pFillObj.graphics.drawCircle(this.m_pFillObj.width / 2, this.m_pFillObj.width / 2, this.m_pFillObj.width / 2);
            this.m_pFillObj.graphics.endFill();
        };
        return GCircleBtn;
    })(mygui.GBaseBtn);
    mygui.GCircleBtn = GCircleBtn;
    GCircleBtn.prototype.__class__ = "mygui.GCircleBtn";
})(mygui || (mygui = {}));
