import * as b from "../objects/battle/bullet-base.js"
import Spritesheet from "../base/sprsheet.js"

const heartsprite = new Spritesheet("images/UI/battleui_heart.png", 1, 1);
const bdata = new b.BulletData(16, -10, false, true, "circle", heartsprite);
bdata.vel_x = 0.1;
const burst1 = [];
const burst2 = [];
for (var _i = 0; _i < 10; _i++) {
    burst1.push(new b.InheritedBulletData(bdata, {x : _i*20, vel_y : 1+_i*0.1}))
}
for (var _i = 0; _i < 10; _i++) {
    burst2.push(new b.InheritedBulletData(bdata, {x : _i*20, vel_y : 2- _i*0.1, vel_x : -0.1}))
}

const pattern = {
    bursts : [burst1, burst2],
    timers : [30, 30]
}

export default pattern;