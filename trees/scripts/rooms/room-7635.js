import room from "../base/room-base.js";
import ObjCharacter from "../objects/obj-character.js";
import ObjStaticSprite from "../objects/obj-staticsprite.js";
import ObjInteract from "../base/obj-interact-base.js"
import Spritesheet from "../base/sprsheet.js";
import * as cutscenes from "../base/cutscenes.js";

room.tilemap = [[32,32,32,32,32,32,32,32,32,32],[32,0,0,0,0,0,32,0,0,32],[32,0,0,0,0,0,32,0,32,32],[32,0,0,0,0,0,32,0,0,32],[32,0,0,0,0,0,32,0,0,32],[32,0,0,0,0,0,32,0,0,32],[32,0,0,0,32,32,0,0,0,32],[32,0,0,32,32,0,0,0,0,32],[32,0,0,32,32,0,0,0,0,32],[32,0,0,32,32,0,0,0,0,32],[32,0,0,0,32,32,0,0,0,32],[32,0,0,0,0,0,32,0,0,32],[32,0,0,0,0,0,32,0,0,32],[32,0,0,0,0,0,32,0,0,32],[32,0,0,0,0,0,32,0,32,32],[32,0,0,0,0,0,32,0,32,32],[32,32,32,32,32,32,32,32,32,32]];
room.objects.push(new ObjStaticSprite(8, 8, new Spritesheet("images/bg/broadway.png", 1, 1), 0));
room.objects.push(new ObjCharacter(128, 96));
room.camera.follow = room.objects[1];

// room flags
// 0: has ordered the waffle
room.flags[0] = false;
// 1: has obtained the waffle
room.flags[1] = false;
// 2: has eaten the waffle
room.flags[2] = false;

const stupid_cone_text = [
    new cutscenes.TextCE("Traffic cone. It blocks ", "your path, conveniently.")
]

// stupid cones
room.objects.push(new ObjInteract(112, 64))
room.objects[2].cutscene = stupid_cone_text;
room.objects.push(new ObjInteract(128, 64))
room.objects[3].cutscene = stupid_cone_text;
room.objects.push(new ObjInteract(144, 64))
room.objects[4].cutscene = stupid_cone_text;

// thai restruant door
room.objects.push(new ObjInteract(64, 96))
room.objects[5].cutscene = [
    new cutscenes.TextCE("A Thai restruant. It seems", "to be closed.")
];

// waffle shop door
room.objects.push(new ObjInteract(192, 96))
room.objects[6].cutscene = [
    new cutscenes.TextCE("A Belgian Bistro. You could", "order a waffle here..."), //0
    new cutscenes.CheckFlagCE(2, true, 2, 5),
    new cutscenes.TextCE("...but you're already full."),
    new cutscenes.TextCE("Maybe you could come back", "another time."),
    new cutscenes.JumpCE(1000),
    new cutscenes.CheckFlagCE(1, true, 6, 8), //5
    new cutscenes.TextCE("...but you have one ", "already."),
    new cutscenes.JumpCE(1000),
    new cutscenes.CheckFlagCE(0, true, 9, 12),
    new cutscenes.TextCE("...but you did already."),
    new cutscenes.TextCE("You can pick it up at the", "window on the right."), //10
    new cutscenes.JumpCE(1000),
    new cutscenes.TextCE("Will you order one?"),
    new cutscenes.ChoiceCE(["Yes", "No"], [14, 18]),
    new cutscenes.TextCE("The waffle was ordered."),
    new cutscenes.TextCE("You can pick it up at the", "window on the right."),//15
    new cutscenes.SetFlagCE(0, true), 
    new cutscenes.JumpCE(1000),
    new cutscenes.TextCE("The waffle was not ", "ordered.")
];

// waffle shop pickup window
const waffleimage = new Spritesheet("images/item/waffle.png", 1, 1);
room.objects.push(new ObjInteract(224, 96))
room.objects[7].cutscene = [
    new cutscenes.CheckFlagCE(0, true, 1, 6),
    new cutscenes.CheckFlagCE(1, false, 2, 6),
    new cutscenes.TextCE("You got the waffle that", "you ordered."),
    new cutscenes.SpriteCE(waffleimage, 88, 32, 0),
    new cutscenes.SetFlagCE(1, true),
    new cutscenes.JumpCE(1000), //5
    new cutscenes.TextCE("A window for picking up", "waffles."),
];

// waffle shop menu
room.objects.push(new ObjInteract(240, 96));
room.objects[8].cutscene = [
    new cutscenes.TextCE("The menu of waffles.")
];

// close table
room.objects.push(new ObjInteract(224, 128))
room.objects[9].cutscene = [
    new cutscenes.TextCE("A table, for enjoying a", "meal."),
    new cutscenes.CheckFlagCE(1, true, 2, 1000),
    new cutscenes.CheckFlagCE(2, false, 3, 1000),
    new cutscenes.TextCE("Do you want to eat the ", "waffle you ordered?"),
    new cutscenes.ChoiceCE(["Yes", "No"], [5, 8]), 
    new cutscenes.TextCE("The waffle was consumed."), //5
    new cutscenes.SetFlagCE(2, true),
    new cutscenes.JumpCE(1000),
    new cutscenes.TextCE("The waffle was not ", "consumed.")
];

// far table
room.objects.push(new ObjInteract(32, 128))
room.objects[10].cutscene = [
    new cutscenes.TextCE("A table, for enjoying a", "meal."),
    new cutscenes.CheckFlagCE(1, true, 2, 1000),
    new cutscenes.CheckFlagCE(2, false, 3, 1000),
    new cutscenes.TextCE("Do you want to eat the ", "waffle you ordered?"),
    new cutscenes.ChoiceCE(["Yes", "No"], [5, 11]), 
    new cutscenes.TextCE("The waffle was consumed."), //5
    new cutscenes.TextCE("The calories you burned", "from walking all the way..."),
    new cutscenes.TextCE("...to this table were ", "replenished by the waffle."),
    new cutscenes.SetFlagCE(2, true),
    new cutscenes.JumpCE(1000), //10
    new cutscenes.TextCE("The waffle was not ", "consumed.")
];

// chair
room.objects.push(new ObjInteract(240, 128))
room.objects[11].cutscene = [
    new cutscenes.TextCE("A chair.")
];

export default room;