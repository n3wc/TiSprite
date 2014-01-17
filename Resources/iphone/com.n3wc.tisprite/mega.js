function Sprite(args) {
    var commonWidth = 45;
    var commonHeight = 48;
    var spritesheetTotalWidth = 1005;
    var spritesheetTotalHeight = 872;
    this.spritesheetImage = WPATH("images/spritesheet.gif");
    this.spriteScale = args && args.spriteScale ? args.spriteScale : 1;
    this.spriteWidth = args && args.spriteWidth ? args.spriteWidth * this.spriteScale : commonWidth * this.spriteScale;
    this.spriteHeight = args && args.spriteHeight ? args.spriteHeight * this.spriteScale : commonHeight * this.spriteScale;
    this.spritesheetWidth = args && args.spritesheetWidth ? args.spritesheetWidth * this.spriteScale : spritesheetTotalWidth * this.spriteScale;
    this.spritesheetHeight = args && args.spritesheetHeight ? args.spritesheetHeight * this.spriteScale : spritesheetTotalHeight * this.spriteScale;
    this.rows = (this.spritesheetHeight / this.spriteHeight).toFixed();
    this.columns = (this.spritesheetWidth / this.spriteWidth).toFixed();
    this.totalFrames = this.rows * this.columns;
    this.sheet = Ti.UI.createImageView({
        image: this.spritesheetImage,
        width: this.spritesheetWidth,
        height: this.spritesheetHeight
    });
    this.spriteView = Ti.UI.createView({
        width: this.spriteWidth,
        height: this.spriteHeight
    });
    this.spriteView.add(this.sheet);
    return this;
}

var SpriteCore = require(WPATH("SpriteCore"));

Sprite.prototype = new SpriteCore();

Sprite.prototype.constructor = Sprite;

module.exports = Sprite;