import ObjInteract from "../base/obj-interact-base.js";
import Spritesheet from "../base/sprsheet.js";
import * as cutscenes from "../base/cutscenes.js";

class ObjItem extends ObjInteract {
    aframe = 0;
    aclock = 0;
    state = 1; // 0-disabled, 1-idle, 2-activated
    constructor(ix=0, iy=0) {
        super(ix, iy);
        this.spritesheet = new Spritesheet("images/item/pretzel-stick.png", 1, 1);

        this.cutscene = [
            new cutscenes.TextCE("It's a pretzel.", "Pick it up?"),
            new cutscenes.ChoiceCE(["Yes", "No"], [2, 100]),
            new cutscenes.SetGlobalCE("haspretzel", 1),
            new cutscenes.SetFlagCE(0, 1),
            new cutscenes.TextCE("You got the PRETZEL."),
            new cutscenes.TextCE("Seems like it tastes", "better than key.")
        ]
    }

    update(_inputs, _room) {
        switch (this.state)
        {
            case 0:
                break;
            case 1: //idle anim
                this.aclock += 1;
                if (this.aclock >= 60) {this.aclock = 0;}
                if (this.aclock < 15) {this.aframe = 0;}
                else if (this.aclock < 30) {this.aframe = 1;}
                else if (this.aclock < 45) {this.aframe = 0;}
                else {this.aframe = -1;}
                if (_room.globals["haspretzel"] == 1) {
                    if (_room.flags[0] == 1) {
                        this.state = 2;
                        this.aframe = 0;
                        this.aclock = 0;
                        this.has_collision = false;
                    } else {
                        this.state = 0;
                        this.has_collision = false;
                    }
                } 
                break;
                
            case 2: //collect anim
                this.aclock += 1;
                if (this.aclock > 30) {this.state = 0;} 
                break;
        }
    }

    activate(_room){
        if (this.state == 1)
        {
            this.load_cutscene(this.cutscene, _room)
        }
    }

    draw(_context, _cam) {
        switch(this.state){
            case 0:
                break;
            case 1:
                this.spritesheet.draw(_context, this.x - _cam.x, this.y - _cam.y + this.aframe - 2, 0);
                break;
            case 2:
                if (this.aclock % 2 === 0) {this.spritesheet.draw(_context, this.x - _cam.x, this.y - _cam.y - 5 - Math.floor(this.aclock * 0.2), 0);}
                break;
        }
        
    }
}

export default ObjItem