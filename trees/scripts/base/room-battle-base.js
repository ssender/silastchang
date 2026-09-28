import room from "../base/room-base.js";
import Spritesheet from "./sprsheet.js";
import ObjBattleChar from "../objects/battle/obj-battle-char.js";
import pattern from "../bullet-patterns/bp-test.js";
import * as b from "../objects/battle/bullet-base.js";

function initiate() {
    this.load_storage();
    for (const _k in this.audio) {
        if (this.audio[_k] == undefined) {continue;}
        var _track = this.acontext.createMediaElementSource(this.audio[_k]);
        _track.connect(this.acontext.destination);
    }
    if (this.audio.bgm != undefined) {
        this.audio.bgm.loop = true;
    }
    this.camera.xo = 64;
    this.camera.fixed = false;
    this.do_y_depth = false;
    this.battle_ui_sprite = new Spritesheet("images/UI/battleui.png", 1, 1);
    this.battle_ui_heart = new Spritesheet("images/UI/battleui_heart.png", 1, 1);
    this.battle_ui_border = new Spritesheet("images/UI/battle-border.png", 1, 1);
}

room.camera.update = function(_room) {
    if (this.follow != undefined) {
        var _del = (this.follow.y - 100 - this.y);
        _del = Math.min(3, Math.max(-3, _del));
        this.y += _del;
    }
}

function draw(_ctx){
    // background
    _ctx.drawImage(this.img_bg, 0, 0);
    // tilemap
    if (this.loaded) {
        // tilemap drawing would happen here but this is a battle room
    } else {
        _ctx.font = "24px serif";
        //_ctx.fillText("Loading...", 80, 80)
        return;
    }
    
    
    // objects
    this.objects.forEach((obj) => obj.draw(_ctx, this.camera));
    // battle overlay
    this.battle_ui_sprite.draw(_ctx, 0, 0, 0);
    if (this.camera.follow.health > 0) {
        for (var _i=0; _i<Math.min(this.camera.follow.health, 5); _i++) {
            this.battle_ui_heart.draw(_ctx, 15 + 8*_i, 114, 0);
        }
    }
    if (this.camera.follow.health > 5) {
        for (var _i=0; _i<Math.min(this.camera.follow.health - 5, 5); _i++) {
            this.battle_ui_heart.draw(_ctx, 15 + 8*_i, 122, 0);
        }
    }
    // frame
    if (this.camera.fixed) {
        this.battle_ui_border.draw(_ctx, 106, 22, 0);
    }
    _ctx.drawImage(this.img_fg, 0, 0);
    

    /* FOR DEBUG PURPOSES
    _ctx.fillText(String(this.camera.x) + ", " + String(this.camera.y), 16, 16);
    _ctx.fillText(String(this.camera.follow.x) + ", " + String(this.camera.follow.y), 16, 32);
    */
}

const battleManager = {
    clock : 0,
    bullet_pattern : undefined,
    burst_index : 0,
    update : function(_inputs, _room) {
        this.clock += 1;
        const _bursts = this.bullet_pattern.bursts;
        const _timers = this.bullet_pattern.timers;
        // check the timer, spawn next burst if the timer is run out
        if (this.clock >= _timers[this.burst_index]) {
            for (const _bullet of _bursts[this.burst_index]) {
                _room.objects.push(new b.BulletInstance(_bullet, _room))
            }
            this.clock = 0;
            this.burst_index += 1;
            if (this.burst_index >= _bursts.length) {this.burst_index = 0}
        }
        // check the end condition, move to next pattern if satisfied
        // (CODE HERE)  
        // destroy any bullets marked for despawn
        for (var _i = _room.objects.length - 1; _i >= 0; _i += -1) {
            const _obj = _room.objects[_i]
            if (_obj.id == "bullet") {
                if (_obj.despawn) {
                    _room.objects.splice(_i, 1);
                }
            }
        }
    },
    draw : function(_context, _cam) {

    }
}

room.initiate = initiate;
room.draw = draw;
room.img_bg.src = "images/UI/battlebg.png";
room.img_fg.src = "images/UI/battleframe.png";

room.objects.push(new ObjBattleChar(96, 100));
room.camera.follow = room.objects[0];

room.objects.push(battleManager);
battleManager.bullet_pattern = pattern;

export default room;