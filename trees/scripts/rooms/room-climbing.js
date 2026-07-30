import room from "../base/room-base.js";
import ObjCharacter from "../objects/obj-character.js";
import ObjClimb from "../objects/obj-climb.js";
import Spritesheet from "../base/sprsheet.js";

room.tilemap = [[32,32,32,32,32,32,32,32,32,32],[32,34,35,8,0,48,56,48,56,32],[32,56,36,17,0,16,48,56,48,32],[32,17,36,8,17,0,16,48,56,32],[32,0,36,0,0,8,48,56,48,32],[32,56,34,35,0,0,0,48,56,32],[32,0,0,36,0,17,0,0,48,32],[32,48,56,36,0,0,8,9,0,32],[32,0,0,34,35,0,0,8,48,32],[32,0,0,0,36,0,0,16,0,32],[32,48,56,0,36,0,9,0,0,32],[32,0,48,56,36,8,0,0,8,32],[32,48,56,0,36,8,8,8,8,32],[32,56,0,38,37,0,0,0,48,32],[32,48,56,36,16,0,18,48,56,32],[32,56,0,36,8,0,48,56,48,32],[32,32,32,32,32,32,32,32,32,32]];
room.objects.push(new ObjClimb(160, 64, 1));
room.objects.push(new ObjClimb(176, 64, 2));
room.objects.push(new ObjCharacter(80, 80));


room.camera.follow = room.objects[2];

export default room;