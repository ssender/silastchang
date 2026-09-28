import ObjInteract from "../../base/obj-interact-base.js";
import Spritesheet from "../../base/sprsheet.js";
import * as cs from "../../base/cutscenes.js";

class ObjPulsar extends ObjInteract {
    constructor(_ix, _iy) {
        super(_ix, _iy);
        this.cutscene = [
            new cs.TextCE("default")
        ];
        this.spritesheet = new Spritesheet("images/item/pulsar.png", 4, 1);
    }

    update = function(_inputs, _room) {
        this.aclock += 1;
        if (this.aclock > 10) {
            this.aframe += 1;
            this.aclock = 0;
            if (this.aframe >=4) {
                this.aframe = 0;
            }
        }
    }

    draw = function(_ctx, _cam) {
        var c = _cam.get_draw_coords(this);
        this.spritesheet.draw(_ctx, c.x, c.y + this.yo, this.aframe);
    }
}

export default ObjPulsar;