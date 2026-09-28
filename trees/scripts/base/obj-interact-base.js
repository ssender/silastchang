import Obj from "./obj-base.js";

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
        this.yo = -2;
        this.foot = 16;
        this.floaty = false;
    }

    update(_inputs, _room) {
        if (this.floaty) {
            this.aclock += 1;
            if (this.aclock > 20) {
                this.aframe = 1- this.aframe;
                this.aclock = 0;
            }
        }
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
            this.spritesheet.draw(_context, this.x - _cam.x, this.y - _cam.y + this.yo + this.aframe, this.aframe % this.spritesheet.nrows);
        }
        
    }
}

export default ObjInteract