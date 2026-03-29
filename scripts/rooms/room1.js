import room from "../base/room-base.js";
import ObjCharacter from "../objects/obj-character.js";
import ObjItem from "../objects/obj-item.js";

room.tilemap = [[32,32,32,32,32,32,32,32,32,32],[32,0,0,0,16,16,16,0,0,32],[32,0,0,0,0,16,16,16,0,32],[32,0,0,0,0,0,16,0,0,32],[32,0,0,48,56,0,0,0,0,32],[32,0,48,56,0,0,0,48,56,32],[32,48,56,48,56,0,0,0,0,32],[32,0,48,56,0,0,48,56,0,32],[32,48,56,0,8,0,0,0,0,32],[32,0,0,0,8,8,8,0,0,32],[32,48,56,0,0,0,8,0,0,32],[32,0,48,56,0,0,8,0,0,32],[32,48,56,48,56,0,8,0,0,32],[32,0,48,56,0,0,8,0,0,32],[32,0,0,48,56,0,8,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,32,32,32,32,32,32,32,32,32]];
room.objects.push(new ObjCharacter(24, 24), new ObjItem(136, 40))
room.img_bg.src = "images/header-smaller.png";
room.img_fg.src = "images/frame.png";
room.img_ts.src = "images/ts1.png";

export default room;