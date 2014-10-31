module utils
{
    export class GameUtil
    {
        /**基于矩形的碰撞检测*/
        public static hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean
        {
            var rect1:egret.Rectangle = obj1.getBounds();
            var rect2:egret.Rectangle = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        }

    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    export function createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /*创建一个 矩形*/
    export function  createRectangular(_x:number=0,_y:number=0,_w:number=480,_h:number=640,_color:number=0x000000,_alpha:number=1,strokew:number=0,strokec:number=0):egret.Sprite
    {
        var sprite1:egret.Sprite = new egret.Sprite();
        if(strokew!=0 && strokec!=0){
            sprite1.graphics.lineStyle( strokew, strokec );
        }
        sprite1.graphics.beginFill(_color,_alpha);
        sprite1.graphics.drawRect(_x,_y,_w,_h);
        sprite1.graphics.endFill();
        sprite1.width=_w;
        sprite1.height=_h;
        return sprite1;
    }
    /*创建一个 圆角矩形*/
    export function  createRoundRectangular(_x:number=0,_y:number=0,_w:number=480,_h:number=640,_color:number=0x000000,_alpha:number=1,strokew:number=0,strokec:number=0,roundw:number=10,roundh:number=10):egret.Sprite
    {
        var sprite1:egret.Sprite = new egret.Sprite();
        if(strokew!=0 && strokec!=0){
            sprite1.graphics.lineStyle( strokew, strokec );
        }
        sprite1.graphics.beginFill(_color,_alpha);
        sprite1.graphics.drawRoundRect(_x,_y,_w,_h,roundw,roundh);
        sprite1.graphics.endFill();
        sprite1.width=_w;
        sprite1.height=_h;
        return sprite1;
    }
    /*画一个圆*/
    export function  createCircle(_x:number=0,_y:number=0,_r:number=10,_alpha:number=1,_clolr:number=0xffffff):egret.Sprite
    {
        var sprite1:egret.Sprite=new egret.Sprite();
        sprite1.graphics.beginFill(_clolr,_alpha);
        sprite1.graphics.drawCircle(_x,_y,_r);
        sprite1.graphics.endFill();

        return sprite1;
    }
    /*
    创建一个文本框：颜色，对齐方式（left,center,right)内容，文字大小，文本宽度（如果有定义则会进行换行）
    描边颜色（0则是无)描边尺寸(0则是无)x y 旋转角度 斜切
    */
   export function  createTextLabel(_txt:string,_color:number=0x000000,_halgin:string="left",_valgin:string="top",_size:number=14,_width:number=0,_height:number=0,
                                    _strokeColor:number=0,_rotaion:number=0,_skewX:number=0 ):egret.TextField
   {
       var label1:egret.TextField = new egret.TextField();//创建TextField实例
       label1.text=_txt;
       label1.textColor=_color;
       label1.textAlign=_halgin;
       label1.verticalAlign = _valgin;
       label1.size=_size;
       if(_width!=0){label1.width=_width;};
       if(_height!=0){label1.height=_height;};
       if(_strokeColor!=0){label1.strokeColor=_strokeColor;label1.stroke=1;};//描边和描边颜色必须同时存在才进行描边
       label1.rotation=_rotaion;
       if(_skewX!=0){label1.skewX=_skewX;};
       return label1;
   }
    /*返回一个 _s-_e的随即整数
     */
    export function GetRndNum(_e:number):number {
        return Math.floor(Math.random()*_e);
    }
    //返回指定图表中的bitmap元素
    export function  createBitmap(textures:egret.SpriteSheet,name:string,x:number=0,y:number=0):egret.Bitmap
    {
        var bitmap:egret.Bitmap=new egret.Bitmap();
        bitmap.texture=textures.getTexture(name);
        bitmap.x=x;                    bitmap.y=y;
        return bitmap;
    }
    //返回一个矩形按钮
    export function  createRectBtn(txt:string,stage:any,x:number=0,y:number=0,w:number=0,h:number=0):mygui.GRectBtn{
        if(h==0) h=w/2;
        var btn:mygui.GRectBtn=new mygui.GRectBtn(txt,stage,x,y,w,h);
        return btn;
    }
    //返回一个矩形按钮
    export function  createCircleBtn(txt:string,stage:any,x:number=0,y:number=0,w:number=0):mygui.GRectBtn{
        var h:number=w;
        var btn:mygui.GRectBtn=new mygui.GCircleBtn(txt,stage,x,y,w,h);
        return btn;
    }
}