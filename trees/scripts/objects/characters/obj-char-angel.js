import ObjCharFourDir from "../../objects/obj-char-four-dir.js"
import Spritesheet from "../../base/sprsheet.js"
import * as cs from "../../base/cutscenes.js"





const angel_cs = [
    new cs.CheckGlobalCE("angelquest", 0, 2, 1),
    new cs.CheckGlobalCE("angelquest", 10, 9, 40),
    new cs.AnimCE("angel", 1),
    new cs.PTextCE(0, "Woah, a person!"),
    new cs.PTextCE(0, "You're the DREAMER, ", "aren't you?"),
    new cs.PTextCE(0, "I'm ANGEL. The ANGEL of", "good dreams."),
    new cs.PTextCE(0, "And, in any good dream, ", "you should be able to fly!"),
    new cs.PTextCE(0, "Because flying is fun. ", "And cool. And awesome."),
    new cs.AnimCE("angel", 0),
    new cs.PTextCE(0, "Don't you want to fly?"),
    new cs.ChoiceCE(["yes", "no"], [11, 30]),
    new cs.AudioCE("bgm", 0, false, false),
    new cs.PTextCE(0, "Well then, let's go!"),
    new cs.AnimCE("angel", 3),
    new cs.WaitCE(180),
    new cs.PTextCE(0, "..."),
    new cs.PTextCE(0, "Oh. You can't just grow", "wings like I can, huh?"),
    new cs.PTextCE(0, "Well, I can help you fly ", "if you can find some stuff."),
    new cs.PTextCE(0, "To help you fly, I'll ", "need FABRIC, RIBBON, and..."),
    new cs.PTextCE(0, "MAGIC METAL!"),
    new cs.PTextCE(0, "You should be able to ", "find stuff walking around."),
    new cs.SetGlobalCE("angelquest", 1),
    new cs.AudioCE("bgm", 0, true, false),
    new cs.JumpCE(1000),
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    new cs.PTextCE(0, "Oh, well, uh..."),
    new cs.PTextCE(0, "Forget I said anything,", "I guess?"), 
    new cs.SetGlobalCE("angelquest", 10),
    new cs.JumpCE(1000),
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    new cs.CheckGlobalCE("hasfabric", 1, 41, 43),
    new cs.CheckGlobalCE("hasribbon", 1, 42, 43),
    new cs.CheckGlobalCE("hasmetal", 1, 80, 43),
    new cs.PTextCE(0, "Hi again! Do you need a", "reminder of what we need?"),
    new cs.ChoiceCE(["yes", "no"], [45, 70]),
    new cs.PTextCE(0, "To help you fly, I'll ", "need FABRIC, RIBBON, and..."),
    new cs.PTextCE(0, "MAGIC METAL!"),
    new cs.CheckGlobalCE("hasfabric", 1, 48, 50),
    new cs.PTextCE(0, "We have FABRIC!"),
    new cs.JumpCE(51),
    new cs.PTextCE(0, "We still need FABRIC."),
    new cs.CheckGlobalCE("hasribbon", 1, 52, 54),
    new cs.PTextCE(0, "We have RIBBON!"),
    new cs.JumpCE(55),
    new cs.PTextCE(0, "We still need RIBBON."),
    new cs.CheckGlobalCE("hasmetal", 1, 56, 58),
    new cs.PTextCE(0, "We have MAGIC METAL!"),
    new cs.JumpCE(59),
    new cs.PTextCE(0, "We still need MAGIC", "METAL."),
    new cs.JumpCE(1000),
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    new cs.PTextCE(0, "No? Just wanted to talk", "to me, then?"),
    new cs.AnimCE("angel", 1),
    new cs.PTextCE(0, "That's fun!"),
    new cs.AnimCE("angel", 0),
    new cs.JumpCE(1000),
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    new cs.CheckGlobalCE("angelquest", 2, 90, 81),
    new cs.PTextCE(0, "Looks like we have", "everything we need..."),
    new cs.AnimCE("angel", 1),
    new cs.PTextCE(0, "...to get you off the", "ground!"),
    new cs.AnimCE("angel", 0),
    new cs.PTextCE(0, "I'm going to need some", "time to prepare, though."),
    new cs.PTextCE(0, "Check back sometime", "later!"),
    new cs.SetGlobalCE("angelquest", 2),
    new cs.JumpCE(1000),
    undefined,
    new cs.PTextCE(0, "Not long enough yet!"),
    new cs.PTextCE(0, "Making a flying tool", "is serious business!"),
    new cs.PTextCE(0, "If I mess up, you might", "fall..."),
    new cs.PTextCE(0, "(To be honest, it might", "take me a month, or more.)"),
    new cs.PTextCE(0, "But, you should check", "on me every now and then."),
    new cs.PTextCE(0, "This world is always", "changing..."),
    new cs.PTextCE(0, "...and you never know", "what you'll find!")
]

class ObjCharAngel extends ObjCharFourDir {
    constructor(ix=0, iy=0) {
        super(ix, iy, new Spritesheet("images/char/char_angel.png", 2, 4), angel_cs);
        this.sprite2 = new Spritesheet("images/char/angel_grows_wings.png", 11, 1);
        this.id = "angel";
    }

    update(_inputs, _room) {
        var _aq = _room.globals["angelquest"]
        if (_aq > 0 && _aq < 10) {
            this.spritebase = 4;
        }
        switch (this.animation) {
            case 0:
                this.aclock = 0;
                this.xo = 0;
                this.yo = 0;
            break;

            case 1:
                this.aclock += 1;
                if (this.aclock <= 10) {
                    this.yo = -5 + Math.abs(this.aclock - 5);
                } else if (this.aclock <= 16) {
                    this.yo = -3 + Math.abs(this.aclock - 13);
                } else {
                    this.yo = 0;
                    if (this.aclock > 30) {this.aclock = 0;}
                }
            break;

            case 2:
                this.aclock += 1;
                if (this.aclock < 15) {
                    this.xo = -1 + 1 * (this.aclock % 2);
                } else {
                    this.xo = 0;
                    if (this.aclock > 30) {this.aclock = 0;}
                }
            break;

            case 3:
                this.aclock += 1;
                this.spritebase = 4;
                var timings = [20, 3, 3, 30, 3, 3, 30, 3, 3, 3, 3];
                var _t = this.aclock;
                for (var _i=0; _i < 11; _i++) {
                    if (_t< timings[_i]) {
                        this.aframe = _i;
                        break;
                    } else {
                        _t += - timings[_i]
                    }
                }
                if (this.aclock < 5) {
                    this.yo = 0;
                    if (this.aclock == 2) {
                        _room.play_sound("angelwings", true);
                    }
                } else if (this.aclock < 15) {
                    this.yo = - (this.aclock - 5)
                } else if (this.aclock < 92) {
                    this.yo = -10;
                } else if (this.aclock < 102) {
                    this.yo = this.aclock - 102;
                } else {
                    this.yo = 0;
                }

                if (this.aclock > 140) {this.animation = 0; }
            break;
        }
    }

    draw(_context, _cam) {
        var c = _cam.get_draw_coords(this);
        if (this.animation == 3) {
            this.sprite2.draw(_context, c.x + this.xo - 16, c.y - 19 + this.yo, this.aframe);
            return;
        }
        this.spritesheet.draw(_context, c.x+ this.xo, c.y  - 3 + this.yo, this.spritebase + this.facing - 1);
    }
}


export default ObjCharAngel;