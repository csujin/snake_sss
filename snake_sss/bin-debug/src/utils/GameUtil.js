var utils;
(function (utils) {
    var GameUtil = (function () {
        function GameUtil() {
        }
        /**基于矩形的碰撞检测*/
        GameUtil.hitTest = function (obj1, obj2) {
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        };
        return GameUtil;
    })();
    utils.GameUtil = GameUtil;
    GameUtil.prototype.__class__ = "utils.GameUtil";

    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    utils.createBitmapByName = createBitmapByName;

    /*创建一个 矩形*/
    function createRectangular(_x, _y, _w, _h, _color, _alpha, strokew, strokec) {
        if (typeof _x === "undefined") { _x = 0; }
        if (typeof _y === "undefined") { _y = 0; }
        if (typeof _w === "undefined") { _w = 480; }
        if (typeof _h === "undefined") { _h = 640; }
        if (typeof _color === "undefined") { _color = 0x000000; }
        if (typeof _alpha === "undefined") { _alpha = 1; }
        if (typeof strokew === "undefined") { strokew = 0; }
        if (typeof strokec === "undefined") { strokec = 0; }
        var sprite1 = new egret.Sprite();
        if (strokew != 0 && strokec != 0) {
            sprite1.graphics.lineStyle(strokew, strokec);
        }
        sprite1.graphics.beginFill(_color, _alpha);
        sprite1.graphics.drawRect(_x, _y, _w, _h);
        sprite1.graphics.endFill();
        sprite1.width = _w;
        sprite1.height = _h;
        return sprite1;
    }
    utils.createRectangular = createRectangular;

    /*创建一个 圆角矩形*/
    function createRoundRectangular(_x, _y, _w, _h, _color, _alpha, strokew, strokec, roundw, roundh) {
        if (typeof _x === "undefined") { _x = 0; }
        if (typeof _y === "undefined") { _y = 0; }
        if (typeof _w === "undefined") { _w = 480; }
        if (typeof _h === "undefined") { _h = 640; }
        if (typeof _color === "undefined") { _color = 0x000000; }
        if (typeof _alpha === "undefined") { _alpha = 1; }
        if (typeof strokew === "undefined") { strokew = 0; }
        if (typeof strokec === "undefined") { strokec = 0; }
        if (typeof roundw === "undefined") { roundw = 10; }
        if (typeof roundh === "undefined") { roundh = 10; }
        var sprite1 = new egret.Sprite();
        if (strokew != 0 && strokec != 0) {
            sprite1.graphics.lineStyle(strokew, strokec);
        }
        sprite1.graphics.beginFill(_color, _alpha);
        sprite1.graphics.drawRoundRect(_x, _y, _w, _h, roundw, roundh);
        sprite1.graphics.endFill();
        sprite1.width = _w;
        sprite1.height = _h;
        return sprite1;
    }
    utils.createRoundRectangular = createRoundRectangular;

    /*画一个圆*/
    function createCircle(_x, _y, _r, _alpha, _clolr) {
        if (typeof _x === "undefined") { _x = 0; }
        if (typeof _y === "undefined") { _y = 0; }
        if (typeof _r === "undefined") { _r = 10; }
        if (typeof _alpha === "undefined") { _alpha = 1; }
        if (typeof _clolr === "undefined") { _clolr = 0xffffff; }
        var sprite1 = new egret.Sprite();
        sprite1.graphics.beginFill(_clolr, _alpha);
        sprite1.graphics.drawCircle(_x, _y, _r);
        sprite1.graphics.endFill();

        return sprite1;
    }
    utils.createCircle = createCircle;

    /*
    创建一个文本框：颜色，对齐方式（left,center,right)内容，文字大小，文本宽度（如果有定义则会进行换行）
    描边颜色（0则是无)描边尺寸(0则是无)x y 旋转角度 斜切
    */
    function createTextLabel(_txt, _color, _halgin, _valgin, _size, _width, _height, _strokeColor, _rotaion, _skewX) {
        if (typeof _color === "undefined") { _color = 0x000000; }
        if (typeof _halgin === "undefined") { _halgin = "left"; }
        if (typeof _valgin === "undefined") { _valgin = "top"; }
        if (typeof _size === "undefined") { _size = 14; }
        if (typeof _width === "undefined") { _width = 0; }
        if (typeof _height === "undefined") { _height = 0; }
        if (typeof _strokeColor === "undefined") { _strokeColor = 0; }
        if (typeof _rotaion === "undefined") { _rotaion = 0; }
        if (typeof _skewX === "undefined") { _skewX = 0; }
        var label1 = new egret.TextField();
        label1.text = _txt;
        label1.textColor = _color;
        label1.textAlign = _halgin;
        label1.verticalAlign = _valgin;
        label1.size = _size;
        if (_width != 0) {
            label1.width = _width;
        }
        ;
        if (_height != 0) {
            label1.height = _height;
        }
        ;
        if (_strokeColor != 0) {
            label1.strokeColor = _strokeColor;
            label1.stroke = 1;
        }
        ;
        label1.rotation = _rotaion;
        if (_skewX != 0) {
            label1.skewX = _skewX;
        }
        ;
        return label1;
    }
    utils.createTextLabel = createTextLabel;

    /*返回一个 _s-_e的随即整数
    */
    function GetRndNum(_e) {
        return Math.floor(Math.random() * _e);
    }
    utils.GetRndNum = GetRndNum;

    //返回指定图表中的bitmap元素
    function createBitmap(textures, name, x, y) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        var bitmap = new egret.Bitmap();
        bitmap.texture = textures.getTexture(name);
        bitmap.x = x;
        bitmap.y = y;
        return bitmap;
    }
    utils.createBitmap = createBitmap;

    //返回一个矩形按钮
    function createRectBtn(txt, stage, x, y, w, h) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        if (typeof w === "undefined") { w = 0; }
        if (typeof h === "undefined") { h = 0; }
        if (h == 0)
            h = w / 2;
        var btn = new mygui.GRectBtn(txt, stage, x, y, w, h);
        return btn;
    }
    utils.createRectBtn = createRectBtn;

    //返回一个矩形按钮
    function createCircleBtn(txt, stage, x, y, w) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        if (typeof w === "undefined") { w = 0; }
        var h = w;
        var btn = new mygui.GCircleBtn(txt, stage, x, y, w, h);
        return btn;
    }
    utils.createCircleBtn = createCircleBtn;
})(utils || (utils = {}));
