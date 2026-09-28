import ObjInteract from "../base/obj-interact-base.js";


class ObjCharStatic extends ObjInteract {
    aframe = 0;
    aclock = 0;
    state = 1; // 0-disabled, 1-idle, 2-activated
    constructor(ix=0, iy=0) {
        super(ix, iy);
        this.spritesheet = undefined;

        this.cutscene = [
            
        ]
    }

    update(_inputs, _room) {
        switch (this.state)
        {
            case 0:
                break;
            case 1: //idle anim
                this.aclock += 1;
                if (this.aclock >= 30) {this.aframe = 1 - this.aframe; this.aclock = 0;}
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
        var c = _cam.get_draw_coords(this);
        this.spritesheet.draw(_context, c.x, c.y - 3, this.aframe);
    }
}

export default ObjCharStatic