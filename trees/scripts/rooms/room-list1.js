import room from "../base/room-base.js";
import ObjCharacter from "../objects/obj-character.js";
import Spritesheet from "../base/sprsheet.js";
import ObjInteract from "../base/obj-interact-base.js";
import ObjCharStatic from "../objects/obj-char-static.js";
import * as cs from "../base/cutscenes.js";

room.tilemap = [[32,32,32,32,32,32,32,32,32,32],[32,56,18,36,48,56,48,56,8,32],[32,48,56,36,0,48,56,48,56,32],[32,56,0,36,48,56,48,56,0,32],[32,48,56,36,18,48,56,48,56,32],[32,0,38,37,48,56,48,56,48,32],[32,56,36,48,56,0,0,48,56,32],[32,0,36,0,10,0,8,0,48,32],[32,56,36,9,10,0,0,48,56,32],[32,0,36,0,10,0,0,8,48,32],[32,56,36,48,56,0,0,48,56,32],[32,8,34,35,48,56,48,56,48,32],[32,48,56,36,0,48,56,48,56,32],[32,56,17,36,48,56,48,56,18,32],[32,48,56,36,17,48,56,48,56,32],[32,56,0,36,48,56,48,56,9,32],[32,32,32,32,32,32,32,32,32,32]]																;
room.objects.push(new ObjCharacter(128, 96));
room.objects.push(new ObjCharStatic(8*16, 48));
room.objects[1].spritesheet = new Spritesheet("./images/char/dog.png", 2, 1);
room.objects[1].cutscene = [
    new cs.PTextCE(1, "Writing in general is", "hard."),
    new cs.CheckGlobalCE("slept", 1, 100, 2),
    new cs.PTextCE(1, "You know, when you're", "feeling uninspired,"),
    new cs.PTextCE(1, "...going to SLEEP and", "starting fresh helps."),
    new cs.PTextCE(1, "Also, inspiration could", "come in your dreams...")
];
room.objects.push(new ObjInteract(9*16, 48));
room.objects[2].spritesheet = new Spritesheet("./images/item/papers.png", 1, 1);
room.objects[2].cutscene = [
    new cs.TextCE("(The pages are blank.)")
];


room.camera.follow = room.objects[0];
room.objects.reverse();

room.add_warp("north", 7, 9, "forest.html", 8, 18)

export default room;