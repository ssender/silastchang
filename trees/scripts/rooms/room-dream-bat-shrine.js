import room from "../base/room-base.js";
import ObjCharacter from "../objects/obj-character.js";
import ObjStaticSprite from "../objects/obj-staticsprite.js";
import ObjShrineGate from "../objects/environment/shrine-gate.js";
import ObjPulsar from "../objects/environment/obj-pulsar.js";
import ObjPickup from "../objects/obj-item-pickup-general.js";
import ObjCharStatic from "../objects/obj-char-static.js";
import ObjInteract from "../base/obj-interact-base.js";
import Spritesheet from "../base/sprsheet.js";  
import * as cs from "../base/cutscenes.js";
room.img_bg.src= "images/bg/header-smaller-darkest.png";
room.img_ts = new Spritesheet("images/tilesets/ts_dark.png", 16, 8);
room.audio.bgm = new Audio("audio/mus/batshrine.ogg");
room.looping = false;
room.open_curtains = true;
room.tilemap = [[32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,49,57,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,52,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,11,11,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,11,9,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,11,11,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,52,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,11,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,11,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,52,32,32,11,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,11,11,11,11,11,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,52,32,32,11,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,11,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,11,11,32,32,32,32],[32,52,32,32,32,52,32,32,32,32,32,32,32,32,32,11,32,32,32,32],[32,32,11,11,11,32,32,32,32,32,32,32,32,32,11,11,32,32,32,32],[32,32,33,11,11,11,11,11,11,11,11,11,11,11,11,11,32,32,32,32],[32,32,11,11,11,32,32,32,32,32,32,11,32,32,11,11,32,32,32,32],[32,52,32,32,32,52,32,32,32,32,32,11,32,32,32,11,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,11,11,32,32,32,32,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32],[32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32]];
room.objects.push(new ObjCharacter(3*16, 15*16));
room.camera.follow = room.objects[0];

room.objects.push(new ObjInteract(3*16, 14*16))
room.objects[1].cutscene = [
    new cs.TextCE("Exit?"),
    new cs.ChoiceCE(["yes", "no"], [2, 100]),
    new cs.CurtainCE(true),
    new cs.WaitCE(15),
    new cs.WarpCE("dream-grid.html", 15, 34)
];

const bat_sprite = new Spritesheet("images/char/glowing_bat_imp.png", 2, 1);

// funny little guys
room.objects.push(new ObjCharStatic(9*16, 13*16));
room.objects.push(new ObjCharStatic(26*16, 10*16));
room.objects.push(new ObjCharStatic(15*16, 14*16));
room.objects.push(new ObjCharStatic(19*16, 14*16));
room.objects.push(new ObjCharStatic(22*16, 2*16));
room.objects[2].cutscene = [
    new cs.TextCE("I don't know what that", "thing is."),
    new cs.TextCE("You can have it.")
];
room.objects[3].cutscene = [
    new cs.TextCE("Did you meet my friends in", "the grid dream?"),
    new cs.TextCE("They will help you with", "this obstacle.")
];
room.objects[4].cutscene = [
    new cs.TextCE("Up there is the great", "statue."),
    new cs.TextCE("We built it as a monument", "to glowing and bats.")
];
room.objects[5].cutscene = [
    new cs.TextCE("We hope this monument helps", "others glow and bat.")
];
room.objects[6].cutscene = [
    new cs.TextCE("My name is Mazes."),
    new cs.TextCE("My friend told me about", "the Cantor Set."),
    new cs.TextCE("I am very confused.")
];
for (var _i = 2; _i < 7; _i++) {
    room.objects[_i].spritesheet = bat_sprite;
}

var spr = new Spritesheet("images/item/supplies_0002.png", 1, 1)
room.objects.push(new ObjPickup(10*16, 14*16, "hasmetal", spr, "MAGIC METAL.", "", 0));
room.objects.push(new ObjShrineGate(23*16, 6*16));

const st = new ObjInteract(17*16, 9*16);
st.cutscene = [
    new cs.TextCE("It's a large statue."),
    new cs.TextCE("It's glowing, and bat.")
]
room.objects.push(st);

const statuesprite = new Spritesheet("images/bg/statuebat.png", 1, 1);
room.objects.push(new ObjStaticSprite(259, 7*16, statuesprite, 0))

const tele = new ObjPulsar(23*16, 2*16);
room.objects.push(tele);
tele.yo = -12;
tele.cutscene = [
    new cs.TextCE("Do you want to visit the", "music room?"),
    new cs.ChoiceCE(["yes", "no"], [2, 100]),
    new cs.CurtainCE(true),
    new cs.WaitCE(15),
    new cs.WarpCE("musicroom.html", 8, 5)
]
room.objects.reverse();


export default room;