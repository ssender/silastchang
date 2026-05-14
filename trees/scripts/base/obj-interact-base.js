import Obj from "./obj-base.js";
import Spritesheet from "./sprsheet.js";
import * as cutscenes from "./cutscenes.js";

class ObjInteract extends Obj {
    aframe = 0;
    aclock = 0;
    state = 1; // 0-disabled, 1-idle, 2-activated
    constructor(ix=0, iy=0) {
        super(ix, iy);
        this.spritesheet = undefined;
        this.has_collision = true;
        this.has_interaction = true;
        this.cutscene = [];
    }

    update(_inputs, _room) {

    }

    activate(_room){
        if (this.state == 1)
        {
            this.load_cutscene(this.cutscene, _room)
        }
    }

    draw(_context, _cam) {
        if (this.state != 0) {
            if (this.spritesheet == undefined) {return;}
            this.spritesheet.draw(_context, this.x - _cam.x, this.y - _cam.y - 2, 0);
        }
        
    }
}

export default ObjInteract