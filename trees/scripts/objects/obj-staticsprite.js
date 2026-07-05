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
        this.spritesheet.draw(_context, this.x - _cam.x, this.y - _cam.y, this.frame);
    }
}

export default ObjStaticSprite;