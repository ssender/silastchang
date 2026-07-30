import room from "../base/room-base.js";
import ObjCharacter from "../objects/obj-character.js";
import ObjStaticSprite from "../objects/obj-staticsprite.js";
import ObjInteract from "../base/obj-interact-base.js";
import ObjItemRunShoes from "../objects/obj-item-run-shoes.js";
import Spritesheet from "../base/sprsheet.js";
import * as cs from "../base/cutscenes.js";

room.tilemap = [[32,32,32,32,32,32,32,32,32,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,32,32,32,32,32,32,32,32,32],[32,0,32,32,0,0,0,32,32,32],[32,0,32,32,0,0,0,0,32,32],[32,0,32,0,0,0,0,0,0,0],[32,0,32,32,0,0,0,0,32,32],[32,0,32,32,32,0,0,32,32,32],[32,0,32,32,0,0,0,32,0,32],[32,0,32,0,0,0,0,32,0,32],[32,0,32,32,32,0,0,32,0,32],[32,0,32,32,0,0,32,32,0,32],[32,32,32,32,32,32,32,32,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,32,32,32,32,32,32,32,32,32]];
room.objects.push(new ObjStaticSprite(8, 8, new Spritesheet("images/bg/home-bg.png", 1, 1), 0));
room.objects.push(new ObjCharacter(96, 112));
room.objects.push(new ObjItemRunShoes(80, 112));
room.add_warp("south", 6, 6, "forest.html", 11, 5);

const _wardrobe = [
    new cs.TextCE("Your wardrobe.")
]
room.objects.push(new ObjInteract(64, 48), new ObjInteract(80, 48));
room.objects[3].cutscene = _wardrobe;
room.objects[4].cutscene = _wardrobe;

const _bed = [
    new cs.TextCE("Your bed.")
]
room.objects.push(new ObjInteract(11*16, 48), new ObjInteract(11*16, 64));
room.objects[5].cutscene = _bed;
room.objects[6].cutscene = _bed;

const _book = new ObjInteract(7*16, 48);
_book.cutscene = [
    new cs.TextCE("A book of useful advice for","living in this world."),
    new cs.TextCE("There is currently no ", "advice.")
]
room.objects.push(_book);

room.img_ts.src = "images/ts1.png";
room.camera.follow = room.objects[1];

export default room;