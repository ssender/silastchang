import PixelText from "./text.js";
import Spritesheet from "./sprsheet.js";

class CutsceneElement {
    length = 0;
    skippable = false;
    auto = false;
    constructor() {

    }
    update(_progress) {

    }
    draw(_ctx, _progress) {

    }
}

class TextCE extends CutsceneElement {
    textframe = new Spritesheet("images/textframe.png", 1, 1)
    constructor(_text, _skippable=false) {
        super();
        this.text = _text;
        this.length = _text.length + 1;
    }

    draw(_ctx, _progress) {
        this.textframe.draw(_ctx, 8, 88, 0);
        PixelText.draw(_ctx, this.text.slice(0, _progress-1), 21, 98);
    }
}

class WaitCE extends CutsceneElement {
    constructor(_frames) {
        super();
        this.length = _frames;
        this.auto = true;
    }
}

export {TextCE, WaitCE};