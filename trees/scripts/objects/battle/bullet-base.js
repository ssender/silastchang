/*
bulletData: creates a bulletData object containing info about a bullet.
bulletInstance: 
    Creates a bullet instance from bullet data. 
    Bullet data is an object of the form
    {
        x_init: number,
        y_init: number,
        vel_x_init: number,
        vel_y_init: number,
        x_relative: bool,
        y_relative: bool,
        persistent : bool,
        initial_delay: number,
        modulate: function(_t), 
        min_lifetime: number,
        spritesheet : Spritesheet,
        hitbox : {
            type : "circle" or "line"
            <if circle>
            radius : number,
            x_offset : number,
            y_offset : number,
            <if line>
            x1: number,
            x2: number,
            y1: number,
            y2: number,
            width : number
        }
bulletPattern: creates a pattern object of the form
    {
        camera_type : "fixed" or "free"
        camera_pos : -100 (difference of cam.y and follow.y for free, absolute position for fixed)
        keyframes : [number1, number 2, ...],
        bursts : [[bullet1_1, bullet1_2, ...], ...]
        endtrigger : {
            type : "time" or "position" or "default",
            target : number,
            next_pattern : integer
        }
    }
}
*/
class BulletData {
    data_type = "base";
    x = 0; y = 0; vel_x = 0; vel_y = 0; x_relative = false; y_relative = false;
    delay = 0;
    min_lifetime = 0;
    spritesheet = undefined;
    persistent = false;
    modulate = function(_t) {
        
    }
    hitbox = {}
    constructor(_ix, _iy, _x_rel, _y_rel, _hitbox, _sprsheet) {
        this.x = _ix;
        this.y = _iy;
        this.x_relative = _x_rel;
        this.y_relative = _y_rel;
        this.spritesheet = _sprsheet;
        if (_hitbox== "circle") {
            this.hitbox.type = "circle";
            this.hitbox.radius = 3;
            this.hitbox.x_offset = 3;
            this.hitbox.y_offset = 2;
        } else if (_hitbox == "line") {
            this.hitbox.type = "line";
            this.hitbox.x1 = 0;
            this.hitbox.y1 = 0;
            this.hitbox.x2 = 10;
            this.hitbox.y2 = 0;
        } else {
            this.hitbox = _hitbox;
        }
    }
}

class InheritedBulletData {
    data_type = "child";
    constructor(_parent, _overrides) {
        this.parent = _parent;
        this.overrides = _overrides;
    }
}

class BulletInstance {
    x = 0;
    y = 0;
    vel_x = 0;
    vel_y = 0;
    acc = {x:0, y:0};
    min_lifetime = 30;
    delay = 0;
    age = 0;
    id = "bullet";
    spritesheet = undefined;
    despawn = false;
    hitbox = {
    }
    constructor(_data, _room) {
        this.load(_data, _room)
        if (this.x_relative) {this.x += _room.camera.x;}
        if (this.y_relative) {this.y += _room.camera.y;}
    }

    load(_data, _room, _overrides={}) {
        if (_data.data_type == "base") {
            for (const _k in _data) {
                if (_k != "hitbox") {
                    this[_k] = _data[_k]
                } else {
                    for (const _m in _data.hitbox) {
                        this.hitbox[_m] = _data.hitbox[_m];
                    }
                }
            }
        } else if (_data.data_type = "child") {
            const _ov = _data.overrides;
            _data = _data.parent;
            this.load(_data, _room, _ov)
        } 
        for (const _k in _overrides) {
            if (_k != "hitbox") {
                this[_k] = _overrides[_k]
            } else {
                for (const _m in _overrides.hitbox) {
                    this.hitbox[_m] = _overrides.hitbox[_m];
                }
            }
        }

        
    }

    update(_inputs, _room) {
        if (this.delay > 0) {
            this.delay += -1;
            return;
        }
        this.modulate(this.age);
        this.x += this.vel_x;
        this.y += this.vel_y;
        this.vel_x += this.acc.x;
        this.vel_y += this.acc.y;
        this.age += 1;
        if (this.age < this.min_lifetime) {return;}
        if (this.y < _room.camera.y - 64 || this.y > _room.camera.y + 208 || this.x < _room.camera.x - 64 || this.x > _room.camera.x + 256) {
            this.despawn = true;
        }


    }

    modulate(_t) {

    }

    draw(_context, _cam) {
        var _dcs = _cam.get_draw_coords(this);
        this.spritesheet.draw(_context, _dcs.x, _dcs.y, 0);
    }
}

export {BulletData, BulletInstance, InheritedBulletData};