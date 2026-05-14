class Spritesheet {
    nrows = 1;
    ncols = 1;
    img = new Image();
    nframes = 1;
    frameWidth = 1;
    frameHeight = 1;
    loaded = false;

    draw(context, x, y, f) {
        if (this.loaded) {
            context.drawImage(this.bitmaps[f], x, y);
        }
    }

    constructor(_img, _nrows, _ncols) {
        this.img.src = _img;
        this.nrows = _nrows;
        this.ncols = _ncols;
        this.bitmaps = new Array(_nrows * _ncols);
        this.nframes = _nrows * _ncols;
        
        this.img.onload = () => {
            var _imgwidth = this.img.width;
            var _imgheight = this.img.height;
            this.frameWidth = _imgwidth / _ncols;
            this.frameHeight = _imgheight / _nrows;
            for (var ty = 0; ty < this.nrows; ty++) {
                for (var tx=0; tx < this.ncols; tx++) {
                    this.bitmaps[ty*this.ncols + tx] = createImageBitmap(this.img, tx*this.frameWidth, ty*this.frameHeight , this.frameWidth, this.frameHeight);
                }
            }
            Promise.all(this.bitmaps).then((maps) => {
                this.bitmaps = maps;
                this.loaded = true;
            })
        };
    }
}

export default Spritesheet;