
const defaults = {
    alerts_enabled : true,
    yellow : 7,
    red : 10
}

const timer_modules = [];

const add_timer_button = document.getElementById("add");
const name_entrybox = document.getElementById("name-box");
const time_entrybox = document.getElementById("time-box");
const runs_entrybox = document.getElementById("runs-box");
var selected_module = undefined;

name_entrybox.addEventListener("change", () => {
        if (selected_module  != undefined) {
            selected_module.name = name_entrybox.value;
            selected_module.timer_name_text.textContent = name_entrybox.value;
        }
});

time_entrybox.addEventListener("change", () => {
        if (selected_module  != undefined) {
            selected_module.time = Number(time_entrybox.value);
            selected_module.timer_time_text.textContent = int_to_time(time_entrybox.value);
        }
});

class TimerModule {
    constructor() {
        this.use_defaults = true;
        this.name = "name"
        this.time = 0;
        this.alerts_enabled = defaults.alerts_enabled;
        this.yellow = defaults.yellow;
        this.red = defaults.red;
        this.selected = false;
        this.start_time = Date.now();
        this.active = false;
        this.timer_cell = document.createElement("div");
        this.timer_cell.classList.add("timer-cell");
        add_timer_button.parentElement.parentElement.before(this.timer_cell);
        this.timer_name_text = document.createElement("div");
        this.timer_name_text.classList.add("timer-name");
        this.timer_name_text.textContent = this.name;
        this.timer_cell.appendChild(this.timer_name_text);
        let d = document.createElement("div");
        d.classList.add("centered");
        this.timer_time_text = document.createElement("div");
        this.timer_time_text.classList.add("timer", "styled");
        this.timer_time_text.textContent = "00:00";
        d.appendChild(this.timer_time_text);
        this.timer_cell.appendChild(d);

        this.timer_time_text.addEventListener("click",
            () => {
                this.active = true;
                this.time = 0;
                this.timer_time_text.textContent = "00:00";
                this.timer_time_text.classList.remove("red-text");
                this.timer_time_text.classList.remove("yellow-text");
            }
        )

        this.timer_name_text.addEventListener("click",
            () => {
                if (this.selected) {
                    this.deselect();
                } else {
                    this.select();
                }
            }
        )
    }

    select() {
        for (var i=0; i<timer_modules.length; i++) {
            var  target = timer_modules[i]
            target.deselect();
        }
        this.selected = true;
        this.timer_cell.classList.add("selected");
        name_entrybox.value = this.name;
        selected_module = this;
    }

    deselect() {
        this.selected = false;
        this.timer_cell.classList.remove("selected");
    }

}



add_timer_button.addEventListener("click", (event) => {
    timer_modules.push(new TimerModule());
    console.log("plus clicked")
});

function int_to_time(t) {
    var s = String(t % 60);
    var m = String((t - s)/60);
    if (s.length == 1) {s = "0" + s;}
    if (m.length == 1) {m = "0" + m;}
    return m + ":" + s;
}

let start;
let dt = 0;
function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
    }
    dt += (timestamp - start);
    if (dt >= 1000) {
        for (var i=0; i<timer_modules.length; i++) {
            var  target = timer_modules[i];
            if (target.active) {
                target.time += 1;
                target.timer_time_text.textContent = int_to_time(target.time);
                
                if (target.time >= target.red*60) {
                    target.timer_time_text.classList.add("red-text");
                    target.timer_time_text.classList.remove("yellow-text");
                } else if (target.time >= target.yellow*60) {
                    target.timer_time_text.classList.remove("red-text");
                    target.timer_time_text.classList.add("yellow-text");
                } else {
                    target.timer_time_text.classList.remove("red-text");
                    target.timer_time_text.classList.remove("yellow-text");
                }
                    
            }
        }

        dt = 0;
    }
    start = timestamp;
    requestAnimationFrame(step);
}

requestAnimationFrame(step);