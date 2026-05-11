import ObjInteract from "../base/obj-interact-base.js";
import Spritesheet from "../base/sprsheet.js";
import * as cutscenes from "../base/cutscenes.js";

class ObjItemHat extends ObjInteract {
    aframe = 0;
    aclock = 0;
    state = 1; // 0-disabled, 1-idle, 2-activated
    constructor(ix=0, iy=0, _hatindex=1) {
        super(ix, iy);
        this.spritesheet = new Spritesheet("images/hatsstrip.png", 1, 4);
        this.hatindex = _hatindex
        this.cutscene = [
            new cutscenes.CheckGlobalCE("hat", _hatindex, 1, 7), // 0
            new cutscenes.TextCE("There is no hat to be worn", "here."),
            undefined,
            new cutscenes.ChoiceCE(["yes", "no"], [4, 100]),
            new cutscenes.SetGlobalCE("hat", 0),
            new cutscenes.SaveCE(), //5
            new cutscenes.JumpCE(100),
            undefined,
            new cutscenes.ChoiceCE(["yes", "no"], [9, 100]),
            new cutscenes.SetGlobalCE("hat", _hatindex),
            new cutscenes.SaveCE() //10
        ];

        switch(_hatindex) {
            case 1:
                this.cutscene[2] = new cutscenes.TextCE("Will you take off the ", "COMICALLY LARGE BUCKET HAT?");
                this.cutscene[7] = new cutscenes.TextCE("Will you wear the COMICALLY", "LARGE BUCKET HAT?");
                break;
            case 3:
                this.cutscene[2] = new cutscenes.TextCE("Will you take off the PARTY ", "HAT?");
                this.cutscene[7] = new cutscenes.TextCE("Will you wear the PARTY", "HAT?");
                break;
            case 4:
                this.cutscene[2] = new cutscenes.TextCE("Will you take off the COOL ", "CAP?");
                this.cutscene[7] = new cutscenes.TextCE("Will you wear the COOL CAP?", "");
                break;
            case 2:
                this.cutscene[2] = new cutscenes.TextCE("Will you take off the CAT ", "EARS?");
                this.cutscene[7] = new cutscenes.TextCE("Will you wear the CAT EARS?", "");
                break;
        }
    }

    update(_inputs, _room) {
        if (_room.globals.hat == this.hatindex) {
            this.state = 0;
        } else {
            this.state = 1;
        }
    }

    activate(_room){
        if (true)
        {
            this.load_cutscene(this.cutscene, _room)
        }
    }

    draw(_context, _cam) {
        switch(this.state){
            case 0:
                break;
            case 1:
                this.spritesheet.draw(_context, this.x - _cam.x, this.y - _cam.y + this.aframe - 12, this.hatindex-1);
                break;
            default:
                break;
        }
        
    }
}

export default ObjItemHat;