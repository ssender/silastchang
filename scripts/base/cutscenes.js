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

export {TextCE, WaitCE, ChoiceCE, CheckFlagCE, SetFlagCE, JumpCE};