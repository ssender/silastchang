import Obj from "../base/obj-base.js";
import Spritesheet from "../base/sprsheet.js";

class ObjCharacter extends Obj {
    moving = false;
    moveprogress = 0;
    aframe = 0;
    aclock = 0;
    facing = 3; // 1-up, 2-right, 3-down, 4-left
    hat = 2;
    constructor(ix=0, iy=0) {
        super(ix, iy);
        this.spritesheet = new Spritesheet("images/char/mc_spritesheet.png", 4, 5);
        this.hatssheet = new Spritesheet("images/char/hats_sheet.png", 4, 4);
        this.id = "Character";
    }

    update(_inputs, _room) {
        var _tilemap = _room.tilemap;
        var _targettilex = this.tilex;
        var _targettiley = this.tiley;
        var _objects_in_target_tile = undefined;
        if (_room.cutscene_handler.active) {return;}
        if (this.moveprogress === 0) {
            // do interactions if A button pressed
            if (_inputs.ap) {
                switch (this.facing) {
                    case 1:
                        _targettiley += -1;
                        break;
                    case 2:
                        _targettilex += 1;
                        break;
                    case 3:
                        _targettiley += 1;
                        break;
                    case 4:
                        _targettilex += -1;
                        break;
                }
                _objects_in_target_tile = _room.objects_at_tile(_targettilex, _targettiley);
                for (const _obj of _objects_in_target_tile) {
                    if (_obj.has_interaction) {
                        _objects_in_target_tile[0].activate(_room);
                        break;
                    }
                }
                return;
            }
            // initial check of tiles
            
            if (_inputs.right) {
                this.facing = 2;
                _targettilex += 1;
            }else if (_inputs.left) {
                this.facing = 4;
                _targettilex += -1;
            }else if (_inputs.up) {
                this.facing = 1;
                _targettiley += -1;
            }else if (_inputs.down) {
                this.facing = 3;
                _targettiley += 1;
            }
            if (_room.looping) {
                if (_targettilex >= _room.tilemap_width) {_targettilex += -_room.tilemap_width}
                if (_targettilex < 0) {_targettilex += _room.tilemap_width}
                if (_targettiley >= _room.tilemap_height) {_targettiley += -_room.tilemap_height}
                if (_targettiley < 0) {_targettiley += _room.tilemap_height}
            }
            if (_tilemap[_targettilex][_targettiley] >= 32) {
                _targettilex = this.tilex;
                _targettiley = this.tiley;
                console.log("movement blocked by tile")
            }
            if (_targettilex != this.tilex || _targettiley != this.tiley) {
                // check for collidible objects
                this.moveprogress = 1;
                _objects_in_target_tile = _room.objects_at_tile(_targettilex, _targettiley);
                for (var _i = 0; _i < _objects_in_target_tile.length; _i++) {
                    // cancel movement if there is a collision 
                    if (_objects_in_target_tile[_i].has_collision) {this.moveprogress = 0;}
                    break;
                }
                if (this.moveprogress === 1) {
                    this.tilex = _targettilex;
                    this.tiley = _targettiley;
                }
            }
        }
        
        if (this.moveprogress > 0) {
            var _ds = 1;
            if (_inputs.b && _room.globals["runshoes"] == 1 && this.moveprogress % 2 == 1) {
                var _ds = 2;
            }
            switch (this.facing) {
                case 1:
                    this.y += -_ds;
                    break;
                case 2:
                    this.x += _ds;
                    break;
                case 3:
                    this.y += _ds;
                    break;
                case 4:
                    this.x += -_ds;
                    break;
            }
            this.moveprogress += _ds;
            if (this.moveprogress > 16) {
                this.moveprogress = 0;
                if (_room.looping) {
                this.x = (this.x + _room.room_width)%_room.room_width;
                this.y = (this.y + _room.room_height)%_room.room_height;
                }
                //checks the outside edge room transitions
                if (this.tilex == 0) {
                    for (const _w of _room.warps.west) {
                        if (this.tiley >= _w.lower && this.tiley <= _w.upper) {
                            _room.room_goto(_w.url, _w.sx, _w.sy);
                        }
                    }
                }
                if (this.tilex == _room.tilemap_width - 1) {
                    for (const _w of _room.warps.east) {
                        if (this.tiley >= _w.lower && this.tiley <= _w.upper) {
                            _room.room_goto(_w.url, _w.sx, _w.sy);
                        }
                    }
                }
                if (this.tiley == 0) {
                    for (const _w of _room.warps.north) {
                        if (this.tilex >= _w.lower && this.tilex <= _w.upper) {
                            _room.room_goto(_w.url, _w.sx, _w.sy);
                        }
                    }
                }
                if (this.tiley == _room.tilemap_height - 1) {
                    for (const _w of _room.warps.south) {
                        if (this.tilex >= _w.lower && this.tilex <= _w.upper) {
                            _room.room_goto(_w.url, _w.sx, _w.sy);
                        }
                    }
                }
            }
            this.aclock += _ds;
            if (this.aclock >= 8) {
                this.aframe += 1;
                this.aclock = 0;
                if (this.aframe >= 5) {this.aframe = 1;}
            }
        } else {
            this.aframe = 0;
            this.aclock = 0;
            
        }
        this.frame = (this.facing - 1)*5 + this.aframe;
        super.update(_inputs, _room);
    }

    draw(_context, _cam) {
        var _dcs = _cam.get_draw_coords(this);
        this.spritesheet.draw(_context, _dcs.x, _dcs.y-3, (this.facing - 1)*5 + this.aframe);
        if (this.hat > 0) {
            var _f = (this.hat * 4) - 5 + this.facing;
            this.hatssheet.draw(_context, _dcs.x, _dcs.y - 11 + this.aframe%2 , _f);
        }
    }
}

export default ObjCharacter;