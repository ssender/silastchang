import ObjInteract from "../base/obj-interact-base.js";
import Spritesheet from "../base/sprsheet.js";
import * as cutscenes from "../base/cutscenes.js";

class ObjItemRunShoes extends ObjInteract {
    aframe = 0;
    aclock = 0;
    state = 1; // 0-disabled, 1-idle, 2-activated
    constructor(ix=0, iy=0) {
        super(ix, iy);
        this.spritesheet = new Spritesheet("images/item/shoes.png", 1, 1);
        this.cutscene = [
            new cutscenes.SetGlobalCE("runshoes", 1),
            new cutscenes.TextCE("You got the RUN SHOES!"),
            new cutscenes.TextCE("Hold down X to move fast!")
        ];
    }

    update(_inputs, _room) {
        switch (this.state)
        {
            case 0:
                break;
            case 1: //idle anim
                break;
            case 2: //collect anim
                break;
        }
        if (_room.globals.runshoes == 1) {
            this.state = 0;
            this.has_collision = false;
        }
    }

    activate(_room){
        if (this.state == 1)
        {
            this.aclock = 0;
            this.aframe = 0;
            this.state = 2;
            this.has_collision = false;
            this.load_cutscene(this.cutscene, _room)
        }
    }

    draw(_context, _cam) {
        switch(this.state){
            case 0:
                break;
            case 1:
                this.spritesheet.draw(_context, this.x - _cam.x, this.y - _cam.y, 0);
                break;
            default:
                break;
        }
        
    }
}

export default ObjItemRunShoes;