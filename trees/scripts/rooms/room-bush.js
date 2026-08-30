import room from "../base/room-base.js";
import ObjCharacter from "../objects/obj-character.js";
import Spritesheet from "../base/sprsheet.js";
import ObjInteract from "../base/obj-interact-base.js";
import ObjCharStatic from "../objects/obj-char-static.js";
import * as cs from "../base/cutscenes.js";

room.tilemap = [[48,48,56,48,56,48,56,48,56,48],[32,56,48,56,48,56,48,56,48,56],[48,56,16,16,16,16,16,48,56,56],[32,48,56,16,8,16,16,16,48,56],[48,56,16,8,0,8,16,48,56,56],[32,48,56,16,8,16,16,16,48,56],[48,56,16,16,16,16,16,48,56,56],[0,8,16,16,16,16,16,16,48,56],[0,8,16,16,16,16,16,48,56,56],[0,8,16,16,16,16,16,16,48,56],[48,56,16,16,16,16,16,48,56,56],[32,48,56,16,16,16,16,16,48,56],[48,56,16,16,16,16,8,48,56,56],[32,48,56,16,16,8,0,8,48,56],[48,56,16,16,16,16,8,48,56,56],[32,56,48,56,48,56,48,56,48,56],[48,48,56,48,56,48,56,48,56,48]];
room.objects.push(new ObjCharacter(64, 64));
room.objects.push(new ObjInteract(144, 64));
room.objects[1].cutscene = [
    new cs.TextCE("You found the special bush", "with collision!"),
    new cs.TextCE("It doesn't really do", "anything..."),
    new cs.TextCE("...other than activate this", "textbox, I guess."),
    new cs.TextCE("Anyway, about this room..."),
    new cs.TextCE("It was originally a test ", "for the scrolling camera."),
    new cs.TextCE("The bushes just made for", "a convinient way to..."),
    new cs.TextCE("...visualize the grid ", "while debugging."),
    new cs.TextCE("Now, this room has no", "scrolling camera..."),
    new cs.TextCE("but it still has bushes!")
]
room.objects.push(new ObjCharStatic(208, 96));
room.objects[2].spritesheet = new Spritesheet("./images/char/forg.png", 1, 2);
room.objects[2].cutscene = [
    new cs.CheckGlobalCE("housekey", 1, 1, 3),
    new cs.PTextCE(0, "Thanks for the snack!", "It tastes better than key!"),
    new cs.JumpCE(100),
    new cs.CheckGlobalCE("wantskey", 1, 4, 17),
    new cs.PTextCE(0, "What? You want your key", "back?"), 
    new cs.PTextCE(0, "I was going to eat it."),//5
    new cs.PTextCE(0, "Maybe if you could find", "a pretzel that tastes..."),
    new cs.PTextCE(0, "...better than key, I", "could give it to you."),
    new cs.CheckGlobalCE("haspretzel", 1, 9, 100), 
    new cs.TextCE("(You gave the pretzel to", "TALKING FROG.)"),
    new cs.PTextCE(0, "Thanks! This definitely", "tastes better than key."), //10
    new cs.TextCE("(In return, the KEY was ", "given.)"),
    new cs.TextCE("(KEY was added to your", "KEY ITEMS.)"),
    new cs.SetGlobalCE("housekey", 1),
    new cs.SetGlobalCE("wantskey", 0),
    new cs.SetGlobalCE("haspretzel", 0), //15
    new cs.JumpCE(100),
    new cs.PTextCE(0, "Oh boy! I can't wait", "to eat this yummy..."), 
    new cs.PTextCE(0, "...delicous, scrumptious ", "KEY ITEM!")
];

room.camera.follow = room.objects[0];
room.add_warp("north", 7, 9, "forest.html", 8, 18)

export default room;