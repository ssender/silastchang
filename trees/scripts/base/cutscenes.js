class CutsceneElement {
    length = 0;
    skippable = false;
    auto = false;
    
    type = "null";
    constructor() {

    }
}

class TextCE extends CutsceneElement {
    constructor(_text, _text2="", _skippable=false) {
        super();
        this.type = "Text";
        this.text = _text;
        this.text2 = _text2;
        this.length = _text.length + _text2.length;
    }
}

class WaitCE extends CutsceneElement {
    constructor(_frames) {
        super();
        this.type = "Wait";
        this.length = _frames;
        this.auto = true;
    }
}

class ChoiceCE extends CutsceneElement {
    constructor(_choices=["yes", "no"], _results=[1, 1]) {
        super();
        this.type = "Choice";
        this.choices = _choices;
        this.results= _results;
        this.length = 0;
        this.auto = false;
    }
}

class JumpCE extends CutsceneElement {
    constructor(_jumpto) {
        super();
        this.type = "Jump";
        this.jumpto = _jumpto;
        this.length = 0;
        this.auto = true;
    }
}

class CheckFlagCE extends CutsceneElement {
    constructor(_flag, _comparison=true, _ifyes, _ifno) {
        super();
        this.type = "CheckFlag";
        this.flag = _flag;
        this.comparison = _comparison;
        this.ifyes = _ifyes;
        this.ifno = _ifno;
        this.length = 0;
        this.auto = true;
    }
}

class SetFlagCE extends CutsceneElement {
    constructor(_flag, _val) {
        super();
        this.type = "SetFlag";
        this.flag = _flag;
        this.value = _val;
        this.length = 0;
        this.auto = true;
    }
}

class CheckGlobalCE extends CutsceneElement {
    constructor(_flag, _comparison=true, _ifyes, _ifno) {
        super();
        this.type = "CheckGlobal";
        this.flag = _flag;
        this.comparison = _comparison;
        this.ifyes = _ifyes;
        this.ifno = _ifno;
        this.length = 0;
        this.auto = true;
    }
}

class SetGlobalCE extends CutsceneElement {
    constructor(_flag, _val) {
        super();
        this.type = "SetGlobal";
        this.flag = _flag;
        this.value = _val;
        this.length = 0;
        this.auto = true;
    }
}

class SaveCE extends CutsceneElement {
    constructor() {
        super();
        this.type = "Save";
        this.auto = true;
    }
}

class SpriteCE extends CutsceneElement {
    constructor(_sprite, _x, _y, _f) {
        super();
        this.type = "Sprite";
        this.auto = false;
        this.length = 0;
        this.ix = _x;
        this.iy = _y;
        this.sprite = _sprite;
        this.f = _f;
    }
}

export {TextCE, WaitCE, ChoiceCE, CheckFlagCE, SetFlagCE, JumpCE, SaveCE, SetGlobalCE, CheckGlobalCE, SpriteCE};