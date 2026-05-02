import room from "../base/room-base.js";
import ObjCharacter from "../objects/obj-character.js";
import ObjItemHat from "../objects/obj-item-hat.js";

room.tilemap = [[32,32,32,32,32,32,32,32,32,32],[32,48,56,0,8,8,0,0,16,32],[32,56,48,56,0,8,0,16,16,32],[32,48,56,0,0,0,18,0,16,32],[32,56,48,56,10,10,0,0,16,32],[32,48,56,0,33,10,0,0,16,32],[32,56,48,56,10,10,9,0,0,32],[32,48,56,0,33,10,0,0,9,32],[32,56,48,56,10,10,0,0,0,32],[32,48,56,0,33,10,0,9,0,32],[32,56,48,56,10,10,0,0,0,32],[32,48,56,0,33,10,0,0,17,32],[32,56,48,56,10,10,16,0,16,32],[32,48,56,0,0,0,0,16,16,32],[32,56,48,56,17,0,16,0,48,32],[32,48,56,0,0,8,0,48,56,32],[32,32,32,32,32,32,32,32,32,32]];
room.objects.push(new ObjCharacter(32, 80));
room.objects.push(new ObjItemHat(80, 64, 1));
room.objects.push(new ObjItemHat(112, 64, 3));
room.objects.push(new ObjItemHat(144, 64, 4));
room.objects.push(new ObjItemHat(176, 64, 2));
room.img_bg.src = "images/header-smaller.png";
room.img_fg.src = "images/frame.png";
room.img_ts.src = "images/ts1.png";
room.camera.follow = room.objects[0];

export default room;