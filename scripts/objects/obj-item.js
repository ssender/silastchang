import Obj from "../base/obj-base.js";
import Spritesheet from "../base/sprsheet.js";
import TextCE from "../base/cutscenes.js";

class ObjItem extends Obj {
    aframe = 0;
    aclock = 0;
    state = 1; // 0-disabled, 1-idle, 2-activated
    constructor(ix=0, iy=0) {
        super(ix, iy);
        this.spritesheet = new Spritesheet("images/pretzel-stick.png", 1, 1);
        this.has_collision = true;
    }

    update(_inputs, _room) {
        switch (this.state)
        {
            case 0:
                break;
            case 1: //idle anim
                this.aclock += 1;
                if (this.aclock >= 60) {this.aclock = 0;}
                if (this.aclock < 15) {this.aframe = 0;}
                else if (this.aclock < 30) {this.aframe = 1;}
                else if (this.aclock < 45) {this.aframe = 0;}
                else {this.aframe = -1;}
                break;
            case 2: //collect anim
                this.aclock += 1;
                if (this.aclock > 30) {this.state = 0;}
                break;
        }
    }

    activate(_room){
        if (this.state == 1)
        {
            this.aclock = 0;
            this.aframe = 0;
            this.state = 2;
            this.has_collision = false;
            this.load_cutscene([new TextCE("You got pretzel!!1!1!")], _room)
        }
    }

    draw(_context, _cam) {
        switch(this.state){
            case 0:
                break;
            case 1:
                this.spritesheet.draw(_context, this.x - _cam.x, this.y - _cam.y + this.aframe - 2, 0);
                break;
            case 2:
                if (this.aclock % 2 === 0) {this.spritesheet.draw(_context, this.x - _cam.x, this.y - _cam.y - 5 - Math.floor(this.aclock * 0.2), 0);}
                break;
        }
        
    }
}

export default ObjItem