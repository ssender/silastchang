import room from "../base/room-base.js";
import ObjCharacter from "../objects/obj-character.js";
import ObjPulsar from "../objects/environment/obj-pulsar.js";
import Spritesheet from "../base/sprsheet.js";  
import * as cs from "../base/cutscenes.js";
room.img_bg.src= "images/bg/header-smaller-music-room.png";
room.img_ts = new Spritesheet("images/tilesets/ts_dark.png", 16, 8);
room.looping = false;
room.open_curtains = true;
room.tilemap = [[32,32,32,32,32,32,32,32,32,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,32,32,32,0,32],[32,0,0,0,0,32,11,32,0,32],[32,0,0,32,32,32,11,32,0,32],[32,0,0,32,33,11,11,32,0,32],[32,0,0,32,32,32,11,32,0,32],[32,0,0,0,0,32,11,32,0,32],[32,0,0,0,0,32,32,32,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,32,32,32,32,32,32,32,32,32]];


room.objects.push(new ObjCharacter(8*16, 5*16));
room.camera.follow = room.objects[0];

const tele = new ObjPulsar(8*16, 4*16);
room.objects.push(tele);
tele.yo = -12;
tele.cutscene = [
    new cs.TextCE("Return?"),
    new cs.ChoiceCE(["yes", "no"], [2, 100]),
    new cs.CurtainCE(true),
    new cs.WaitCE(15),
    new cs.WarpCE("dream-bat-shrine.html", 23, 3)
]
export default room;