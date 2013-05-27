
var SpriteCore = require("/sprite/SpriteCore");

Sprite.prototype = new SpriteCore();
Sprite.prototype.constructor=Sprite;

function Sprite(args) {
	//base values
	var commonWidth = 96;
	var commonHeight = 96;
	var spritesheetTotalWidth = 2880;
	var spritesheetTotalHeight = 1152;
	this.spritesheetImage='/Images/rarity_sprite_sheet_by_urimas-d3fltl0.gif';
	
	//override base values
	if(args && args.spriteScale) this.spriteScale=args.spriteScale; else this.spriteScale=1;
	if(args && args.spriteWidth) this.spriteWidth=args.spriteWidth*this.spriteScale; else this.spriteWidth=commonWidth*this.spriteScale;
	if(args && args.spriteHeight) this.spriteHeight=args.spriteHeight*this.spriteScale; else this.spriteHeight=commonHeight*this.spriteScale;
	if(args && args.spritesheetWidth) this.spritesheetWidth=args.spritesheetWidth*this.spriteScale; else this.spritesheetWidth=spritesheetTotalWidth*this.spriteScale;
	if(args && args.spritesheetHeight) this.spritesheetHeight=args.spritesheetHeight*this.spriteScale; else this.spritesheetHeight=spritesheetTotalHeight*this.spriteScale;
	
	

	this.rows=(this.spritesheetHeight/this.spriteHeight).toFixed();
	this.columns=(this.spritesheetWidth/this.spriteWidth).toFixed();
	this.totalFrames = this.rows * this.columns;
	this.sheet = Ti.UI.createImageView(
	{
		image:this.spritesheetImage,
		width:this.spritesheetWidth,
		height:this.spritesheetHeight,
	});
	this.spriteView = Ti.UI.createView({
		width:this.spriteWidth,
		height:this.spriteHeight,
	});
	this.spriteView.add(this.sheet);
	
	
	
	return this;
};




module.exports = Sprite;



