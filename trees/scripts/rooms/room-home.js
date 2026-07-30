import room from "../base/room-base.js";
import ObjCharacter from "../objects/obj-character.js";
import ObjStaticSprite from "../objects/obj-staticsprite.js";
import ObjInteract from "../base/obj-interact-base.js";
import Spritesheet from "../base/sprsheet.js";
import * as cs from "../base/cutscenes.js";

room.tilemap = [[32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32],[32,48,56,48,56,48,56,48,56,48,56,48,56,48,56,48,56,48,56,32],[32,56,48,56,0,8,0,16,48,56,48,56,16,17,48,56,48,56,48,32],[32,48,56,0,0,0,8,8,16,16,16,16,16,16,17,48,56,48,56,32],[32,56,17,0,48,56,0,16,9,16,9,16,9,16,0,16,48,56,48,32],[32,48,56,0,0,0,17,0,16,9,16,0,0,0,16,18,0,48,56,32],[32,56,9,0,8,0,0,8,0,0,0,0,48,56,0,16,0,16,48,32],[32,48,56,0,0,18,0,8,0,0,8,0,0,48,56,0,0,8,0,0],[32,56,43,46,46,46,45,0,8,0,0,0,0,8,0,0,8,8,8,0],[32,0,47,18,18,0,40,0,0,0,0,8,8,18,0,8,16,0,0,0],[32,56,47,32,32,0,0,8,0,8,8,0,48,56,0,17,0,16,48,32],[32,0,47,32,32,0,8,0,17,0,0,48,56,48,56,0,16,48,56,32],[32,56,47,32,32,0,16,0,16,0,0,0,48,56,0,16,16,0,48,32],[32,0,47,32,32,16,41,16,16,16,0,8,17,0,0,0,16,48,56,32],[32,56,42,46,46,46,44,16,8,16,48,56,0,0,48,56,48,56,48,32],[32,48,56,48,56,48,56,48,56,48,56,48,56,48,56,48,56,48,56,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32]];
room.objects.push(new ObjStaticSprite(160, 16, new Spritesheet("images/bg/house.png", 1, 1), 0));
room.objects.push(new ObjCharacter(176, 80));
var door = new ObjInteract(176,64);
door.cutscene = [
    new cs.CheckGlobalCE("housekey", 1, 4, 1),
    new cs.TextCE("Your home is locked, and", "you don't have a key."),
    new cs.SetGlobalCE("wantskey", 1),
    new cs.JumpCE(100),
    new cs.TextCE("Your home is locked, and", "you do have a key."),
    new cs.TextCE("Enter your home?"), //5
    new cs.ChoiceCE(["yes", "no"], [7, 100]),
    new cs.WarpCE("home-interior.html", 6, 7)
];
room.objects.push(door);

room.camera.follow = room.objects[1];
room.add_warp("south", 7, 9, "why.html", 8, 1);

export default room;