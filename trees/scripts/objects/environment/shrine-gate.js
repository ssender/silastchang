import ObjInteract from "../../base/obj-interact-base.js";
import Spritesheet from "../../base/sprsheet.js";
import * as cs from "../../base/cutscenes.js";

class ObjShrineGate extends ObjInteract {
    constructor(_ix, _iy) {
        super(_ix, _iy);
        this.cutscene = [
            new cs.CheckGlobalCE("unlockedshrinegate", 1, 5, 1),
            new cs.TextCE("A gate blocks your path."),
            new cs.TextCE("Something controls it,", "outside this world."),
            new cs.TextCE("Seems the configuration", "is incorrect right now."),
            new cs.JumpCE(1000),
            
            new cs.TextCE("The gate was unlocked!")
        ]
        this.grid = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.checkboxes = [
        ]
        this.foot = 32;
        this.spritesheet = new Spritesheet("images/bg/shrinegate.png", 2, 1);
        var table = document.querySelector("tbody");
        var current_row = table.children[0];
        for (var _row = 0; _row < 8; _row++) {
            var a = [];
            var current_row = table.children[_row];
            for (var _col = 0; _col < 8; _col++) {
                var cell = current_row.children[_col];
                if (_row==0 && _col==4) {a.push(undefined); continue;}
                if (_row==5 && _col==2) {a.push(undefined); continue;}
                a.push(cell.children[0]);
            }
            this.checkboxes.push(a);
        }
    }

    update = function(_inputs, _room) {
        if (this.state == 0) {return;}
        for (var _row = 0; _row < 8; _row++) {
            for (var _col = 0; _col < 8; _col++) {
                const cell = this.checkboxes[_row][_col];
                if (cell == undefined) {continue;}
                if (cell.checked) {
                    this.grid[_row][_col] = 1;
                } else {
                    this.grid[_row][_col] = 0;
                }
            }
        }
        if (_room.globals["unlockedshrinegate"]==1) {
            this.state = 0;
            this.has_collision = false;
        }
    }

    activate = function(_room){
        if (this.state == 1)
        {
            var unlock = true;
            for (var _row = 0; _row < 8; _row++) {
                for (var _col = 0; _col < 8; _col++) {
                    const cell = this.checkboxes[_row][_col];
                    if (cell == undefined) {continue;}
                    if ((_row==1 && _col==3) || (_row==4 && _col==4) || (_row==3 && _col==2) || (_row==3 && _col==7) || (_row==7 && _col==5)) {
                        if (!cell.checked) {
                            unlock = false;
                        }
                    } else {
                        if (cell.checked) {
                            unlock = true;
                        }
                    }
                    if (!unlock) {
                        break;
                    }
                }
            }
            if (unlock) {
                _room.globals["unlockedshrinegate"] = 1;
                this.state = 0;
                this.has_collision = false;
                _room.play_sound("confirm");
                _room.save_storage();
            }
            this.load_cutscene(this.cutscene, _room)
        }
    }

    draw = function(_ctx, _cam) {
        var c = _cam.get_draw_coords(this);

        if (this.state == 1) {
            this.spritesheet.draw(_ctx, c.x-16, c.y-16, 0);
            _ctx.fillStyle = "#bfe690"
            for (var _y = 0; _y < 8; _y++) {
                for (var _x = 0; _x < 8; _x++) {
                    if (this.grid[_y][_x] == 1) {
                        _ctx.fillRect(c.x + _x*2, c.y -5 + _y*2, 2, 2)
                    }
                }
            }
        } else {
            this.spritesheet.draw(_ctx, c.x-16, c.y-16, 1);
        }
        
    }
}

export default ObjShrineGate;