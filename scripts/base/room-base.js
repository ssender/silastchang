import Spritesheet from "./sprsheet.js";
import CutsceneProcessor from "./cutscene-processor.js";


const room = {
    context : undefined,
    camera : {x:0, y:0, follow:undefined},
    cutscene_handler : new CutsceneProcessor(),
    flags : new Array(64),
    img_bg : new Image(),
    img_fg : new Image(),
    objects : [],
    img_ts : new Spritesheet("images/ts1.png", 8, 8),
    room_width : 1,
    room_height : 1,
    tilemap : [[32,32,32,32,32,32,32,32,32,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,32,32,32,32,32,32,32,32,32]],
    initiate() {
        this.room_height = this.tilemap[0].length * 16;
        this.room_width = this.tilemap.length * 16;
    },
    objects_at_tile(tx, ty) {
        var out = [];
        for (var _i = 0; _i < this.objects.length; _i++) {
            if ((this.objects[_i].tilex === tx) && (this.objects[_i].tiley === ty)) {
                out.push(this.objects[_i])
            }
        }
        return out;
    },
    update(_inputs){
        this.cutscene_handler.update(_inputs, this.flags);
        this.objects.forEach((obj) => obj.update(_inputs, this));

        if (this.camera.follow != undefined) {
            this.camera.x = Math.max(8, Math.min(this.room_width - 264, this.camera.follow.x - 120));
            this.camera.y = Math.max(8, Math.min(this.room_height - 152, this.camera.follow.y - 64));
        }
    },
    draw(_ctx){
        // background
        _ctx.drawImage(this.img_bg, 0, 0);
        // tilemap
        if (this.img_ts.loaded) {
            var _startx = Math.floor(this.camera.x  * 0.0625);
            var _starty = Math.floor(this.camera.y * 0.0625);
            var _ox = this.camera.x % 16;
            var _oy = this.camera.y % 16;
            for (var tx = 0; tx<16 + (_ox*0.0625); tx++) {
                for (var ty = 0; ty < 9 + (_oy*0.0625); ty++) {
                    this.img_ts.draw(_ctx, tx*16 - _ox, ty*16 - _oy, this.tilemap[_startx + tx][_starty + ty]);
                }
            }
        }
        // objects
        this.objects.forEach((obj) => obj.draw(_ctx, this.camera));
        // cutscene overlay
        this.cutscene_handler.draw(_ctx);
        // frame
        _ctx.drawImage(this.img_fg, 0, 0);
    }
};

room.img_bg.src = "images/header-smaller.png";
room.img_fg.src = "images/frame.png";

export default room;