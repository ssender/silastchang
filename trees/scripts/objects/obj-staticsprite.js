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
        if (_cam.looping) {
            const _fcs = _cam.get_draw_coords(_cam.follow);
            if (Math.abs(_dcs.x - _cam.room_width - _fcs.x) < Math.abs(_dcs.x - _fcs.x)) {
                _dcs.x += - _cam.room_width;
            }
            if (Math.abs(_dcs.x + _cam.room_width - _fcs.x) < Math.abs(_dcs.x - _fcs.x)) {
                _dcs.x +=  _cam.room_width;
            }
            if (Math.abs(_dcs.y - _cam.room_height - _fcs.y) < Math.abs(_dcs.y - _fcs.y)) {
                _dcs.y += - _cam.room_height;
            }
            if (Math.abs(_dcs.y + _cam.room_height - _fcs.y) < Math.abs(_dcs.y - _fcs.y)) {
                _dcs.y += _cam.room_height;
            }
        }
        
        this.spritesheet.draw(_context, _dcs.x, _dcs.y, this.frame);
    }
}

export default ObjStaticSprite;