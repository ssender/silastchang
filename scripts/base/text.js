import Spritesheet from "./sprsheet.js";
const PixelText = {
    sprite: new Spritesheet("images/text.png", 6, 16, 128, 72),
    encoder: new TextEncoder(),
    draw(_context, _text, _x, _y) {
        if (this.sprite.loaded) {
            var _chars = this.encoder.encode(_text);
            for (var _i = 0; _i < _chars.length; _i++) {
                this.sprite.draw(_context, _x, _y, _chars[_i] - 32);
                _x += 8;
            }
        }
    }
}
export default PixelText;