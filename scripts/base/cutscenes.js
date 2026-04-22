import PixelText from "./text.js";
import Spritesheet from "./sprsheet.js";

class CutsceneElement {
    length = 0;
    skippable = false;
    auto = false;
    textframe = new Spritesheet("images/textframe.png", 1, 1);
    constructor() {

    }
    update(_progress, _inputs) {

    }
    draw(_ctx, _progress) {

    }
}

class TextCE extends CutsceneElement {
    constructor(_text, _skippable=false) {
        super();
        this.text = _text;
        this.length = _text.length + 1;
    }

    draw(_ctx, _progress) {
        this.textframe.draw(_ctx, 8, 88, 0);
        PixelText.draw(_ctx, this.text.slice(0, _progress), 21, 98);
    }
}

class WaitCE extends CutsceneElement {
    constructor(_frames) {
        super();
        this.length = _frames;
        this.auto = true;
    }
}

class ChoiceCE extends CutsceneElement {
    constructor(_choices=["yes", "no"], _results=[1, 1]) {
        super();
        this.cursorpos = 0;
        this.length = 0;
        this.auto = false;
    }
}

class CheckFlagCE extends CutsceneElement {
    constructor(_flag, _ifyes, _ifno) {
        this.flag = _flag;
        this.ifyes = _ifyes;
        this.ifno = _ifno;
        this.length = 0;
        this.auto = true;
    }
}

class SetFlagCE extends CutsceneElement {
    constructor(_flag, _val) {
        this.flag = _flag;
        this.val = _val;
        this.length = 0;
        this.auto = true;
    }
}

export {TextCE, WaitCE};