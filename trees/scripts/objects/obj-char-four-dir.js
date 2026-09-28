import ObjInteract from "../base/obj-interact-base.js";


class ObjCharFourDir extends ObjInteract {
    aframe = 0;
    aclock = 0;
    state = 1; // 0-disabled, 1-idle, 2-activated
    facing = 3;
    spritebase = 0;
    xo = 0;
    yo = 0;
    animation = 0;
    constructor(ix=0, iy=0, ssheet=undefined, cutscene=[]) {
        super(ix, iy);
        this.spritesheet = ssheet;

        this.cutscene = cutscene;
    }

    update(_inputs, _room) {

    }

    activate(_room){
        if (this.state == 1)
        {
            this.facing = _room.camera.follow.facing + 2;
            if (this.facing > 4) {this.facing += -4;}
            this.load_cutscene(this.cutscene, _room)
        }
    }

    draw(_context, _cam) {
        var c = _cam.get_draw_coords(this);
        this.spritesheet.draw(_context, c.x+ this.xo, c.y  - 3 + this.yo, this.spritebase + this.facing - 1);
    }
}

export default ObjCharFourDir;