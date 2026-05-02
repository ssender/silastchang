// ROOM SETUP ------------------------------
const room = document.room;
room.initiate();

// GENERAL SETUP ------------------------------
// inputs
const inputs = {
    left : false,
    right : false,
    up : false,
    down : false,
    leftp : false,
    rightp : false,
    upp : false,
    downp : false,
    a : false,
    ap : false
}
function getKeyDown(event) {
    if (event.code === "ArrowLeft") {
        inputs.left = true;
        inputs.leftp = true;
    } else if (event.code === "ArrowRight") {
        inputs.right = true;
        inputs.rightp = true;
    } else if (event.code === "ArrowUp") {
        inputs.up = true;
        inputs.upp = true;
    } else if (event.code === "ArrowDown") {
        inputs.down = true;
        inputs.downp = true;
    } else if (event.code === "KeyZ") {
        inputs.a = true;
        inputs.ap = true;
    } 
    event.preventDefault();
}
function getKeyUp(event) {
    if (event.code === "ArrowLeft") {
        inputs.left = false;
    } else if (event.code === "ArrowRight") {
        inputs.right = false;
    } else if (event.code === "ArrowUp") {
        inputs.up = false;
    } else if (event.code === "ArrowDown") {
        inputs.down = false;
    } else if (event.code === "KeyZ") {
        inputs.a = false;
    } 
    event.preventDefault();
}
function resetKeys(){
    inputs.leftp = false;
    inputs.rightp = false;
    inputs.upp = false;
    inputs.downp = false;
    inputs.ap = false;
}
document.addEventListener("keydown", getKeyDown);
document.addEventListener("keyup", getKeyUp);

//  CANVAS SETUP ------------------------------
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
room.context = ctx;

// MAIN LOOP ------------------------------
let start;
let dt = 0;
function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
    }
    dt += (timestamp - start)*0.001;
    if (dt >= 0.025) {
        // update the values of the world in game
        if (inputs.ap) {
            console.log(String(room.globals["hat"]));
        }
        room.update(inputs);
        
        //if (inputs.ap) {console.log(room.room_width, room.room_height, room.camera.x, room.camera.y)}
        resetKeys();
        // draw all the things
        room.draw(ctx);
        dt = 0;
        
    }
    start = timestamp;
    requestAnimationFrame(step);
}

// The first call, initializes the first frame
requestAnimationFrame(step);