import room from "../base/room-base.js";
import ObjCharacter from "../objects/obj-character.js";
import Spritesheet from "../base/sprsheet.js";
import ObjInteract from "../base/obj-interact-base.js";
import ObjCharStatic from "../objects/obj-char-static.js";
import * as cs from "../base/cutscenes.js";

room.tilemap = [[32,32,32,32,32,32,32,32,32,32],[32,16,48,56,34,35,48,56,48,32],[48,56,0,8,0,34,35,48,56,32],[32,48,56,16,8,0,36,16,48,56],[48,56,48,56,0,0,36,48,56,32],[32,48,56,16,0,8,36,0,48,56],[48,56,16,16,8,0,36,48,56,32],[0,48,56,8,16,0,36,18,48,56],[48,56,0,0,48,56,36,0,16,32],[0,48,56,8,0,16,36,16,48,56],[48,56,0,0,8,0,36,0,16,32],[32,48,56,16,0,0,34,35,48,56],[48,56,48,56,0,0,18,36,0,32],[32,48,56,0,8,0,0,36,48,56],[48,56,16,48,56,0,0,36,0,32],[32,8,48,56,48,56,18,36,0,32],[32,32,32,32,32,32,32,32,32,32]];
room.objects.push(new ObjCharacter(64, 80));
room.objects.push(new ObjCharStatic(13*16, 96));
room.objects[1].spritesheet = new Spritesheet("./images/char/dog.png", 2, 1);
room.objects[1].cutscene = [
    new cs.PTextCE(1, "Writing poetry is hard.")
];
room.objects.push(new ObjInteract(14*16, 96));
room.objects[2].spritesheet = new Spritesheet("./images/item/papers.png", 1, 1);
room.objects[2].cutscene = [
    new cs.TextCE("POEM"),
    new cs.TextCE("Am I a dog, with round ", "black nose?"),
    new cs.TextCE("Or a human, surprised by ", "those"),
    new cs.TextCE("strange ambiguities that", "plague"),
    new cs.TextCE("the medium of pixel art,", "so vague!")
];


room.camera.follow = room.objects[0];
room.add_warp("north", 7, 9, "forest.html", 8, 18)

export default room;