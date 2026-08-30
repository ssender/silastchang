class CutsceneElement {
    length = 0;
    skippable = false;
    auto = false;
    
    type = "null";
    constructor() {

    }
}

// TextCE: displays text in a text box. _text and _text2 give two lines; skippable determines whether pressing B fast-forwards the text
// PTextCE: displays text with a face portrait, indexed by a number. index corresponds to the spritesheet assigned to the cutscene processor
// WaitCE: pauses cutscene progression for the specified number of frames before continuing
// ChoiceCE: allows conditional progression based on a choice in a dialogue box
// WaitChoiceCE: allows conditional progression based on whether a wait is skipped or not (second if skipped, first if not)
// WarpCE: send to another room specified by the url, spawning at the specified tilemap coordinates
// JumpCE: sends the cutscene processor to a particular step in the cutscene
// CheckFlagCE, CheckGlobalCE: checks a flag or global against a comparison, conditionally sending to other parts of the cutscene
// SetFlagCE, SetGlobalCE: sets a flag or a global variable
// SaveCE: saves the global variables to local storage
// SpriteCE: displays a sprite on the screen, until the player presses A or B to continue
// CurtainCE: closes (true) or opens (false) curtains
// PlaySoundCE: plays a sound from the room's library and waits the designated amount of frames

class TextCE extends CutsceneElement {
    constructor(_text, _text2="", _skippable=false) {
        super();
        this.type = "Text";
        this.text = _text;
        this.text2 = _text2;
        this.length = _text.length + _text2.length;
        this.skippable = true;
    }
}

class PTextCE extends CutsceneElement {
    constructor(_portrait = 0, _text="", _text2="", _skippable=false) {
        super();
        this.portrait = _portrait;
        this.type = "PText";
        this.text = _text;
        this.text2 = _text2;
        this.length = _text.length + _text2.length;
        this.skippable = true;
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

class WaitSecondsCE extends CutsceneElement {
    constructor(_seconds) {
        super();
        this.type = "WaitSeconds";
        this.length = 10;
        this.lengthtime = _seconds;
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

class WaitChoiceCE extends CutsceneElement {
    constructor(_frames, _results=[1, 1]) {
        super();
        this.type = "WaitChoice";
        this.results= _results;
        this.length = _frames;
        this.auto = true;
        this.skippable = true;
    }
}

class WarpCE extends CutsceneElement {
    constructor(_url="", _sx=0, _sy=0) {
        super();
        this.type = "Warp";
        this.length = 0;
        this.auto = true;
        this.url = _url;
        this.sx = _sx;
        this.sy = _sy;
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

class CurtainCE extends CutsceneElement {
    constructor(_close) {
        super();
        this.type = "Curtain"
        this.length = 15;
        this.auto = true;
        this.close = _close;
    }
}

class AudioCE extends CutsceneElement {
    constructor(_audiokey, _wait=0) {
        super();
        this.type = "Audio"
        this.length = _wait;
        this.auto = true;
        this.audiokey = _audiokey;
    }
}

export {TextCE, PTextCE, WaitCE, ChoiceCE, CheckFlagCE, SetFlagCE, JumpCE, SaveCE, SetGlobalCE, CheckGlobalCE, SpriteCE, WaitChoiceCE, WarpCE, CurtainCE, AudioCE, WaitSecondsCE};