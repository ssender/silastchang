import Spritesheet from "./sprsheet.js";
import CutsceneProcessor from "./cutscene-processor.js";
import * as cs from "./cutscenes.js";

const room = {
    loaded : false,
    context : undefined,
    dt : 0,
    acontext : new AudioContext(),
    objects : [],
    do_y_depth : true,
    audio : {
        "bgm" : undefined,
        "confirm" : new Audio("audio/sfx/confirm.wav"),
        "blip" : new Audio("audio/sfx/blip.wav")
    },
    camera : {x:0, y:0, follow:undefined, looping : false, room_width : 0, room_height : 0, xo:0, yo:0,
        get_draw_coords : function(_obj) {
            var _out = {x : this.xo +_obj.x - this.x, y : this.yo + _obj.y - this.y};
            if (this.looping) {
                _out.x = this.xo + (_out.x + this.room_width + 8)%this.room_width - 8;
                _out.y = this.yo + (_out.y + this.room_height)%this.room_height;
            }
            return _out;
        },
        update : function(_room) {
            if (this.follow != undefined) {
                if (this.looping) {
                    this.x = this.follow.x - 120;
                    this.y = this.follow.y - 72;
                    if (this.x < 0) {this.x += _room.room_width;}
                    if (this.y < 0) {this.y += _room.room_height;}
                } else {
                    this.x = Math.max(8, Math.min(_room.room_width - 264, this.follow.x - 120));
                    this.y = Math.max(8, Math.min(_room.room_height - 152, this.follow.y - 72));
                }
                
            }
        }
    },
    cutscene_handler : new CutsceneProcessor(),
    globals : {
        "hat" : 0, 
        "housekey" : 0, "wantskey" : 0, "haspretzel" : 0,
        "runshoes" : 0,
        "slept" : 0,
        "sx" : -1, "sy" : -1, "sf" : 3,
        "hasmetal" : 0, "hasfabric" : 0, "hasribbon" : 0, "angelquest" : 0,
        "unlockedshrinegate" : 0
    },
    flags : new Array(64),
    img_bg : new Image(),
    img_fg : new Image(),
    img_ts : new Spritesheet("images/tilesets/ts1.png", 8, 8),
    looping : false,
    open_curtains : false,
    room_width : 1,
    room_height : 1,
    tilemap : [[32,32,32,32,32,32,32,32,32,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,32,32,32,32,32,32,32,32,32]],
    warps : {// these have form {lower : int, upper : int, url : string, sx : int, sy : int}
        north : [],
        south : [],
        east : [],
        west : []
    },
    load_storage() {
        for (const _field in this.globals) {
            if (localStorage.getItem(_field) == undefined) {
                 localStorage.setItem(_field, this.globals[_field]);
            } else {
                this.globals[_field] = localStorage.getItem(_field);
            }
        }
        
    },
    save_storage() {
        for (const _field in this.globals) {
            localStorage.setItem(_field, this.globals[_field]);
        }
        this.camera.follow.hat = this.globals.hat;
    },
    reset_storage() {
        localStorage.clear();
        this.load_storage();
    },
    initiate() {
        this.room_height = this.tilemap[0].length * 16;
        this.room_width = this.tilemap.length * 16;
        this.camera.room_height = this.room_height;
        this.camera.room_width = this.room_width;
        this.tilemap_height = this.tilemap[0].length;
        this.tilemap_width = this.tilemap.length;
        this.cutscene_handler.room = this;
        this.camera.looping = this.looping;
        this.load_storage();
        this.camera.follow.hat = this.globals.hat;
        var _sx = localStorage.getItem("sx");
        var _sy = localStorage.getItem("sy");
        var _sf = localStorage.getItem("sf");
        if (_sx > -1) {
            this.camera.follow.x = _sx*16;
            this.camera.follow.y = _sy*16;
            this.camera.follow.tilex = _sx*1;
            this.camera.follow.tiley = _sy*1;
            this.camera.follow.facing = _sf*1;
            localStorage.setItem("sx", -1);
            localStorage.setItem("sy", -1);
        }
        for (const _k in this.audio) {
            if (this.audio[_k] == undefined) {continue;}
            var _track = this.acontext.createMediaElementSource(this.audio[_k]);
            _track.connect(this.acontext.destination);
        }
        if (this.audio.bgm != undefined) {
            this.audio.bgm.loop = true;
        }
        if (this.open_curtains) {
            this.cutscene_handler.cutscene = [
                new cs.CurtainCE(false)
            ]
            this.cutscene_handler.active = true;
        }
    },
    objects_at_tile(tx, ty) {
        if (this.looping) {
            tx = (tx + this.tilemap_width)%this.tilemap_width;
            ty = (ty + this.tilemap_height)%this.tilemap_height;
        }
        var out = [];
        for (var _i = 0; _i < this.objects.length; _i++) {
            if ((this.objects[_i].tilex === tx) && (this.objects[_i].tiley === ty)) {
                out.push(this.objects[_i])
            }
        }
        return out;
    },
    update(_inputs){
        if (!this.loaded) {
            this.loaded = true;
            if (!this.img_ts.loaded){
                this.loaded = false; 
                return;
            }
            this.objects.forEach((obj) => {
                if (obj.spritesheet == undefined){} 
                else if (!obj.spritesheet.loaded) {
                    this.loaded = false;
                }
            });
            for (const _k in this.audio) {
                if (this.audio[_k] == undefined) {continue;}
                if (this.audio[_k].readyState != HTMLMediaElement.HAVE_ENOUGH_DATA) {
                    this.loaded = false;
                }
            }

            if (!this.loaded){
                return;
            } else {
                if (this.audio["bgm"] != undefined) {
                    this.play_sound("bgm");
                }
            }

            
        }
        this.cutscene_handler.update(_inputs, this.flags);
        this.objects.forEach((obj) => obj.update(_inputs, this));
        if (this.do_y_depth) {
            this.objects.sort((a,b) => (a.y  + a.foot - b.y - b.foot))
        }
        this.camera.update(this);
    },
    draw(_ctx){
        // background
        _ctx.drawImage(this.img_bg, 0, 0);
        // tilemap
        if (this.loaded) {
            // find the top-left tile to draw
            var _startx = Math.floor(this.camera.x  * 0.0625);
            var _starty = Math.floor(this.camera.y * 0.0625);
            // for looping
            var _changex = 0;
            var _changey = 0;
            // offset tiles for camera movement
            var _ox = this.camera.x % 16;
            var _oy = this.camera.y % 16;
            // draw tiles
            for (var tx = 0; tx<16 + (_ox*0.0625); tx++) {
                if ((_startx + tx + _changex) >= this.tilemap_width) {
                    _changex += -this.tilemap_width;
                }
                _changey = 0;
                for (var ty = 0; ty < 9 + (_oy*0.0625); ty++) {
                    if ((_starty + ty + _changey) >= this.tilemap_height) {
                        _changey += -this.tilemap_height;
                    }
                    this.img_ts.draw(_ctx, 
                        tx*16 - _ox, 
                        ty*16 - _oy, 
                        this.tilemap[_startx + tx + _changex][_starty + ty + _changey]);
                }
            }
        } else {
            _ctx.font = "24px serif";
            //_ctx.fillText("Loading...", 80, 80)
            return;
        }
        // objects
        this.objects.forEach((obj) => obj.draw(_ctx, this.camera));
        // cutscene overlay
        this.cutscene_handler.draw(_ctx);
        // frame
        _ctx.drawImage(this.img_fg, 0, 0);

        /* FOR DEBUG PURPOSES
        _ctx.fillText(String(this.camera.x) + ", " + String(this.camera.y), 16, 16);
        _ctx.fillText(String(this.camera.follow.x) + ", " + String(this.camera.follow.y), 16, 32);
        */
    },
    get_object(id="") {
        for (const _obj of this.objects) {
            if (_obj.id === id) {
                return _obj;
            }
        }
        return undefined;
    },
    add_warp(_direction="", _lower=0, _upper=0, _url="", _sx="", _sy="") {
        var _out = {lower:_lower, upper:_upper, url:_url, sx:_sx, sy:_sy}
        this.warps[_direction].push(_out)
    },
    room_goto(_url="", _sx=0, _sy=0) {
        localStorage.setItem("sx", _sx);
        localStorage.setItem("sy", _sy);
        localStorage.setItem("sf", this.camera.follow.facing);
        window.location.assign(_url);
    },
    play_sound(_sound="", _reset=true) {
        var _audioelement = this.audio[_sound];
        if (_audioelement != undefined) {
            if (_audioelement.readyState == HTMLMediaElement.HAVE_ENOUGH_DATA) {
                if (_audioelement.currentTime > 0) {
                    if (_reset) {
                        _audioelement.currentTime = 0;
                    } else {
                    }
                }
                _audioelement.play();
            }
        }
    },
    pause_sound(_sound="") {
        var _audioelement = this.audio[_sound];
        if (_audioelement != undefined) {
            if (_audioelement.readyState == HTMLMediaElement.HAVE_ENOUGH_DATA) {
                _audioelement.pause();
            }
        }
    }
};

room.img_bg.src = "images/UI/header-smaller.png";
room.img_fg.src = "images/UI/frame.png";


export default room;