import PixelText from "./text.js";
import Spritesheet from "./sprsheet.js";

class CutsceneProcessor  {
    active = 0;
    stage = 0;
    progress = 0;
    cutscene = 0;
    anim_clock = 0;
    cursorpos = 0;
    skipped = false;
    curtains = 0;
    textframe = new Spritesheet("images/UI/textframe.png", 1, 1);
    portraits = new Spritesheet("images/UI/portraits.png", 2, 1);
    room = undefined;
    update(_inputs, _flags){
        if (this.active) {
            var _current_event = this.cutscene[this.stage];
            var _handling_done = false;
            var _i = 0;
            while (_handling_done === false) {
                if (_current_event.skippable && _inputs.bp && this.progress < _current_event.length) {
                    this.progress = _current_event.length;
                    this.skipped = true;
                }
                _i += 1;
                switch(_current_event.type)
                {
                    case "Text":
                    case "PText":
                    if (this.progress < _current_event.length) {this.progress += 1;}
                    break;

                    case "Wait":
                    case "WaitChoice":
                    if (this.progress < _current_event.length) {this.progress += 1;}
                    break;

                    case "Choice":
                    if (_inputs.rightp) {this.cursorpos = Math.min(this.cursorpos + 1, _current_event.choices.length - 1)}
                    if (_inputs.leftp) {this.cursorpos = Math.max(this.cursorpos - 1, 0)}
                    break;

                    case "SetFlag":
                    _flags[_current_event.flag] = _current_event.value;
                    break;

                    case "SetGlobal":
                    this.room.globals[_current_event.flag] = _current_event.value;
                    this.room.save_storage();
                    break;

                    case "Save":
                    this.room.save_storage();
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

                            case "WaitChoice":
                            if (this.skipped) {this.stage = _current_event.results[1];}
                            else {this.stage = _current_event.results[0];}
                            break;

                            case "CheckGlobal":
                            if (this.room.globals[_current_event.flag] == _current_event.comparison) {
                                this.stage = _current_event.ifyes;
                            } else {
                                this.stage = _current_event.ifno;
                            }
                            break;

                            case "Warp":
                            this.room.room_goto(_current_event.url, _current_event.sx, _current_event.sy);
                            break;

                            default:
                            this.stage += 1;
                            break;
                        }
                        if (this.stage >= this.cutscene.length) {
                            this.active = 0;
                            this.stage = 0;
                            this.cursorpos = 0;
                            _handling_done = true;
                        } else {
                            _current_event = this.cutscene[this.stage];
                        }
                        _inputs.ap = false;
                        this.skipped = false;
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
            var _drawh = 88;
            switch(_current_event.type)
            {
                case "Text":
                if (this.room.camera.follow.y - this.room.camera.y > 80) {
                    _drawh = 12;
                }
                this.textframe.draw(_ctx, 8, _drawh, 0);
                var _tl1 = _current_event.text.length;
                PixelText.draw(_ctx, _current_event.text.slice(0, Math.min(this.progress, _tl1)), 21, _drawh + 10);
                if (this.progress < _tl1) {break;}
                PixelText.draw(_ctx, _current_event.text2.slice(0, Math.min(this.progress - _tl1, _current_event.length - _tl1)), 21, _drawh + 24);
                break;

                case "PText":
                if (this.room.camera.follow.y - this.room.camera.y > 80) {
                    _drawh = 12;
                }
                this.textframe.draw(_ctx, 8, _drawh, 0);
                this.portraits.draw(_ctx, 20, _drawh + 7, _current_event.portrait);
                var _tl1 = _current_event.text.length;
                PixelText.draw(_ctx, _current_event.text.slice(0, Math.min(this.progress, _tl1)), 45, _drawh + 10);
                if (this.progress < _tl1) {break;}
                PixelText.draw(_ctx, _current_event.text2.slice(0, Math.min(this.progress - _tl1, _current_event.length - _tl1)), 21, _drawh + 24);
                break;

                case "Choice":
                if (this.room.camera.follow.y - this.room.camera.y > 80) {
                    _drawh = 12;
                }
                this.textframe.draw(_ctx, 8, _drawh, 0);
                PixelText.draw(_ctx, _current_event.choices[0], 37, _drawh+10);
                PixelText.draw(_ctx, _current_event.choices[1], 100, _drawh+10);
                PixelText.draw(_ctx, ">", 21 + this.cursorpos*63, _drawh+10);
                break;

                case "Sprite":
                _current_event.sprite.draw(_ctx, _current_event.ix, _current_event.iy, _current_event.f)
                break;

                default:

                break;
            }
        }
    }
};

export default CutsceneProcessor;