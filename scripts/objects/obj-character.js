import Obj from "../base/obj-base.js";
import Spritesheet from "../base/sprsheet.js";

class ObjCharacter extends Obj {
    moving = false;
    moveprogress = 0;
    aframe = 0;
    aclock = 0;
    facing = 3; // 1-up, 2-right, 3-down, 4-left
    constructor(ix=0, iy=0) {
        super(ix, iy);
        this.spritesheet = new Spritesheet("images/mc_spritesheet.png", 4, 5);
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
                if (_objects_in_target_tile.length != 0) {
                    _objects_in_target_tile[0].activate(_room);
                }
                return;
            }
            // initial check of tiles
            if (_inputs.right) {
                this.facing = 2;
                if (_tilemap[this.tilex + 1][this.tiley] < 32) {
                    _targettilex += 1;
                }
            }else if (_inputs.left) {
                this.facing = 4;
                if (_tilemap[this.tilex - 1][this.tiley] < 32) {
                    _targettilex += -1;
                }else{
                    console.log("movement blocked by tile", _tilemap[this.tilex - 1][this.tiley]);
                }
            }else if (_inputs.up) {
                this.facing = 1;
                if (_tilemap[this.tilex][this.tiley - 1] < 32) {
                    _targettiley += -1;
                }
            }else if (_inputs.down) {
                this.facing = 3;
                if (_tilemap[this.tilex][this.tiley + 1] < 32) {
                    _targettiley += 1;
                }
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
            switch (this.facing) {
                case 1:
                    this.y += -1;
                    break;
                case 2:
                    this.x += 1;
                    break;
                case 3:
                    this.y += 1;
                    break;
                case 4:
                    this.x += -1;
                    break;
            }
            this.moveprogress += 1;
            if (this.moveprogress > 16) {
                this.moveprogress = 0;
            }
            this.aclock += 1;
            if (this.aclock >= 6) {
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
        this.spritesheet.draw(_context, this.x - _cam.x, this.y - 3 - _cam.y, (this.facing - 1)*5 + this.aframe);
    }
}

export default ObjCharacter;