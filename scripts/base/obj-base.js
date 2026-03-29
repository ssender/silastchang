
class Obj {
    x = 0;
    y = 0;
    spritesheet = undefined;
    frame = 0;
    has_collision = false;
    constructor(ix=0, iy=0) {
        this.x = ix;
        this.y = iy;
        this.tilex = Math.round(ix/16);
        this.tiley = Math.round(iy/16);
    }

    update(_inputs, _room) {
        // at the end of the step, update the sprite data to match current sprite frame
    }
    
    draw(_context, _cam) {
        // draw the sprite
        this.spritesheet.draw(_context, this.x - _cam.x, this.y - _cam.y, this.frame);
    }
}

export default Obj;