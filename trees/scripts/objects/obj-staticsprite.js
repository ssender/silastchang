import Obj from "../base/obj-base.js";
import Spritesheet from "../base/sprsheet.js";

class ObjStaticSprite extends Obj {
    constructor(ix, iy, _spritesheet, _frame) {
        super(ix, iy);
        this.spritesheet = _spritesheet;
        this.frame = _frame;
    }

    draw(_context, _cam) {
        // draw the sprite
        const _dcs = _cam.get_draw_coords(this);
        this.spritesheet.draw(_context, _dcs.x, _dcs.y, this.frame);
    }
}

export default ObjStaticSprite;