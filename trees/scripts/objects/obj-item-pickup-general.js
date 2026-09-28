import ObjInteract from "../base/obj-interact-base.js";
import * as cutscenes from "../base/cutscenes.js";
import Spritesheet from "../base/sprsheet.js";

class ObjPickup extends ObjInteract {
    aframe = 0;
    aclock = 0;
    state = 1; // 0-disabled, 1-idle, 2-activated
    yo = 0;
    constructor(ix=0, iy=0, control_key="", ssheet, display_name="", display_name_line2="", sprite_frame=0) {
        super(ix, iy);
        this.spritesheet = ssheet;
        this.key = control_key;
        this.sprite_frame = sprite_frame;
        this.sparkle_sprite = new Spritesheet("images/item/sparkles.png", 3, 1);

        this.cutscene = [
            new cutscenes.TextCE("It's " + display_name, display_name_line2),
            new cutscenes.TextCE("Pick it up?"),
            new cutscenes.ChoiceCE(["yes", "no"], [3, 100]),
            new cutscenes.SetGlobalCE(control_key, 1),
            new cutscenes.SetFlagCE(0, 1),
            new cutscenes.TextCE("You got " + display_name, display_name_line2),
        ];

    }

    update(_inputs, _room) {
        switch (this.state)
        {
            case 0:
                break;
            case 1: //idle anim
                this.aclock += 1;
                if (this.aclock >= 60) {this.aclock = 0;}
                if (_room.globals[this.key] == 1) {
                    this.state = 0;
                    this.has_collision = false;
                } 
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
                var c = _cam.get_draw_coords(this);
                this.spritesheet.draw(_context, c.x, c.y + this.yo, this.sprite_frame);
                this.sparkle_sprite.draw(_context, c.x, c.y + this.yo, Math.floor(this.aclock/20))
                break;
        }
        
    }
}

export default ObjPickup