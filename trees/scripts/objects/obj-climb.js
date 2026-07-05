import ObjInteract from "../base/obj-interact-base.js";
import Spritesheet from "../base/sprsheet.js";
import * as cutscenes from "../base/cutscenes.js";

class ObjClimb extends ObjInteract {
    aframe = 0;
    aclock = 0;
    state = 1; // 0-disabled, 1-idle, 2-activated
    constructor(ix=0, iy=0, n=1) {
        super(ix, iy);
        this.spritesheet = new Spritesheet("images/chalk.png", 1, 2);
        this.aframe = n-1;

        this.cutscene = [
            new cutscenes.TextCE("A climb. It's sick.")
        ];
        if (n==2) {
            this.cutscene = [new cutscenes.TextCE("A sick lightning bolt.")];
        }
    }

    update(_inputs, _room) {
        switch (this.state)
        {

        }
    }

    activate(_room){
        if (this.state == 1)
        {
            this.load_cutscene(this.cutscene, _room)
        }
    }

    draw(_context, _cam) {
        this.spritesheet.draw(_context, this.x - _cam.x, this.y - _cam.y , this.aframe);
    }
}

export default ObjClimb