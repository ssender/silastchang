import Obj from "/forest/trees/scripts/base/obj-base.js";
import Spritesheet from "/forest/trees/scripts/base/sprsheet.js";

class ObjBattleChar extends Obj {
    moving = false;
    moveprogress = 0;
    aframe = 0;
    aclock = 0;
    center_x = 12;
    center_y = 16;
    hitbox_radius = 4;
    mana_clock = 0;
    mana = 2;
    iframes = 0;
    manabar_spritesheet = new Spritesheet("images/UI/battleui_manabar.png", 1, 1);

    constructor(ix=0, iy=0) {
        super();
        this.x = ix;
        this.y = iy;
        this.health = 10;
        this.spritesheet = new Spritesheet("images/battle/battlechar.png", 7, 1)
    }

    update(_inputs, _room) {
        var _ms = 2;
        if (_inputs.b) 
        {
            _ms = 1;
            this.mana_clock += 1;
            if (this.mana_clock >= 8) {
                this.mana_clock = 0; 
                if (this.mana < 30) {this.mana += 1;}
            }
        } else {
            this.mana_clock = 0;
        }
        this.aclock += 1;
        var _clockmax = 40;
        this.aframe = 2;
        if (_inputs.right) {this.x += _ms; this.aframe = 3; _clockmax = 20;}
        if (_inputs.left) {this.x += -_ms; this.aframe = 1; _clockmax = 20;}
        if (_inputs.down) {this.y += _ms; _clockmax = 20;}
        if (_inputs.up) {this.y += -_ms; _clockmax = 20;}
        if (_inputs.b) {
            _clockmax = 20;
            if (this.aclock > 10) {
                this.aframe = 4;
            } else {
                this.aframe = 5;
            }
        } else {
            if (this.aclock < 0.5*_clockmax) {
                this.aframe = 0;
            }
        }
        if (this.aclock >= _clockmax) {
            this.aclock = 0;
        }

        

        if (_room.camera.fixed) {
            this.x = Math.min(Math.max(this.x, _room.camera.x + 38), _room.camera.x + 122);
            this.y = Math.min(Math.max(this.y, _room.camera.y + 16), _room.camera.y + 96);
        } else {
            this.x = Math.min(Math.max(this.x, _room.camera.x -8), _room.camera.x + 164);
        }

        // check collisions
        if (this.iframes > 0) {
            this.iframes += -1;
            return;
        }
        for (var _i = _room.objects.length - 1; _i >= 0; _i += -1) {
            const _obj = _room.objects[_i]
            if (_obj.id == "bullet") {
                const _hbox = _obj.hitbox;
                switch (_hbox.type) {
                    case "circle":
                    const _distance = Math.sqrt((this.x + this.center_x - _obj.x - _hbox.x_offset)**2 + (this.y + this.center_y - _obj.y - _hbox.y_offset)**2);
                    if (_distance < this.hitbox_radius + _hbox.radius) {
                        this.health += -1;
                        if (!_obj.persistent) {_obj.despawn = true;}
                        
                        this.iframes = 30;
                    }
                    break;
                }
            }
        }
    }

    draw(_context, _cam) {
        var _dcs = _cam.get_draw_coords(this);
        // character
        if (this.iframes % 2 == 0) {
            this.spritesheet.draw(_context, _dcs.x, _dcs.y, this.aframe);
        }
        // mana bar
        this.manabar_spritesheet.draw(_context, _dcs.x - 2, _dcs.y + 28, 0);
        if (this.mana > 0) {
            _context.fillStyle = "#bfe690"
            _context.fillRect(_dcs.x - 1, _dcs.y + 29, this.mana, 2);
        }
    }
}

export default ObjBattleChar;