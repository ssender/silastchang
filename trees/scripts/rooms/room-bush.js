import room from "../base/room-base.js";
import ObjCharacter from "../objects/obj-character.js";
import ObjInteract from "../base/obj-interact-base.js";
import * as cutscenes from "../base/cutscenes.js";

room.tilemap = [[32,32,32,32,32,32,32,32,32,32],[32,16,16,16,16,16,16,16,16,32],[32,16,16,8,16,16,16,16,16,32],[32,16,8,0,8,16,16,16,16,32],[32,16,16,8,16,16,16,16,16,32],[32,16,16,16,16,16,16,16,16,32],[32,16,16,16,16,16,16,16,16,32],[32,16,16,16,16,16,16,16,16,32],[32,16,16,16,16,16,16,16,16,32],[32,16,16,16,16,16,16,16,16,32],[32,16,16,16,16,16,16,16,16,32],[32,16,16,16,16,16,16,16,16,32],[32,16,16,16,16,16,16,16,16,32],[32,16,16,16,16,16,16,16,16,32],[32,16,16,16,16,16,16,16,16,32],[32,16,16,16,16,16,16,16,16,32],[32,32,32,32,32,32,32,32,32,32]];
room.objects.push(new ObjCharacter(48, 48));
room.objects.push(new ObjInteract(144, 64));
room.objects[1].cutscene = [
    new cutscenes.TextCE("You found the special bush", "with collision!"),
    new cutscenes.TextCE("It doesn't really do", "anything..."),
    new cutscenes.TextCE("...other than activate this", "textbox, I guess."),
    new cutscenes.TextCE("Anyway, about this room..."),
    new cutscenes.TextCE("It was originally a test ", "for the scrolling camera."),
    new cutscenes.TextCE("The bushes just made for", "a convinient way to..."),
    new cutscenes.TextCE("...visualize the grid ", "while debugging."),
    new cutscenes.TextCE("Now, this room has no", "scrolling camera..."),
    new cutscenes.TextCE("but it still has bushes!")
]
room.img_bg.src = "images/header-smaller.png";
room.img_fg.src = "images/frame.png";
room.img_ts.src = "images/ts1.png";
room.camera.follow = room.objects[0];

export default room;