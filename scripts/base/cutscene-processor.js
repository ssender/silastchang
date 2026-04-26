import PixelText from "./text.js";
import Spritesheet from "./sprsheet.js";

class CutsceneProcessor  {
    active = 0;
    stage = 0;
    progress = 0;
    cutscene = 0;
    anim_clock = 0;
    cursorpos = 0;
    textframe = new Spritesheet("images/textframe.png", 1, 1);
    update(_inputs, _flags){
        if (this.active) {
            var _current_event = this.cutscene[this.stage];
            var _handling_done = false;
            var _i = 0;
            while (_handling_done === false) {
                _i += 1;
                switch(_current_event.type)
                {
                    case "Text":
                    if (this.progress < _current_event.length) {this.progress += 1;}
                    break;

                    case "Wait":
                    if (this.progress < _current_event.length) {this.progress += 1;}
                    break;

                    case "Choice":
                    if (_inputs.rightp) {this.cursorpos = Math.min(this.cursorpos + 1, _current_event.choices.length - 1)}
                    if (_inputs.leftp) {this.cursorpos = Math.min(this.cursorpos - 1, 0)}
                    break;

                    case "SetFlag":
                    _flags[_current_event.flag] = _current_event.value;
                    break;

                    default:

                    break;
                }

                if (this.progress >= _current_event.length) {
                    if (_current_event.auto || _inputs.ap) {
                        this.progress = 0;
                        switch(_current_event.type)
                        {
                            case "Choice":
                            this.stage = _current_event.results[this.cursorpos];
                            break;

                            case "Jump":
                            this.stage = _current_event.jumpto;
                            break

                            case "CheckFlag":
                            if (_flags[_current_event.flag] == _current_event.comparison) {
                                this.stage = _current_event.ifyes;
                            } else {
                                this.stage = _current_event.ifno;
                            }
                            break;

                            default:
                            this.stage += 1;
                            break;
                        }
                        if (this.stage >= this.cutscene.length) {
                            this.active = 0;
                            this.stage = 0;
                            _handling_done = true;
                        } else {
                            _current_event = this.cutscene[this.stage];
                        }
                        _inputs.ap = false;
                    } else {
                        _handling_done = true;
                    }
                } else {
                    _handling_done = true;
                }

                if (_i > 100) {
                    throw new Error("Too many iterations!")
                }
            }
            
        }
        return this.active;
    }
    draw(_ctx) {
        if (this.active) {
            var _current_event = this.cutscene[this.stage];
            switch(_current_event.type)
            {
                case "Text":
                this.textframe.draw(_ctx, 8, 88, 0);
                var _tl1 = _current_event.text.length;
                PixelText.draw(_ctx, _current_event.text.slice(0, Math.min(this.progress, _tl1)), 21, 98);
                if (this.progress < _tl1) {break;}
                PixelText.draw(_ctx, _current_event.text2.slice(0, Math.min(this.progress - _tl1, _current_event.length - _tl1)), 21, 112);
                break;

                case "Choice":
                this.textframe.draw(_ctx, 8, 88, 0);
                PixelText.draw(_ctx, _current_event.choices[0], 37, 98);
                PixelText.draw(_ctx, _current_event.choices[1], 100, 98);
                PixelText.draw(_ctx, ">", 21 + this.cursorpos*63, 98);
                break;

                default:

                break;
            }
        }
    }
};

export default CutsceneProcessor;