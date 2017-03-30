var msgDiv = document.getElementById("logMsg");
function loadComplete(){
    var btn = document.getElementsByClassName("bt");
    var b = new Array();

    for( var i=1; i<=btn.length; i++ ){
        var ele = document.getElementById("btn"+i);
        b[i] = new object(ele);
        b[i].callFunction(ele);
    }
}

function object(el){
    this.el = el;
}

object.prototype.onDown = function(e){
    var that = this;
    this.el.onmouseover = function(){ 
        that.mouseOvr();
    }
    this.el.onmousemove = function(){
        that.mouseMve();
    }
    this.changeClass("pressed");
    logMesage("Mouse Down");
    this.el.onmouseup = function(){
        that.mouseUp();
    }
    this.el.onclick = function(){
        that.mouseClick();
    }
    this.el.ondblclick = function(){
        that.dblClick();
    }
    this.el.onmouseout = function(){
        that.mouseOut();
    }
}

object.prototype.mouseMve = function(){
    logMesage("Mouse Move");
}
object.prototype.mouseOvr = function(){
    logMesage("Mouse Over");
}
object.prototype.mouseUp = function(){
    this.changeClass("bt");
    logMesage("Mouse Up");
}
object.prototype.mouseClick = function(){
    this.el.onmouseover = null;
    this.el.onmousemove = null;
    this.el.onmouseup = null;
    this.el.ondblclick = null;
    this.el.oncontextmenu = null;
    this.el.onmouseout = null;
    logMesage("Mouse Click");
}
object.prototype.dblClick = function(){
    logMesage("Double Click");
}
object.prototype.mouseOut = function(){
    this.changeClass("bt");
    this.el.onmouseover = null;
    this.el.onmousemove = null;
    this.el.onmouseup = null;
    this.el.ondblclick = null;
    logMesage("Mouse Out");
    this.el.onmouseout = null;
}

object.prototype.changeClass = function(classname){
    this.el.className = classname;
}

object.prototype.onTouchStart = function(){
    logMesage("Touch Started");
    this.changeClass("pressed");
    var that = this;
    this.on_Cancel = function(){ 
        that.onTouchCancel(); 
    };
    this.on_Leave = function(){ 
        that.onTouchLeave(); 
    }
    this.on_Move = function(){
        that.onTouchMove();
    }
    this.on_End = function(){
        that.onTouchEnd();
    }
    this.el.addEventListener("touchcancel", this.on_Cancel, false);
    this.el.addEventListener("touchleave", this.on_Leave, false);
    this.el.addEventListener("touchmove", this.on_Move, false);
    this.el.addEventListener("touchend", this.on_End, false);
}

object.prototype.onTouchEnd = function(){
    this.changeClass("bt");
    this.el.removeEventListener("touchmove", this.on_Move, false);
    logMesage("Touch Ended");
    this.el.removeEventListener("touchend", this.on_End, false);
}

object.prototype.onTouchCancel = function(){
    this.changeClass("bt");
    this.el.removeEventListener("touchmove", this.on_Move, false);
    logMesage("Touch Cancelled");
    this.el.removeEventListener("touchcancel", this.on_Cancel, false);
}

object.prototype.onTouchLeave = function(){
    this.changeClass("bt");
    this.el.removeEventListener("touchmove", this.on_Move, false);
    logMesage("Touch Left");
}

object.prototype.onTouchMove = function(){
    logMesage("Touch Moved");
}

object.prototype.callFunction = function(e){
    /*e.onmousedown = function(){
        e.onmouseover = function(){
            logMesage("Mouse Over");
        }
        e.onmousemove = function(){
            logMesage("Mouse Move");
        }
        e.className = "pressed";
        logMesage("Mouse Down");
        e.onmouseup = function(){
            e.className = "bt";
            logMesage("Mouse Up");
        }
        e.onclick = function(){
            logMesage("Clicked");
            e.onmouseover = null;
            e.onmousemove = null;
            e.onmouseup = null;
            e.ondblclick = null;
            e.oncontextmenu = null;
        }
        e.ondblclick = function(){
            logMsg("Double Click");
        }
        e.onmouseout = function(){
            e.className = "bt";
            e.onmouseover = null;
            e.onmousemove = null;
            e.onmouseup = null;
            e.ondblclick = null;
            e.onmouseout = null;
            logMesage("Mouse Out");
        }
    }*/
    var that = this;
    e.onmousedown = function(e){
        that.onDown(e); // Object
    }
    e.addEventListener("touchstart", function(){ that.onTouchStart(); }, false);
}

function logMesage(msg){
    document.getElementById("log").innerHTML += msg + "<br>";
    msgDiv.scrollTop += msgDiv.scrollHeight;
}

document.getElementById("cl").onclick = function(){
    document.getElementById("log").innerHTML = '';
};